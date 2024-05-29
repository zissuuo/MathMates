{
 "cells": [
  {
   "cell_type": "code",
   "execution_count": 5,
   "metadata": {},
   "outputs": [
    {
     "name": "stdout",
     "output_type": "stream",
     "text": [
      "{\n",
      "    \"problem\": \"1. 형민이네 농장에서 오늘 딴 귤은 한 상자에 100개씩 74상자와 낱개 15개입니다. 오늘 딴 귤은 모두 몇 개인가?\\n① 7400  ② 7375  ③ 7410  ④ 7405  ⑤ 7415\",\n",
      "    \"explanation\": \"한 상자에 100개씩 들어있는 귤이 74상자 있으므로 74 * 100 = 7400개입니다. 여기에 낱개로 15개가 더 있으므로, 총 귤의 개수는 7400 + 15 = 7415개입니다.\",\n",
      "    \"answer\": \"⑤ 7415\"\n",
      "}\n"
     ]
    }
   ],
   "source": [
    "from openai import OpenAI\n",
    "import base64\n",
    "\n",
    "client = OpenAI(api_key=\"\")\n",
    "\n",
    "def encode_image(image_path):\n",
    "    with open(image_path, \"rb\") as image_file:\n",
    "        return base64.b64encode(image_file.read()).decode(\"utf-8\")\n",
    "    \n",
    "base64_image = encode_image(\"sample_item/sample1.png\")\n",
    "\n",
    "response = client.chat.completions.create(\n",
    "    model=\"gpt-4o\",\n",
    "    messages=[\n",
    "        {\"role\": \"system\", \"content\": \"당신은 초등학생의 수학 문제를 풀이하는 선생님입니다. 이미지에 제공된 수학 문제에 대한 정답과 상세한 해설을 제공합니다.\"},\n",
    "        {\"role\": \"user\", \"content\": [\n",
    "            {\"type\": \"text\", \"text\":\n",
    "             '''\n",
    "                이미지 내 문제에 대한 텍스트 인식을 실행하여 함께 출력하세요.\n",
    "                결과는 아래와 같은 json 형식으로 출력하세요. (아래 형식 이외의 부가적인 답변은 절대 하지 마세요)\n",
    "\n",
    "                {\n",
    "                \"problem\": #텍스트 인식 내용\n",
    "                ”explanation”: #해설 출력\n",
    "                ”answer”: #정답 출력\n",
    "                }\n",
    "             '''},\n",
    "            {\"type\": \"image_url\", \"image_url\": {\n",
    "                \"url\": f\"data:image/png;base64,{base64_image}\"}\n",
    "            }  \n",
    "        ]}\n",
    "    ],\n",
    "    temperature=0.7,\n",
    ")\n",
    "\n",
    "print(response.choices[0].message.content)"
   ]
  }
 ],
 "metadata": {
  "kernelspec": {
   "display_name": "edu",
   "language": "python",
   "name": "python3"
  },
  "language_info": {
   "codemirror_mode": {
    "name": "ipython",
    "version": 3
   },
   "file_extension": ".py",
   "mimetype": "text/x-python",
   "name": "python",
   "nbconvert_exporter": "python",
   "pygments_lexer": "ipython3",
   "version": "3.10.14"
  },
  "orig_nbformat": 4
 },
 "nbformat": 4,
 "nbformat_minor": 2
}
