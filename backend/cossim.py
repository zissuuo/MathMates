from pydantic import BaseModel
import pandas as pd
from gensim.models import Word2Vec
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

# 데이터 로드
df = pd.read_csv('/Users/kimjisu/Desktop/edu_project/item_pool.csv')
questions = df['question'].tolist()

# Word2Vec 모델 학습
sentences = [question.split() for question in questions]
model = Word2Vec(sentences, vector_size=100, window=5, min_count=1, workers=4)

class ProblemRequest(BaseModel):
    problem: str
    chapter: str

def get_sentence_vector(sentence, model):
    words = sentence.split()
    word_vectors = [model.wv[word] for word in words if word in model.wv]
    if len(word_vectors) == 0:
        return np.zeros(model.vector_size)
    return np.mean(word_vectors, axis=0)

def find_similar_problems_logic(problem: ProblemRequest):
    # 챕터로 DataFrame 필터링
    chapter_filtered_df = df[df['chapter'] == problem.chapter]

    if chapter_filtered_df.empty:
        return []

    # 입력된 문제를 벡터로 변환
    question_vector = get_sentence_vector(problem.problem, model).reshape(1, -1)

    # DataFrame의 질문들을 벡터로 변환
    chapter_filtered_df['vector'] = chapter_filtered_df['question'].apply(lambda x: get_sentence_vector(x, model))

    # 코사인 유사도 계산
    chapter_filtered_df['cosine_sim'] = chapter_filtered_df['vector'].apply(lambda x: cosine_similarity([x], question_vector).flatten()[0])

    # 코사인 유사도 기준으로 DataFrame 정렬
    df_sorted = chapter_filtered_df.sort_values(by='cosine_sim', ascending=False)

    # 난이도별로 유사도가 가장 높은 질문 선택
    top_questions_by_difficulty = df_sorted.groupby('difficulty').first().reset_index()

    # 불필요한 열 삭제
    top_questions_by_difficulty.drop(columns=['vector'], inplace=True)

    return top_questions_by_difficulty.to_dict(orient='records')