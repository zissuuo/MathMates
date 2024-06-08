from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import base64
import os
from dotenv import load_dotenv
from openai import OpenAI
import json
import logging
import pandas as pd
from gensim.models import Word2Vec
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

app = FastAPI()

# CORS 설정
origins = [
    "http://localhost:3000",  # React 개발 서버 주소
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# OpenAI API 키를 환경 변수에서 가져옵니다.
load_dotenv()
api_key = os.getenv("OPENAI_API_KEY")
client = OpenAI(api_key=api_key)

class ProblemResponse(BaseModel):
    problem: str
    explanation: str
    answer: str

@app.post("/solve-problem", response_model=ProblemResponse)
async def solve_problem(file: UploadFile = File(...)):
    try:
        image_data = await file.read()
        base64_image = base64.b64encode(image_data).decode("utf-8")
        
        response = client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {"role": "system", "content": "당신은 초등학생의 수학 문제를 풀이하는 선생님입니다. 이미지에 제공된 수학 문제에 대한 정답과 상세한 해설을 제공합니다."},
                {"role": "user", "content": [
                    {"type": "text", "text": '''
                        이미지 내 문제에 대한 텍스트 인식을 실행하여 함께 출력하세요.
                        결과는 아래와 같은 json 형식으로 출력하세요. (아래 형식 이외의 부가적인 답변은 절대 하지 마세요)

                        {
                        "problem": #텍스트 인식 내용
                        ”explanation”: #해설 출력
                        ”answer”: #정답 출력
                        }
                    '''},
                    {"type": "image_url", "image_url": {
                        "url": f"data:image/png;base64,{base64_image}"}
                    }
                ]}
            ],
            temperature=0.7,
        )
        
        output = response.choices[0].message.content
        problem_data = json.loads(output)
        
        return ProblemResponse(**problem_data)
    
    except OpenAI.error.OpenAIError as e:
        logging.error(f"OpenAI API error: {e}")
        raise HTTPException(status_code=500, detail="OpenAI API error")
    except Exception as e:
        logging.error(f"Unexpected error: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")

df = pd.read_csv('/Users/kimjisu/Desktop/edu_project/item_pool.csv')
questions = df['question'].tolist()

# Word2Vec 모델 학습
sentences = [question.split() for question in questions]
model = Word2Vec(sentences, vector_size=100, window=5, min_count=1, workers=4)

class Problem(BaseModel):
    problem: str

def get_sentence_vector(sentence, model):
    words = sentence.split()
    word_vectors = [model.wv[word] for word in words if word in model.wv]
    if len(word_vectors) == 0:
        return np.zeros(model.vector_size)
    return np.mean(word_vectors, axis=0)

@app.post("/similar_problems")
async def find_similar_problems(problem: Problem):
    # input question을 벡터로 변환
    question_vector = get_sentence_vector(problem.problem, model).reshape(1, -1)

    # 데이터프레임의 질문들을 벡터로 변환
    df['vector'] = df['question'].apply(lambda x: get_sentence_vector(x, model))

    # 코사인 유사도 계산
    df['cosine_sim'] = df['vector'].apply(lambda x: cosine_similarity([x], question_vector).flatten()[0])

    # 유사도 기준으로 데이터프레임 정렬
    df_sorted = df.sort_values(by='cosine_sim', ascending=False)

    # 난이도별로 유사도가 가장 높은 질문 선택
    top_questions_by_difficulty = df_sorted.groupby('difficulty').first().reset_index()

    # 불필요한 열 삭제
    top_questions_by_difficulty.drop(columns=['vector'], inplace=True)

    return top_questions_by_difficulty.to_dict(orient='records')

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)