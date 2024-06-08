import React, { useState } from "react";
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
  padding-bottom: 30px;
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
  background-color: white;
  border-radius: 30px;
  width: 80%;
  height: auto;
  min-height: 250px;  /* 필요에 따라 이 값을 조정하거나 제거하세요 */
  box-sizing: border-box;
  padding: 30px;
  z-index: 1;
  box-shadow: inset 0px 0px 3px rgba(0, 0, 0, 0.1);
  overflow: auto;  /* 추가된 스타일 */
`;

const MainText = styled.div`
  font-family: "Pretendard-ExtraBold";
  font-size: 20px;
  color: #252a2f;
`;

const Subtitle = styled.div`
  font-family: "Pretendard-Bold";
  font-size: 15px;
  text-align: center;
  color: #252a2f;
`;

const Text = styled.div`
  font-family: "Pretendard-Medium";
  font-size: 12px;
  color: #252a2f;
`;

const ButtonContainer = styled.div`
  margin: 30px 0;
  display: flex;
  justify-content: center;
  gap: 10px;
`;

const Button = styled.button`
  font-family: "Pretendard-Medium";
  font-size: 14px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: #d78a81;
  color: white;

  &:hover {
    background-color: #eb5444;
  }
`;

const Divider = styled.hr`
  border: none;
  height: 1px;
  background-color: #d4d4d4;
  margin-bottom: 30px;
  width: 100%;
`;

const ProblemContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Problem = styled.div`
  font-family: "Pretendard-SemiBold";
  font-size: 14px;
  
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
  const [filteredDifficulty, setFilteredDifficulty] = useState(null);
  const [showAnswer, setShowAnswer] = useState({});

  const filterProblems = (difficulty) => {
    setFilteredDifficulty(difficulty);
  };

  const toggleAnswer = (index) => {
    setShowAnswer((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const filteredProblems = similarProblems
    ? similarProblems.filter(problem => filteredDifficulty === null || problem.difficulty === filteredDifficulty)
    : [];

  return (
    <Container>
      <TitleContainer>
        <Message>교육통계의 이해</Message>
        <Title>MATHMATES</Title>
      </TitleContainer>
      <Circle />
      <ResultContainer>
        <MainText>난이도를 클릭하여</MainText>
        <MainText>유사한 문제를 더 풀어보세요 🧮</MainText>
        <ButtonContainer>
          <Button onClick={() => filterProblems(0)}>상</Button>
          <Button onClick={() => filterProblems(1)}>중</Button>
          <Button onClick={() => filterProblems(2)}>하</Button>
        </ButtonContainer>
        {filteredDifficulty !== null && <Divider />}
        {filteredDifficulty !== null && filteredProblems.length > 0 ? (
          filteredProblems.map((item, index) => (
            <ProblemContainer key={index}>
              <Subtitle>난이도 {NumToText(item.difficulty)}</Subtitle>
              <Problem>{item.question}</Problem>
              {item.s1 && <Text>① {item.s1}</Text>}
              {item.s2 && <Text>② {item.s2}</Text>}
              {item.s3 && <Text>③ {item.s3}</Text>}
              {item.s4 && <Text>④ {item.s4}</Text>}
              {item.s5 && <Text>⑤ {item.s5}</Text>}
              <Button onClick={() => toggleAnswer(index)}>
                {showAnswer[index] ? '숨기기' : '정답 확인'}
              </Button>
              {showAnswer[index] && (
                <>
                  <Text>정답: {item.answer}</Text>
                  <Text>해설: {item.explanation}</Text>
                </>
              )}
            </ProblemContainer>
          ))
        ) : (
          filteredDifficulty !== null && <Text>추천된 문제가 없습니다.</Text>
        )}
      </ResultContainer>
    </Container>
  );
};

export default RecommendPage;