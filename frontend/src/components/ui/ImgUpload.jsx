import React, { useRef, useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  width: 100%;
`;

const UploadArea = styled.div`
  width: 100%;
  height: 380px;
  border-radius: 30px;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  box-shadow: inset 0px 0px 3px rgba(0, 0, 0, 0.1);
  justify-content: center;
  align-items: center;
  color: #252a2f;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #dcdcdc;
  }
  font-family: 'Pretendard-SemiBold';
  font-size: 13px;
  color: #8d8f90;
  position: relative;
  overflow: hidden;
`;

const PreviewContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative; // 수정된 부분
`;

const PreviewImage = styled.img`
  max-width: 80%;
  max-height: 80%;
  object-fit: contain;
  border-radius: 5px;
`;

const HiddenInput = styled.input`
  display: none;
`;

const Instruction = styled.div`
  text-align: center;
`;

const Emoji = styled.div`
  font-size: 2rem;
`;

const Text = styled.div`
  margin-top: 10px;
`;

const ImgUpload = ({ onFileSelect }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState('');
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      setSelectedFile(file);
      onFileSelect(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewURL(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    handleFileChange(event);
  };

  return (
    <Container>
      <UploadArea onClick={handleClick} onDrop={handleDrop} onDragOver={handleDragOver}>
        {previewURL ? (
          <PreviewContainer>
            <PreviewImage src={previewURL} alt="Preview" />
          </PreviewContainer>
        ) : (
          <Instruction>
            <Emoji>🤔</Emoji>
            <Text>궁금한 문제를 찍어 업로드해주세요</Text>
            <Text>여기를 클릭</Text>
          </Instruction>
        )}
      </UploadArea>
      <HiddenInput
        type="file"
        onChange={handleFileChange}
        ref={fileInputRef}
      />
    </Container>
  );
};

export default ImgUpload;