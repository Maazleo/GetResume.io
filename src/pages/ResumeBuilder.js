import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import styled from 'styled-components';
import PersonalInfoForm from '../components/forms/PersonalInfoForm';
import WorkExperienceForm from '../components/forms/WorkExperienceForm';
import EducationForm from '../components/forms/EducationForm';
import SkillsForm from '../components/forms/SkillsForm';
import LanguagesForm from '../components/forms/LanguagesForm';
import CertificationsForm from '../components/forms/CertificationsForm';
import AchievementsForm from '../components/forms/AchievementsForm';
import ProjectsForm from '../components/forms/ProjectsForm';
import SummaryForm from '../components/forms/SummaryForm';
import { useLocation } from 'react-router-dom';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf';
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

const BuilderLayout = styled.div`
  display: flex;
  min-height: 100vh;
  @media (max-width: 900px) {
    flex-direction: column;
  }
`;
const MainContent = styled.main`
  flex: 1;
  margin-left: 220px;
  padding: 3rem 4vw;
  background: ${({ theme }) => theme.bodyBg};
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 900px) {
    margin-left: 0;
    padding: 1rem 0.5rem;
  }
`;
const SectionCard = styled.div`
  width: 100%;
  max-width: 700px;
  background: ${({ theme }) => theme.cardBg};
  color: ${({ theme }) => theme.bodyText};
  border-radius: 18px;
  box-shadow: 0 4px 32px rgba(0,0,0,0.07);
  padding: 2.5rem 2rem 2rem 2rem;
  margin-top: 2rem;
  transition: background 0.2s, color 0.2s;
  @media (max-width: 900px) {
    padding: 1.5rem 0.5rem;
    margin-top: 1rem;
  }
`;
const SectionTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1.2rem;
  color: ${({ theme }) => theme.accent};
`;
const NavBtns = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
`;
const Button = styled.button`
  background: ${({ theme }) => theme.accent};
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 0.6rem 1.5rem;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  &:hover {
    opacity: 0.9;
  }
`;
const TopBar = styled.div`
  width: 100%;
  max-width: 700px;
  margin: 0 auto 1.5rem auto;
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-content: flex-end;
`;
const ImportBtn = styled.button`
  background: ${({ theme }) => theme.accent};
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 0.5rem 1.2rem;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  &:hover { opacity: 0.9; }
`;
const LinkedInBtn = styled(ImportBtn)`
  background: #0077b5;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;
const PDFTextModal = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;
const PDFTextContent = styled.div`
  background: #fff;
  color: #222;
  border-radius: 12px;
  padding: 2rem;
  max-width: 600px;
  max-height: 80vh;
  overflow-y: auto;
