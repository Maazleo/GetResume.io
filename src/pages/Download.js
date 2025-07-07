import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { useReactToPrint } from 'react-to-print';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

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

const DownloadContainer = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  background: ${({ theme }) => theme.cardBg};
  color: ${({ theme }) => theme.bodyText};
  border-radius: 16px;
  box-shadow: 0 4px 32px rgba(0,0,0,0.07);
  padding: 2.5rem 2rem;
  @media (max-width: 900px) {
    padding: 1rem 0.5rem;
    margin: 0.5rem;
    border-radius: 8px;
  }
`;

const ActionBar = styled.div`
  position: fixed;
  top: 1rem;
  right: 1rem;
  display: flex;
  gap: 1rem;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.9);
  padding: 0.75rem 1rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(0, 0, 0, 0.1);
  flex-wrap: wrap;
  max-width: calc(100% - 2rem);
  
  @media (max-width: 768px) {
    top: auto;
    bottom: 1rem;
    left: 1rem;
    right: 1rem;
    justify-content: center;
    padding: 0.5rem;
  }
`;

const ActionButton = styled.button`
  background: ${({ primary, theme }) => primary ? theme.accent : 'transparent'};
  color: ${({ primary }) => primary ? '#fff' : 'inherit'};
  border: ${({ primary, theme }) => primary ? 'none' : `1px solid ${theme.accent}`};
  border-radius: 8px;
  padding: 0.6rem 1.25rem;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s ease;
  white-space: nowrap;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    background: ${({ primary, theme }) => primary ? theme.accent : 'rgba(0, 0, 0, 0.03)'};
  }
  
  &:active {
    transform: translateY(0);
  }
  
  @media (max-width: 768px) {
    padding: 0.5rem 1rem;
    font-size: 0.85rem;
  }
