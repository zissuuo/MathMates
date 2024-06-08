from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import logging

from gpt import solve_problem_logic
from cossim import find_similar_problems_logic

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

class ProblemResponse(BaseModel):
    problem: str
    explanation: str
    answer: str

class ProblemRequest(BaseModel):
    problem: str
    chapter: str  # Add the chapter field

@app.post("/solve-problem", response_model=ProblemResponse)
async def solve_problem(file: UploadFile = File(...)):
    return await solve_problem_logic(file)

@app.post("/similar_problems")
async def find_similar_problems(request: ProblemRequest):
    return find_similar_problems_logic(request)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)