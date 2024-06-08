import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";

const Container = styled.div`
  height: 100vh;
  background-color: white;
  display: flex;
  align-items: center;
  flex-direction: column;
  z-index: 1;
  box-sizing: border-box;
`;

const TitleContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
`;

const Circle = styled.div`
  position: absolute;
  width: 1200px;
  height: 600px;
  border-radius: 50%;
  background: linear-gradient(80deg, #d78a81 0%, #EB5444 100%);
  top: -250px;
  z-index: -1;
`;

const Message = styled.div`
  margin-top: 80px;
  margin-left: 60px;
  font-family: "Pretendard-Medium";
  font-size: 12px;
  color: #252a2f;
  text-align: left;
`;

const Title = styled.div`
  margin-bottom: 30px;
  margin-left: 60px;
  font-family: "Pretendard-ExtraBold";
  font-size: 30px;
  color: #252a2f;
  text-align: left;
`;

const ResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: white;
  border-radius: 30px;
  width: 80%;
  height: auto;
  box-sizing: border-box;
  padding: 30px;
  z-index: 1;
  box-shadow: inset 0px 0px 3px rgba(0, 0, 0, 0.1);
`;

const MainText = styled.div`
  font-family: "Pretendard-ExtraBold";
  font-size: 20px;
  color: #252a2f;
  margin-bottom: 20px;
`;

const Subtitle = styled.div`
  font-family: "Pretendard-Bold";
  font-size: 17px;
  color: #252a2f;
`;

const Text = styled.div`
  font-family: "Pretendard-Medium";
  font-size: 12px;
  color: #252a2f;
`;

const NumToText = (difficulty) => {
  switch (difficulty) {
    case 0: return '상';
    case 1: return '중';
    case 2: return '하';
    default: return '-';
  }
};

const RecommendPage = () => {
  const location = useLocation();
  const { similarProblems } = location.state || {};

  return (
    <Container>
      <TitleContainer>
        <Message>교육통계의 이해</Message>
        <Title>MATHMATES</Title>
      </TitleContainer>
      <Circle />
      {similarProblems && similarProblems.length > 0 ? (
        <ResultContainer>
          <MainText>아래 문제를 더 풀어보세요 🧮</MainText>
          {similarProblems.map((item, index) => (
            <div key={index}>
              <Subtitle>난이도 {NumToText(item.difficulty)}</Subtitle>
              <Text>{item.chapter}</Text>
              <Text>{item.question}</Text>
            </div>
          ))}
        </ResultContainer>
      ) : (
        <ResultContainer>추천된 문제가 없습니다.</ResultContainer>
      )}
    </Container>
  );
};

export default RecommendPage;