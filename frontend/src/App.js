import React from 'react';
import { createGlobalStyle } from 'styled-components';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';

import InitialPage from './components/page/InitialPage';
import ExplainPage from './components/page/ExplainPage';
import RecommendPage from './components/page/RecommendPage';

const AllGlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Pretendard-ExtraBold';
    src: url('/font/Pretendard-ExtraBold.ttf') format('truetype');
  }
  @font-face {
    font-family: 'Pretendard-Regular';
    src: url('/font/Pretendard-Regular.ttf') format('truetype');
  }
  @font-face {
    font-family: 'Pretendard-Bold';
    src: url('/font/Pretendard-Bold.ttf') format('truetype');
  }
  @font-face {
    font-family: 'Pretendard-Light';
    src: url('/font/Pretendard-Light.ttf') format('truetype');
  }
  @font-face {
    font-family: 'Pretendard-SemiBold';
    src: url('/font/Pretendard-SemiBold.ttf') format('truetype');
  }
  @font-face {
    font-family: 'Pretendard-Medium';
    src: url('/font/Pretendard-Medium.ttf') format('truetype');
  }
`;

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 500px;
  margin: 0 auto;
  background-color: #f8f8f8;
  min-height: 100vh;
`;

function App() {
  return (
    <Router>
      <AllGlobalStyle />
      <AppContainer>
        <Routes>
          <Route path="/" element={<InitialPage />} />
          <Route path="/explain" element={<ExplainPage />} />
          <Route path="/recommend" element={<RecommendPage/>} />
        </Routes>
      </AppContainer>
    </Router>
  );
}

export default App;