import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { DndContext, closestCenter } from '@dnd-kit/core';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

const templates = [
  { name: 'Modern', id: 'modern' },
  { name: 'Classic', id: 'classic' },
  { name: 'Creative', id: 'creative' },
];

const templateStyles = {
  modern: {
    fontFamily: 'Inter, Segoe UI, Arial, sans-serif',
    color: '#222',
    accent: '#61dafb',
    sectionSpacing: '1.5rem',
    sectionTitleTransform: 'uppercase',
    sectionTitleColor: '#61dafb',
    borderBottom: '2px solid #e0e0e0',
  },
  classic: {
    fontFamily: 'Georgia, Times New Roman, serif',
    color: '#222',
    accent: '#2d3436',
    sectionSpacing: '1.2rem',
    sectionTitleTransform: 'none',
    sectionTitleColor: '#2d3436',
    borderBottom: '1px solid #b2bec3',
  },
  creative: {
    fontFamily: 'Poppins, Arial, sans-serif',
    color: '#222',
    accent: '#e17055',
    sectionSpacing: '2rem',
    sectionTitleTransform: 'capitalize',
    sectionTitleColor: '#e17055',
    borderBottom: '3px double #e17055',
  },
};

const PreviewContainer = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  background: ${({ theme }) => theme.cardBg};
  color: ${({ theme }) => theme.bodyText};
  border-radius: 16px;
  box-shadow: 0 4px 32px rgba(0,0,0,0.07);
  padding: 2.5rem 2rem;
  position: relative;
  @media (max-width: 900px) {
    padding: 1rem 0.5rem;
    margin: 0.5rem;
    border-radius: 8px;
  }
`;
const ResumeHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  border-bottom: 2px solid ${({ theme }) => theme.border};
  padding-bottom: 1.5rem;
  margin-bottom: 1.5rem;
`;
const Photo = styled.img`
  width: 90px;
  height: 90px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid ${({ theme }) => theme.accent};
`;
const NameTitle = styled.div`
  flex: 1;
`;
const Name = styled.h1`
  font-size: 2.2rem;
  margin: 0;
`;
const Title = styled.h2`
  font-size: 1.2rem;
  font-weight: 500;
  margin: 0.2rem 0 0 0;
  color: ${({ theme }) => theme.accent};
`;
const Section = styled.section`
  margin-bottom: 1.5rem;
`;
const SectionTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: ${({ theme }) => theme.accent};
`;
const BulletList = styled.ul`
  margin: 0;
  padding-left: 1.2rem;
`;
const FullScreenBtn = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: ${({ theme }) => theme.accent};
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 0.4rem 1.2rem;
  font-weight: 600;
  cursor: pointer;
  z-index: 10;
`;
const ActionButton = styled.button`
  background: ${({ primary, theme }) => primary ? theme.accent : 'transparent'};
  color: ${({ primary, theme }) => primary ? '#fff' : theme.text};
  border: ${({ primary, theme }) => primary ? 'none' : `1px solid ${theme.border}`};
  border-radius: 8px;
  padding: 0.7rem 1rem;
  font-weight: 500;
  font-size: 0.9rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 0.6rem;
  transition: all 0.2s ease;
  white-space: nowrap;
  min-width: 140px;
  
  &:hover {
    transform: translateX(-4px);
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
    background: ${({ primary, theme }) => primary ? theme.accent : theme.hoverBg};
  }
  
  &:active {
    transform: translateX(0);
  }
  
  svg {
    flex-shrink: 0;
    width: 18px;
    height: 18px;
  }
  
  @media (max-width: 768px) {
    min-width: auto;
    padding: 0.6rem;
    font-size: 0;
    justify-content: center;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    
    svg {
      margin: 0;
    }
    
    &:hover {
      transform: translateY(-2px);
    }
  }
`;
const TemplateBar = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
`;
const TemplateSelect = styled.select`
  padding: 0.5rem 1rem;
  border-radius: 6px;
  border: 1.5px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.inputBg};
  color: ${({ theme }) => theme.inputText};
