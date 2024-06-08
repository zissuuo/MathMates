import pandas as pd
from gensim.models import Word2Vec
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

# 데이터 로드
df = pd.read_csv('item_pool.csv')
questions = df['question'].tolist()

# Word2Vec 모델 학습
sentences = [question.split() for question in questions]
model = Word2Vec(sentences, vector_size=100, window=5, min_count=1, workers=4)

def get_sentence_vector(sentence, model):
    words = sentence.split()
    word_vectors = [model.wv[word] for word in words if word in model.wv]
    if len(word_vectors) == 0:
        return np.zeros(model.vector_size)
    return np.mean(word_vectors, axis=0)

# 데이터프레임의 질문들을 벡터로 변환
df['vector'] = df['question'].apply(lambda x: get_sentence_vector(x, model))

def find_similar_questions(input_question):
    # 입력 질문을 벡터로 변환
    question_vector = get_sentence_vector(input_question, model).reshape(1, -1)
    
    # 코사인 유사도 계산
    df['cosine_sim'] = df['vector'].apply(lambda x: cosine_similarity([x], question_vector).flatten()[0])
    
    # 유사도 기준으로 데이터프레임 정렬
    word2vec_df = df.sort_values(by='cosine_sim', ascending=False)
    
    # 난이도별로 하나씩 선택
    result_df = word2vec_df.groupby('difficulty').head(1).sort_values(by='difficulty')
    
    # 필요한 컬럼만 선택
    result_df = result_df[['grade', 'semester', 'chapter', 'question', 's1', 's2', 's3', 's4', 's5', 'answer', 'explaination']]
    
    return result_df