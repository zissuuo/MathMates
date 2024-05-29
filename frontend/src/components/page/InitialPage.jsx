import React, { useState } from "react";
import styled from "styled-components";

import ImgUpload from "../ui/ImgUpload";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
`;


const InitialPage = () => {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileSelect = (file) => {
        console.log(file);
        setSelectedFile(file);
    };

    return (
        <Container>
            <ImgUpload onFileSelect={handleFileSelect}/>
        </Container>
    );
}

export default InitialPage;