`;
const DraggableSection = styled.div`
  margin-bottom: 1.5rem;
  cursor: grab;
  border: 2px dashed transparent;
  &:active {
    cursor: grabbing;
  }
`;
const ActionBar = styled.div`
  position: fixed;
  top: 50%;
  right: 1rem;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.95);
  padding: 1.25rem 0.75rem;
  border-radius: 16px;
  box-shadow: 0 4px 25px rgba(0, 0, 0, 0.12);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(0, 0, 0, 0.08);
  max-height: 90vh;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: rgba(0,0,0,0.2) transparent;
  
  &::-webkit-scrollbar {
    width: 4px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: rgba(0,0,0,0.2);
    border-radius: 10px;
  }
  
  @media (max-width: 768px) {
    flex-direction: row;
    top: auto;
    bottom: 0.5rem;
    left: 0.5rem;
    right: 0.5rem;
    transform: none;
    padding: 0.75rem;
    justify-content: center;
    max-width: 100%;
    border-radius: 12px;
    box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.1);
  }
`;
const ModalOverlay = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.4);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ModalBox = styled.div`
  background: #fff;
  color: #222;
  border-radius: 12px;
  padding: 2rem 2.5rem;
  min-width: 320px;
  max-width: 90vw;
  box-shadow: 0 4px 32px rgba(0,0,0,0.15);
