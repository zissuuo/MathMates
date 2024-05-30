import React from "react";
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

const TitleContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
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

const SubmitButton = styled.button`
  width: 60%;
  height: 30px;
  margin-top: 20px;
  border-radius: 30px;
  border: none;
  box-shadow: inset 0px 0px 1px rgba(0, 0, 0, 0.1);
  background-color: #d78a81;
  color: #f8f7f3;
  font-family: 'Pretendard-ExtraBold';
  font-size: 15px;
  cursor: pointer;
`;



const ExplainPage = () => {
  const location = useLocation();
  const { result } = location.state || {};

  return (
    <Container>
      <TitleContainer>
        <Message>교육통계의 이해</Message>
        <Title>MATHMATES</Title>
      </TitleContainer>
      <Circle />
      {result ? (
        <ResultContainer>
          <MainText>💡 해설이 도착했어요!</MainText>
          <Subtitle>문제</Subtitle>
          <Text>{result.problem}</Text>
          <Subtitle>해설</Subtitle>
          <Text>{result.explanation}</Text>
          <Subtitle>정답</Subtitle>
          <Text>{result.answer}</Text>
        </ResultContainer>
      ) : (
        <ResultContainer>결과를 로드하는 중 오류가 발생했습니다.</ResultContainer>
      )}
      <SubmitButton>비슷한 문제 더 풀어보기</SubmitButton>
    </Container>
  );
};

export default ExplainPage;