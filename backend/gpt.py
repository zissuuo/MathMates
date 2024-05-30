from openai import OpenAI
import base64
import os
from dotenv import load_dotenv
load_dotenv()

api_key=os.getenv("OPENAI_API_KEY")
client = OpenAI(api_key=api_key)

def encode_image(image_path):
    with open(image_path, "rb") as image_file:
        return base64.b64encode(image_file.read()).decode("utf-8")
    
base64_image = encode_image("sample_item/sample5.png")

response = client.chat.completions.create(
    model="gpt-4o",
    messages=[
        {"role": "system", "content": "당신은 초등학생의 수학 문제를 풀이하는 선생님입니다. 이미지에 제공된 수학 문제에 대한 정답과 상세한 해설을 제공합니다."},
        {"role": "user", "content": [
            {"type": "text", "text":
             '''
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

print(response.choices[0].message.content)