`;

function getResumeData() {
  // For now, load from localStorage (simulate live data)
  try {
    const data = localStorage.getItem('resumeData');
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

const Preview = () => {
  const [resume, setResume] = useState(getResumeData());
  const [fullScreen, setFullScreen] = useState(false);
  const [printView, setPrintView] = useState(false);
  const [template, setTemplate] = useState('modern');
  const [sectionOrder, setSectionOrder] = useState([
    'Summary',
    'Skills',
    'Work Experience',
    'Projects',
    'Education',
    'Certifications',
    'Achievements',
    'Languages',
  ]);

  const [atsOpen, setAtsOpen] = useState(false);
  const [atsResult, setAtsResult] = useState(null);
  const resumeRef = useRef(null);

  useEffect(() => {
    const handle = () => setResume(getResumeData());
    window.addEventListener('storage', handle);
    return () => window.removeEventListener('storage', handle);
  }, []);

  useEffect(() => {
    // Save template and sectionOrder for Download page
    localStorage.setItem('resumeTemplate', template);
    localStorage.setItem('resumeSectionOrder', JSON.stringify(sectionOrder));
  }, [template, sectionOrder]);

  if (!resume) return <div style={{ padding: '2rem', textAlign: 'center' }}>No resume data found. Please fill out your resume first.</div>;

  const info = resume['Personal Info'] || {};

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = sectionOrder.indexOf(active.id);
      const newIndex = sectionOrder.indexOf(over.id);
      const newOrder = [...sectionOrder];
      newOrder.splice(oldIndex, 1);
      newOrder.splice(newIndex, 0, active.id);
      setSectionOrder(newOrder);
    }
  };

  const style = templateStyles[template] || templateStyles.modern;

  const handleImageDownload = async () => {
    const input = resumeRef.current;
    if (!input) {
      console.error('Resume element not found');
      return;
    }
    
    // Show loading state
    const loadingDiv = document.createElement('div');
    loadingDiv.style.position = 'fixed';
    loadingDiv.style.top = '50%';
    loadingDiv.style.left = '50%';
    loadingDiv.style.transform = 'translate(-50%, -50%)';
    loadingDiv.style.padding = '20px';
    loadingDiv.style.background = 'rgba(255,255,255,0.9)';
    loadingDiv.style.borderRadius = '8px';
    loadingDiv.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
    loadingDiv.style.zIndex = '9999';
    loadingDiv.innerHTML = '<div>Generating image, please wait...</div>';
    document.body.appendChild(loadingDiv);
    
    try {
      // Add a small delay to ensure the loading message is shown
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const canvas = await html2canvas(input, {
        scale: 2,
        backgroundColor: '#fff',
        useCORS: true,
        logging: false,
        allowTaint: true,
        windowHeight: input.scrollHeight,
        height: input.scrollHeight,
        width: input.offsetWidth,
        onclone: (clonedDoc) => {
          // Ensure proper styling is applied
          const style = clonedDoc.createElement('style');
          style.textContent = `
            body { 
              margin: 0; 
              padding: 0; 
              background: white !important;
            }
          `;
          clonedDoc.head.appendChild(style);
        }
      });
      
      const link = document.createElement('a');
      link.download = 'resume.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Error generating image:', error);
      alert('Failed to generate image. Please try again.');
    } finally {
      // Remove loading indicator
      if (document.body.contains(loadingDiv)) {
        document.body.removeChild(loadingDiv);
      }
    }
  };

  const handleDownloadPDF = async () => {
    const input = resumeRef.current;
    if (!input) {
      console.error('Resume element not found');
      return;
    }
    
    // Show loading state
    const loadingDiv = document.createElement('div');
    loadingDiv.style.position = 'fixed';
    loadingDiv.style.top = '50%';
    loadingDiv.style.left = '50%';
    loadingDiv.style.transform = 'translate(-50%, -50%)';
    loadingDiv.style.padding = '20px';
    loadingDiv.style.background = 'rgba(255,255,255,0.9)';
    loadingDiv.style.borderRadius = '8px';
    loadingDiv.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
    loadingDiv.style.zIndex = '9999';
    loadingDiv.innerHTML = '<div>Generating PDF, please wait...</div>';
    document.body.appendChild(loadingDiv);
    
    try {
      // Add a small delay to ensure the loading message is shown
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      
      // Get the full height of the resume content
      const fullHeight = input.scrollHeight;
      const scale = pageWidth / input.offsetWidth;
      
      // Calculate how many pages we need
      const pages = Math.ceil((fullHeight * scale) / pageHeight);
      
      // Create a canvas for each page
      for (let i = 0; i < pages; i++) {
        if (i > 0) {
          pdf.addPage();
        }
        
        const canvas = await html2canvas(input, {
          scale: 2,
          useCORS: true,
          logging: false,
          allowTaint: true,
          windowHeight: input.scrollHeight,
          height: input.scrollHeight,
          width: input.offsetWidth,
          y: (i * pageHeight) / scale,
          scrollY: (i * pageHeight) / scale,
          onclone: (clonedDoc) => {
            // Ensure proper styling is applied
            const style = clonedDoc.createElement('style');
            style.textContent = `
              body { 
                margin: 0; 
                padding: 0; 
                background: white !important;
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
              }
              * { 
                -webkit-print-color-adjust: exact !important; 
                print-color-adjust: exact !important;
              }
            `;
            clonedDoc.head.appendChild(style);
          }
        });
        
        const imgData = canvas.toDataURL('image/png');
        pdf.addImage(imgData, 'PNG', 0, 0, pageWidth, 0, undefined, 'FAST');
      }
      
      // Save the PDF
      pdf.save('resume.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      // Remove loading indicator
      if (document.body.contains(loadingDiv)) {
        document.body.removeChild(loadingDiv);
      }
    }
  };

  const runATS = () => {
    // Simulate ATS scan
    let score = 0;
    let feedback = [];
    // Keywords: check for 'React', 'JavaScript', 'resume', 'project', 'experience'
    const text = JSON.stringify(resume).toLowerCase();
    const keywords = ['react', 'javascript', 'resume', 'project', 'experience'];
    let keywordCount = 0;
    keywords.forEach(k => { if (text.includes(k)) keywordCount++; });
    score += keywordCount * 20;
    if (keywordCount < keywords.length) feedback.push('Add more relevant keywords.');
    else feedback.push('Great keyword coverage!');
    // Formatting: check for section order and length
    if (sectionOrder.length >= 6) { score += 20; feedback.push('Good section structure.'); } else { feedback.push('Add more sections.'); }
    // Readability: check for short sentences
    const sentences = text.split(/[.!?]/).filter(Boolean);
    const avgLen = sentences.reduce((a, b) => a + b.length, 0) / (sentences.length || 1);
    if (avgLen < 120) { score += 20; feedback.push('Good readability.'); } else { feedback.push('Shorten your sentences.'); }
    setAtsResult({ score: Math.min(score, 100), feedback });
    setAtsOpen(true);
  };

  return (
    <div>
      <ActionBar>
        <ActionButton 
          primary 
          onClick={handleDownloadPDF}
          title="Download as PDF"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="7 10 12 15 17 10"/>
            <line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
          PDF
        </ActionButton>
        <ActionButton 
          onClick={handleImageDownload}
          title="Download as PNG"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
            <circle cx="8.5" cy="8.5" r="1.5"/>
            <polyline points="21 15 16 10 5 21"/>
          </svg>
          PNG
        </ActionButton>
        <ActionButton 
          onClick={() => setPrintView(v => !v)}
          title={printView ? 'Exit Print View' : 'View in Print Mode'}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 6 2 18 2 18 9"/>
            <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/>
            <rect x="6" y="14" width="12" height="8"/>
          </svg>
          {printView ? 'Exit Print' : 'Print'}
        </ActionButton>
        <ActionButton 
          onClick={runATS}
          title="Check ATS Score"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
            <polyline points="22 4 12 14.01 9 11.01"/>
          </svg>
          ATS Check
        </ActionButton>
        <ActionButton 
          onClick={() => setFullScreen(f => !f)}
          title={fullScreen ? 'Exit Full Screen' : 'View Full Screen'}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {fullScreen ? (
              <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"/>
            ) : (
              <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
            )}
          </svg>
          {fullScreen ? 'Exit Full' : 'Full Screen'}
        </ActionButton>
      </ActionBar>
      
      <div style={{ paddingTop: fullScreen ? '5rem' : '0' }}>
        <PreviewContainer
          ref={resumeRef}
          className={printView ? 'print-view' : ''}
          style={{
            maxWidth: fullScreen ? '100%' : '800px',
            margin: fullScreen ? '0' : '2rem auto',
            borderRadius: fullScreen ? '0' : '16px',
            padding: fullScreen ? '3rem' : '2.5rem 2rem',
            ...templateStyles[template],
            marginTop: '1rem',
          }}
        >
        <TemplateBar>
          <span>Template:</span>
          <TemplateSelect value={template} onChange={e => setTemplate(e.target.value)}>
            {templates.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
          </TemplateSelect>
        </TemplateBar>
        <FullScreenBtn onClick={() => setFullScreen(f => !f)}>{fullScreen ? 'Exit Review Mode' : 'Full Screen Review'}</FullScreenBtn>
        <ResumeHeader style={{ borderBottom: style.borderBottom }}>
          {info.photo && typeof info.photo === 'string' && <Photo src={info.photo} alt="Profile" />}
          <NameTitle>
            <Name>{info.name}</Name>
            <Title style={{ color: style.accent }}>{info.title}</Title>
            <div>{info.email} | {info.phone} | {info.linkedin} | {info.address}</div>
          </NameTitle>
        </ResumeHeader>
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          {sectionOrder.map((section, idx) => (
            <DraggableSection key={section} id={section} style={{ marginBottom: style.sectionSpacing }}>
              {/* Render section content based on section name */}
              {section === 'Summary' && resume['Summary'] && (
                <Section>
                  <SectionTitle style={{ textTransform: style.sectionTitleTransform, color: style.sectionTitleColor }}>Summary</SectionTitle>
                  <div>{resume['Summary']}</div>
                </Section>
              )}
              {section === 'Skills' && resume['Skills'] && resume['Skills'].length > 0 && (
                <Section>
                  <SectionTitle style={{ textTransform: style.sectionTitleTransform, color: style.sectionTitleColor }}>Skills</SectionTitle>
                  <BulletList>
                    {resume['Skills'].map((s, i) => <li key={i}>{s}</li>)}
                  </BulletList>
                </Section>
              )}
              {section === 'Work Experience' && resume['Work Experience'] && resume['Work Experience'].length > 0 && (
                <Section>
                  <SectionTitle style={{ textTransform: style.sectionTitleTransform, color: style.sectionTitleColor }}>Work Experience</SectionTitle>
                  {resume['Work Experience'].map((exp, i) => (
                    <div key={i} style={{ marginBottom: '1rem' }}>
                      <strong>{exp.role}</strong> at <strong>{exp.company}</strong> ({exp.start} - {exp.end})
                      <div>{exp.description}</div>
                    </div>
                  ))}
                </Section>
              )}
              {section === 'Projects' && resume['Projects'] && resume['Projects'].length > 0 && (
                <Section>
                  <SectionTitle style={{ textTransform: style.sectionTitleTransform, color: style.sectionTitleColor }}>Projects</SectionTitle>
                  {resume['Projects'].map((proj, i) => (
                    <div key={i} style={{ marginBottom: '1rem' }}>
                      <strong>{proj.title}</strong> [{proj.technologies}]
                      <div>{proj.description}</div>
                      {proj.link && <div><a href={proj.link} target="_blank" rel="noopener noreferrer">{proj.link}</a></div>}
                    </div>
                  ))}
                </Section>
              )}
              {section === 'Education' && resume['Education'] && resume['Education'].length > 0 && (
                <Section>
                  <SectionTitle style={{ textTransform: style.sectionTitleTransform, color: style.sectionTitleColor }}>Education</SectionTitle>
                  {resume['Education'].map((edu, i) => (
                    <div key={i} style={{ marginBottom: '1rem' }}>
                      <strong>{edu.degree}</strong> at <strong>{edu.university}</strong> ({edu.start} - {edu.end})
                      <div>CGPA/Percentage: {edu.cgpa}</div>
                    </div>
                  ))}
                </Section>
              )}
              {section === 'Certifications' && resume['Certifications'] && resume['Certifications'].length > 0 && (
                <Section>
                  <SectionTitle style={{ textTransform: style.sectionTitleTransform, color: style.sectionTitleColor }}>Certifications</SectionTitle>
                  <BulletList>
                    {resume['Certifications'].map((cert, i) => <li key={i}>{cert.name} ({cert.issuer}, {cert.year})</li>)}
                  </BulletList>
                </Section>
              )}
              {section === 'Achievements' && resume['Achievements'] && resume['Achievements'].length > 0 && (
                <Section>
                  <SectionTitle style={{ textTransform: style.sectionTitleTransform, color: style.sectionTitleColor }}>Achievements</SectionTitle>
                  <BulletList>
                    {resume['Achievements'].map((ach, i) => <li key={i}>{ach}</li>)}
                  </BulletList>
                </Section>
              )}
              {section === 'Languages' && resume['Languages'] && resume['Languages'].length > 0 && (
                <Section>
                  <SectionTitle style={{ textTransform: style.sectionTitleTransform, color: style.sectionTitleColor }}>Languages</SectionTitle>
                  <BulletList>
                    {resume['Languages'].map((lang, i) => <li key={i}>{lang}</li>)}
                  </BulletList>
                </Section>
              )}
            </DraggableSection>
          ))}
        </DndContext>

        {atsOpen && (
          <ModalOverlay onClick={() => setAtsOpen(false)}>
            <ModalBox onClick={e => e.stopPropagation()}>
              <h2>ATS Scan Result</h2>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, margin: '1rem 0' }}>Score: {atsResult?.score}/100</div>
              <ul>
                {atsResult?.feedback.map((f, i) => <li key={i}>{f}</li>)}
              </ul>
              <button style={{ marginTop: 16 }} onClick={() => setAtsOpen(false)}>Close</button>
            </ModalBox>
          </ModalOverlay>
        )}
        </PreviewContainer>
      </div>
    </div>
  );
};

export default Preview; 