`;

const sectionOrder = [
  'Personal Info',
  'Work Experience',
  'Education',
  'Skills',
  'Languages',
  'Certifications',
  'Achievements',
  'Projects',
  'Summary',
];

const initialState = {
  'Personal Info': {},
  'Work Experience': [],
  'Education': [],
  'Skills': [],
  'Languages': [],
  'Certifications': [],
  'Achievements': [],
  'Projects': [],
  'Summary': '',
};

const ResumeBuilder = () => {
  const [selectedSection, setSelectedSection] = useState('Personal Info');
  const [formData, setFormData] = useState(initialState);
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 900);
  const [pdfText, setPdfText] = useState('');
  const [showPdfModal, setShowPdfModal] = useState(false);
  const [showSaved, setShowSaved] = useState(false);

  const sectionIdx = sectionOrder.indexOf(selectedSection);
  const goToNext = () => {
    if (sectionIdx < sectionOrder.length - 1) {
      setSelectedSection(sectionOrder[sectionIdx + 1]);
    }
  };
  const goToPrev = () => {
    if (sectionIdx > 0) {
      setSelectedSection(sectionOrder[sectionIdx - 1]);
    }
  };

  const handleSectionChange = (section) => setSelectedSection(section);
  const handleFormChange = (section, value) => {
    setFormData((prev) => ({ ...prev, [section]: value }));
  };

  // Load from localStorage on mount and on navigation
  useEffect(() => {
    const saved = localStorage.getItem('resumeData');
    if (saved) {
      setFormData(JSON.parse(saved));
    }
  }, [location]);

  // Auto-save
  useEffect(() => {
    localStorage.setItem('resumeData', JSON.stringify(formData));
    setShowSaved(true);
    const timeout = setTimeout(() => setShowSaved(false), 1500);
    return () => clearTimeout(timeout);
  }, [formData]);

  // Close modals on navigation
  useEffect(() => {
    setShowPdfModal(false);
  }, [location]);

  // PDF Import logic
  const handlePdfUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async function() {
      const typedarray = new Uint8Array(this.result);
      const pdf = await pdfjsLib.getDocument({ data: typedarray }).promise;
      let text = '';
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        text += content.items.map(item => item.str).join(' ') + '\n';
      }
      setPdfText(text);
      setShowPdfModal(true);
    };
    reader.readAsArrayBuffer(file);
  };

  // LinkedIn OAuth placeholder
  const handleLinkedInSignIn = () => {
    const clientId = 'YOUR_LINKEDIN_CLIENT_ID';
    const redirectUri = encodeURIComponent(window.location.origin + '/');
    const state = Math.random().toString(36).substring(2);
    const scope = 'r_liteprofile%20r_emailaddress';
    window.location.href =
      `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&state=${state}&scope=${scope}`;
  };

  let formComponent = null;
  switch (selectedSection) {
    case 'Personal Info':
      formComponent = (
        <PersonalInfoForm value={formData['Personal Info']} onChange={v => handleFormChange('Personal Info', v)} />
      );
      break;
    case 'Work Experience':
      formComponent = (
        <WorkExperienceForm value={formData['Work Experience']} onChange={v => handleFormChange('Work Experience', v)} />
      );
      break;
    case 'Education':
      formComponent = (
        <EducationForm value={formData['Education']} onChange={v => handleFormChange('Education', v)} />
      );
      break;
    case 'Skills':
      formComponent = (
        <SkillsForm value={formData['Skills']} onChange={v => handleFormChange('Skills', v)} />
      );
      break;
    case 'Languages':
      formComponent = (
        <LanguagesForm value={formData['Languages']} onChange={v => handleFormChange('Languages', v)} />
      );
      break;
    case 'Certifications':
      formComponent = (
        <CertificationsForm value={formData['Certifications']} onChange={v => handleFormChange('Certifications', v)} />
      );
      break;
    case 'Achievements':
      formComponent = (
        <AchievementsForm value={formData['Achievements']} onChange={v => handleFormChange('Achievements', v)} />
      );
      break;
    case 'Projects':
      formComponent = (
        <ProjectsForm value={formData['Projects']} onChange={v => handleFormChange('Projects', v)} />
      );
      break;
    case 'Summary':
      formComponent = (
        <SummaryForm value={formData['Summary']} onChange={v => handleFormChange('Summary', v)} />
      );
      break;
    default:
      formComponent = null;
  }

  return (
    <BuilderLayout>
      <Sidebar
        selectedSection={selectedSection}
        onSectionSelect={handleSectionChange}
        open={sidebarOpen}
        setOpen={setSidebarOpen}
      />
      <button onClick={() => setSidebarOpen(o => !o)} style={{ position: 'fixed', top: 10, left: 10, zIndex: 1000, display: window.innerWidth <= 900 ? 'block' : 'none' }}>{sidebarOpen ? 'Hide Menu' : 'Show Menu'}</button>
      <MainContent>
        {showSaved && (
          <div style={{
            position: 'fixed',
            top: 24,
            right: 32,
            background: '#3fa7ff',
            color: '#fff',
            padding: '0.6rem 1.5rem',
            borderRadius: '2rem',
            fontWeight: 600,
            fontSize: '1.1rem',
            boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
            zIndex: 3000,
            transition: 'opacity 0.3s',
            opacity: showSaved ? 1 : 0
          }}>
            Saved!
          </div>
        )}
        {/* DEBUG BUTTON - REMOVE AFTER TESTING */}
        <button style={{position:'fixed',bottom:24,right:32,zIndex:4000}} onClick={() => {
          console.log('Current formData state:', formData);
          console.log('localStorage.resumeData:', localStorage.getItem('resumeData'));
        }}>Log formData & localStorage</button>
        <TopBar>
          <label htmlFor="pdf-upload">
            <ImportBtn as="span">Import from PDF</ImportBtn>
            <input
              id="pdf-upload"
              type="file"
              accept="application/pdf"
              style={{ display: 'none' }}
              onChange={handlePdfUpload}
            />
          </label>
          <LinkedInBtn onClick={handleLinkedInSignIn}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="4" fill="#0077B5"/><path d="M7.5 8.5C8.32843 8.5 9 7.82843 9 7C9 6.17157 8.32843 5.5 7.5 5.5C6.67157 5.5 6 6.17157 6 7C6 7.82843 6.67157 8.5 7.5 8.5Z" fill="white"/><rect x="6" y="10" width="3" height="8" rx="1.5" fill="white"/><path d="M13 10.5C13 9.67157 13.6716 9 14.5 9H16.5C17.3284 9 18 9.67157 18 10.5V18.5C18 19.3284 17.3284 20 16.5 20H14.5C13.6716 20 13 19.3284 13 18.5V10.5Z" fill="white"/><rect x="13" y="13" width="5" height="1.5" rx="0.75" fill="#0077B5"/></svg>
            Sign in with LinkedIn
          </LinkedInBtn>
        </TopBar>
        {showPdfModal && (
          <PDFTextModal onClick={() => setShowPdfModal(false)}>
            <PDFTextContent onClick={e => e.stopPropagation()}>
              <h3>Extracted PDF Text</h3>
              <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{pdfText}</pre>
              <ImportBtn style={{ marginTop: '1rem' }} onClick={() => setShowPdfModal(false)}>Close</ImportBtn>
            </PDFTextContent>
          </PDFTextModal>
        )}
        <SectionCard>
          <SectionTitle>{selectedSection}</SectionTitle>
          {formComponent}
          <NavBtns>
            <Button type="button" onClick={goToPrev} disabled={sectionIdx === 0} style={{ opacity: sectionIdx === 0 ? 0.5 : 1 }}>Previous</Button>
            <Button type="button" onClick={goToNext} disabled={sectionIdx === sectionOrder.length - 1} style={{ opacity: sectionIdx === sectionOrder.length - 1 ? 0.5 : 1 }}>Next</Button>
          </NavBtns>
        </SectionCard>
      </MainContent>
    </BuilderLayout>
  );
};

export default ResumeBuilder; 