`;

function getResumeData() {
  try {
    const data = localStorage.getItem('resumeData');
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

const Download = () => {
  const [resume, setResume] = useState(getResumeData());
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
  const pdfRef = useRef();

  useEffect(() => {
    setResume(getResumeData());
    const t = localStorage.getItem('resumeTemplate');
    setTemplate(t || 'modern');
    const so = localStorage.getItem('resumeSectionOrder');
    if (so) setSectionOrder(JSON.parse(so));
  }, []);

  const handlePrint = useReactToPrint({
    content: () => pdfRef.current,
    documentTitle: 'resume',
  });

  const handleDownloadPDF = () => {
    const input = pdfRef.current;
    const pdf = new jsPDF('p', 'mm', 'a4');
    const width = pdf.internal.pageSize.getWidth();
    const height = (input.offsetHeight * width) / input.offsetWidth;
    
    html2canvas(input, {
      scale: 2,
      useCORS: true,
      logging: false,
      allowTaint: true,
      scrollY: -window.scrollY
    }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      pdf.addImage(imgData, 'PNG', 0, 0, width, height);
      pdf.save('resume.pdf');
    });
  };

  const handleDownloadPNG = async () => {
    const input = pdfRef.current;
    const canvas = await html2canvas(input, { 
      scale: 2, 
      backgroundColor: '#fff',
      useCORS: true,
      logging: false,
      allowTaint: true
    });
    const link = document.createElement('a');
    link.download = 'resume.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  if (!resume) return <div style={{ padding: '2rem', textAlign: 'center' }}>No resume data found. Please fill out your resume first.</div>;

  const info = resume['Personal Info'] || {};
  const style = templateStyles[template] || templateStyles.modern;
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
          onClick={handleDownloadPNG}
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
          onClick={handlePrint}
          title="Print Resume"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 6 2 18 2 18 9"/>
            <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/>
            <rect x="6" y="14" width="12" height="8"/>
          </svg>
          Print
        </ActionButton>
      </ActionBar>
      
      <div style={{ paddingTop: '5rem' }}>
        <DownloadContainer>
          <div ref={pdfRef} style={{ 
            background: '#fff', 
            color: style.color, 
            padding: '2rem', 
            borderRadius: 8, 
            fontFamily: style.fontFamily, 
            boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
            margin: '0 auto',
            maxWidth: '210mm',
            minHeight: '297mm',
            boxSizing: 'border-box'
          }}>
            <h1 style={{ fontSize: '2rem', margin: 0 }}>{info.name}</h1>
            <h2 style={{ fontSize: '1.1rem', color: style.accent, margin: '0.2rem 0 0.7rem 0' }}>{info.title}</h2>
            <div style={{ marginBottom: 16 }}>{info.email} | {info.phone} | {info.linkedin} | {info.address}</div>
            {sectionOrder.map((section, idx) => (
              <div key={section} style={{ marginBottom: style.sectionSpacing }}>
                {section === 'Summary' && resume['Summary'] && (
                  <div>
                    <div style={{ fontWeight: 700, textTransform: style.sectionTitleTransform, color: style.sectionTitleColor, marginBottom: 4 }}>Summary</div>
                    <div>{resume['Summary']}</div>
                  </div>
                )}
                {section === 'Skills' && resume['Skills'] && resume['Skills'].length > 0 && (
                  <div>
                    <div style={{ fontWeight: 700, textTransform: style.sectionTitleTransform, color: style.sectionTitleColor, marginBottom: 4 }}>Skills</div>
                    <div>{resume['Skills'].join(', ')}</div>
                  </div>
                )}
                {section === 'Work Experience' && resume['Work Experience'] && resume['Work Experience'].length > 0 && (
                  <div>
                    <div style={{ fontWeight: 700, textTransform: style.sectionTitleTransform, color: style.sectionTitleColor, marginBottom: 4 }}>Work Experience</div>
                    <ul style={{ margin: 0, paddingLeft: 18 }}>
                      {resume['Work Experience'].map((exp, i) => (
                        <li key={i}><b>{exp.role}</b> at <b>{exp.company}</b> ({exp.start} - {exp.end}): {exp.description}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {section === 'Projects' && resume['Projects'] && resume['Projects'].length > 0 && (
                  <div>
                    <div style={{ fontWeight: 700, textTransform: style.sectionTitleTransform, color: style.sectionTitleColor, marginBottom: 4 }}>Projects</div>
                    <ul style={{ margin: 0, paddingLeft: 18 }}>
                      {resume['Projects'].map((proj, i) => (
                        <li key={i}><b>{proj.title}</b> [{proj.technologies}]: {proj.description} {proj.link && <span>({proj.link})</span>}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {section === 'Education' && resume['Education'] && resume['Education'].length > 0 && (
                  <div>
                    <div style={{ fontWeight: 700, textTransform: style.sectionTitleTransform, color: style.sectionTitleColor, marginBottom: 4 }}>Education</div>
                    <ul style={{ margin: 0, paddingLeft: 18 }}>
                      {resume['Education'].map((edu, i) => (
                        <li key={i}><b>{edu.degree}</b> at <b>{edu.university}</b> ({edu.start} - {edu.end}), CGPA/Percentage: {edu.cgpa}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {section === 'Certifications' && resume['Certifications'] && resume['Certifications'].length > 0 && (
                  <div>
                    <div style={{ fontWeight: 700, textTransform: style.sectionTitleTransform, color: style.sectionTitleColor, marginBottom: 4 }}>Certifications</div>
                    <div>{resume['Certifications'].map((cert, i) => `${cert.name} (${cert.issuer}, ${cert.year})`).join(', ')}</div>
                  </div>
                )}
                {section === 'Achievements' && resume['Achievements'] && resume['Achievements'].length > 0 && (
                  <div>
                    <div style={{ fontWeight: 700, textTransform: style.sectionTitleTransform, color: style.sectionTitleColor, marginBottom: 4 }}>Achievements</div>
                    <div>{resume['Achievements'].join(', ')}</div>
                  </div>
                )}
                {section === 'Languages' && resume['Languages'] && resume['Languages'].length > 0 && (
                  <div>
                    <div style={{ fontWeight: 700, textTransform: style.sectionTitleTransform, color: style.sectionTitleColor, marginBottom: 4 }}>Languages</div>
                    <div>{resume['Languages'].join(', ')}</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </DownloadContainer>
      </div>
    </div>
  );
};

const PrintTest = () => {
  const testRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => testRef.current,
    documentTitle: 'test-print',
  });
  return (
    <div style={{ margin: '2rem', padding: '2rem', border: '1px solid #ccc' }}>
      <div ref={testRef} style={{ background: '#fff', color: '#222', padding: '2rem', borderRadius: 8 }}>
        <h2>Test Print Content</h2>
        <p>This is a minimal test for react-to-print. If you see this in the print dialog, react-to-print is working.</p>
      </div>
      <button onClick={handlePrint} style={{ marginTop: '1rem', padding: '0.5rem 1.5rem' }}>Test Print</button>
    </div>
  );
};

export default function DownloadWithTest() {
  return (
    <>
      <Download />
      <PrintTest />
    </>
  );
} 