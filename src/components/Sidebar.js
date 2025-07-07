import React from 'react';
import styled from 'styled-components';
import { FaUser, FaBriefcase, FaGraduationCap, FaTools, FaLanguage, FaCertificate, FaTrophy, FaProjectDiagram, FaAlignLeft } from 'react-icons/fa';

const SidebarContainer = styled.aside`
  width: 220px;
  background: ${({ theme }) => theme.headerBg};
  height: 100vh;
  padding: 2.5rem 1rem 1rem 1.5rem;
  box-shadow: 2px 0 8px rgba(0,0,0,0.04);
  position: fixed;
  left: 0;
  top: 0;
  transition: background 0.2s;
`;
const SectionList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;
const SectionItem = styled.li`
  margin-bottom: 1.5rem;
  font-weight: 500;
  cursor: pointer;
  color: ${({ theme, selected }) => selected ? theme.accent : theme.headerText};
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-size: 1.08rem;
  border-radius: 8px;
  padding: 0.5rem 0.8rem;
  background: ${({ selected, theme }) => selected ? theme.toggleBg : 'transparent'};
  transition: background 0.2s, color 0.2s;
  &:hover {
    background: ${({ theme }) => theme.toggleBg};
    color: ${({ theme }) => theme.accent};
  }
`;

const sections = [
  { label: 'Personal Info', icon: <FaUser /> },
  { label: 'Work Experience', icon: <FaBriefcase /> },
  { label: 'Education', icon: <FaGraduationCap /> },
  { label: 'Skills', icon: <FaTools /> },
  { label: 'Languages', icon: <FaLanguage /> },
  { label: 'Certifications', icon: <FaCertificate /> },
  { label: 'Achievements', icon: <FaTrophy /> },
  { label: 'Projects', icon: <FaProjectDiagram /> },
  { label: 'Summary', icon: <FaAlignLeft /> },
];

const Sidebar = ({ onSectionSelect, selectedSection }) => (
  <SidebarContainer>
    <SectionList>
      {sections.map(section => (
        <SectionItem
          key={section.label}
          selected={selectedSection === section.label}
          onClick={() => onSectionSelect(section.label)}
        >
          {section.icon}
          {section.label}
        </SectionItem>
      ))}
    </SectionList>
  </SidebarContainer>
);

export default Sidebar; 