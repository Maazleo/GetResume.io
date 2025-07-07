import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 3rem;
  background: ${({ theme }) => theme.headerBg};
  color: ${({ theme }) => theme.headerText};
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
`;
const Logo = styled.div`
  font-size: 2rem;
  font-weight: bold;
  letter-spacing: 1px;
`;
const Nav = styled.nav`
  display: flex;
  gap: 2rem;
`;
const NavLink = styled(Link)`
  color: ${({ theme }) => theme.headerText};
  text-decoration: none;
  font-weight: 500;
  font-size: 1.1rem;
  border-bottom: 2px solid transparent;
  transition: border 0.2s, color 0.2s;
  &.active, &:hover {
    color: ${({ theme }) => theme.accent};
    border-bottom: 2px solid ${({ theme }) => theme.accent};
  }
`;
const ThemeToggle = styled.button`
  background: ${({ theme }) => theme.toggleBg};
  border: none;
  color: ${({ theme }) => theme.toggleText};
  padding: 0.5rem 1.5rem;
  border-radius: 24px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  transition: background 0.2s, color 0.2s;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  &:hover {
    background: ${({ theme }) => theme.accent};
    color: #fff;
  }
`;

const Header = ({ onToggleTheme, isDark }) => {
  const location = useLocation();
  return (
    <HeaderContainer>
      <Logo>get_resume.io</Logo>
      <Nav>
        <NavLink to="/" className={location.pathname === '/' ? 'active' : ''}>Home</NavLink>
        <NavLink to="/builder" className={location.pathname === '/builder' ? 'active' : ''}>Builder</NavLink>
        <NavLink to="/preview" className={location.pathname === '/preview' ? 'active' : ''}>Preview</NavLink>
        <NavLink to="/download" className={location.pathname === '/download' ? 'active' : ''}>Download</NavLink>
      </Nav>
      <ThemeToggle onClick={onToggleTheme} aria-label="Toggle theme">
        {isDark ? '🌞' : '🌙'}
        {isDark ? 'Light' : 'Dark'}
      </ThemeToggle>
    </HeaderContainer>
  );
};

export default Header; 