import React, { useState, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import Home from './pages/Home';
import ResumeBuilder from './pages/ResumeBuilder';
import Preview from './pages/Preview';
import Download from './pages/Download';
import PublicResume from './pages/PublicResume';
import Header from './components/Header';
import './App.css';

const lightTheme = {
  headerBg: '#fff',
  headerText: '#222',
  accent: '#3fa7ff',
  toggleBg: '#f5f6fa',
  toggleText: '#222',
  bodyBg: '#f5f6fa',
  bodyText: '#222',
};
const darkTheme = {
  headerBg: '#181c1f',
  headerText: '#f5f6fa',
  accent: '#3fa7ff',
  toggleBg: '#23272b',
  toggleText: '#f5f6fa',
  bodyBg: '#101215',
  bodyText: '#f5f6fa',
};

const GlobalStyle = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.bodyBg};
    color: ${({ theme }) => theme.bodyText};
    transition: background 0.2s, color 0.2s;
    font-family: 'Inter', 'Segoe UI', Arial, sans-serif;
  }
`;

function App() {
  const [isDark, setIsDark] = useState(false);
  const theme = useMemo(() => (isDark ? darkTheme : lightTheme), [isDark]);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router>
        <Header onToggleTheme={() => setIsDark((d) => !d)} isDark={isDark} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/builder" element={<ResumeBuilder />} />
          <Route path="/preview" element={<Preview />} />
          <Route path="/download" element={<Download />} />
          <Route path="/resume/:id" element={<PublicResume />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
