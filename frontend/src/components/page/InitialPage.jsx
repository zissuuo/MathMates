import React from "react";

import styled from "styled-components";

import ImgUpload from "../ui/ImgUpload";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
`;


const InitialPage = () => {
    return (
        <Container>
            <ImgUpload />
        </Container>
    );
}

export default InitialPage;