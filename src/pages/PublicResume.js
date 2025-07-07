import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

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

const PublicContainer = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  background: #fff;
  color: #222;
  border-radius: 16px;
  box-shadow: 0 4px 32px rgba(0,0,0,0.07);
  padding: 2.5rem 2rem;
  @media (max-width: 900px) {
    padding: 1rem 0.5rem;
    margin: 0.5rem;
    border-radius: 8px;
  }
`;
const Section = styled.section`
  margin-bottom: 1.5rem;
`;
const SectionTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
`;

const PublicResume = () => {
  const { id } = useParams();
  const [resume, setResume] = useState(null);
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

  useEffect(() => {
    // Simulate loading from localStorage by id (in real app, fetch from backend)
    const data = localStorage.getItem(`publicResume_${id}`);
    if (data) setResume(JSON.parse(data));
    const t = localStorage.getItem(`publicResumeTemplate_${id}`);
    if (t) setTemplate(t);
    const so = localStorage.getItem(`publicResumeSectionOrder_${id}`);
    if (so) setSectionOrder(JSON.parse(so));
  }, [id]);

  if (!resume) return <div style={{ padding: '2rem', textAlign: 'center' }}>No public resume found for this link.</div>;

  const info = resume['Personal Info'] || {};
  const style = templateStyles[template] || templateStyles.modern;
  return (
    <PublicContainer style={{ fontFamily: style.fontFamily, color: style.color }}>
      <h1 style={{ fontSize: '2rem', margin: 0 }}>{info.name}</h1>
      <h2 style={{ fontSize: '1.1rem', color: style.accent, margin: '0.2rem 0 0.7rem 0' }}>{info.title}</h2>
      <div style={{ marginBottom: 16 }}>{info.email} | {info.phone} | {info.linkedin} | {info.address}</div>
      {sectionOrder.map((section, idx) => (
        <div key={section} style={{ marginBottom: style.sectionSpacing }}>
          {section === 'Summary' && resume['Summary'] && (
            <Section>
              <SectionTitle style={{ textTransform: style.sectionTitleTransform, color: style.sectionTitleColor }}>Summary</SectionTitle>
              <div>{resume['Summary']}</div>
            </Section>
          )}
          {section === 'Skills' && resume['Skills'] && resume['Skills'].length > 0 && (
            <Section>
              <SectionTitle style={{ textTransform: style.sectionTitleTransform, color: style.sectionTitleColor }}>Skills</SectionTitle>
              <div>{resume['Skills'].join(', ')}</div>
            </Section>
          )}
          {section === 'Work Experience' && resume['Work Experience'] && resume['Work Experience'].length > 0 && (
            <Section>
              <SectionTitle style={{ textTransform: style.sectionTitleTransform, color: style.sectionTitleColor }}>Work Experience</SectionTitle>
              <ul style={{ margin: 0, paddingLeft: 18 }}>
                {resume['Work Experience'].map((exp, i) => (
                  <li key={i}><b>{exp.role}</b> at <b>{exp.company}</b> ({exp.start} - {exp.end}): {exp.description}</li>
                ))}
              </ul>
            </Section>
          )}
          {section === 'Projects' && resume['Projects'] && resume['Projects'].length > 0 && (
            <Section>
              <SectionTitle style={{ textTransform: style.sectionTitleTransform, color: style.sectionTitleColor }}>Projects</SectionTitle>
              <ul style={{ margin: 0, paddingLeft: 18 }}>
                {resume['Projects'].map((proj, i) => (
                  <li key={i}><b>{proj.title}</b> [{proj.technologies}]: {proj.description} {proj.link && <span>({proj.link})</span>}</li>
                ))}
              </ul>
            </Section>
          )}
          {section === 'Education' && resume['Education'] && resume['Education'].length > 0 && (
            <Section>
              <SectionTitle style={{ textTransform: style.sectionTitleTransform, color: style.sectionTitleColor }}>Education</SectionTitle>
              <ul style={{ margin: 0, paddingLeft: 18 }}>
                {resume['Education'].map((edu, i) => (
                  <li key={i}><b>{edu.degree}</b> at <b>{edu.university}</b> ({edu.start} - {edu.end}), CGPA/Percentage: {edu.cgpa}</li>
                ))}
              </ul>
            </Section>
          )}
          {section === 'Certifications' && resume['Certifications'] && resume['Certifications'].length > 0 && (
            <Section>
              <SectionTitle style={{ textTransform: style.sectionTitleTransform, color: style.sectionTitleColor }}>Certifications</SectionTitle>
              <div>{resume['Certifications'].map((cert, i) => `${cert.name} (${cert.issuer}, ${cert.year})`).join(', ')}</div>
            </Section>
          )}
          {section === 'Achievements' && resume['Achievements'] && resume['Achievements'].length > 0 && (
            <Section>
              <SectionTitle style={{ textTransform: style.sectionTitleTransform, color: style.sectionTitleColor }}>Achievements</SectionTitle>
              <div>{resume['Achievements'].join(', ')}</div>
            </Section>
          )}
          {section === 'Languages' && resume['Languages'] && resume['Languages'].length > 0 && (
            <Section>
              <SectionTitle style={{ textTransform: style.sectionTitleTransform, color: style.sectionTitleColor }}>Languages</SectionTitle>
              <div>{resume['Languages'].join(', ')}</div>
            </Section>
          )}
        </div>
      ))}
    </PublicContainer>
  );
};

export default PublicResume; 