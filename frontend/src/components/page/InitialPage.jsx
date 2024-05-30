import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ImgUpload from "../ui/ImgUpload";

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

const UploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: white;
  border-radius: 30px;
  width: 80%;
  height: 380px;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
  z-index: 1;
`;

const SubmitButton = styled.button`
  width: 20%;
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

const Overlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(161, 161, 161, 0.483);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const blink = keyframes`
  0% { opacity: 0; }
  50% { opacity: 1; }
  100% { opacity: 0; }
`;

const OverlayMessage = styled.div`
  background-color: rgba(255, 255, 255, 0.801);
  border-radius: 70px;
  color: #252a2f;
  font-family: "Pretendard-Bold";
  font-size: 20px;
  text-align: center;
  padding-left: 40px;
  padding-right: 40px;
  padding-top: 20px;
  padding-bottom: 20px;
  display: flex;
  align-items: center;
`;

const Dot = styled.span`
  animation: ${blink} 1s infinite;
  &:nth-child(2) {
    animation-delay: 0.2s;
  }
  &:nth-child(3) {
    animation-delay: 0.4s;
  }
`;

const InitialPage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleFileSelect = (file) => {
    setSelectedFile(file);
  };

  const handleSubmit = async () => {
    if (!selectedFile) {
      alert("이미지를 선택해주세요.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    setIsLoading(true);

    // try {
    //   const response = await axios.post("http://localhost:8000/solve-problem", formData, {
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //     },
    //   });
    //   navigate('/explain', { state: { result: response.data } });
    // } catch (error) {
    //   console.error("Error solving problem:", error);
    //   alert("문제를 해결하는 중 오류가 발생했습니다.");
    // } finally {
    //   setIsLoading(false);
    // }
  };

  return (
    <Container>
      <TitleContainer>
        <Message>교육통계의 이해</Message>
        <Title>MATHMATES</Title>
      </TitleContainer>
      <Circle />
      <UploadContainer>
        <ImgUpload onFileSelect={handleFileSelect} />
      </UploadContainer>
      <SubmitButton onClick={handleSubmit}>풀이</SubmitButton>
      {isLoading && (
        <Overlay>
          <OverlayMessage>
            ✏️ 문제를 풀고 있어요
            <Dot>.</Dot>
            <Dot>.</Dot>
            <Dot>.</Dot>
          </OverlayMessage>
        </Overlay>
      )}
    </Container>
  );
};

export default InitialPage;