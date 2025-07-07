import React from 'react';
import styled from 'styled-components';
import { FaMagic, FaFilePdf, FaShareAlt, FaPalette } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #6a82fb 0%, #fc5c7d 100%);
  color: #fff;
  text-align: center;
  position: relative;
  overflow: hidden;
`;

const Headline = styled.h1`
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 1rem;
  letter-spacing: -1px;
`;

const Subheadline = styled.p`
  font-size: 1.5rem;
  margin-bottom: 2.5rem;
  font-weight: 400;
`;

const CTAButton = styled.button`
  background: #fff;
  color: #fc5c7d;
  font-size: 1.25rem;
  font-weight: 700;
  padding: 0.9rem 2.5rem;
  border: none;
  border-radius: 2rem;
  box-shadow: 0 4px 24px rgba(252, 92, 125, 0.15);
  cursor: pointer;
  transition: background 0.2s, color 0.2s, transform 0.2s;
  margin-bottom: 3rem;
  &:hover {
    background: #fc5c7d;
    color: #fff;
    transform: translateY(-2px) scale(1.04);
  }
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 2rem;
  width: 100%;
  max-width: 900px;
  margin: 0 auto 2rem auto;
`;

const FeatureCard = styled.div`
  background: rgba(255,255,255,0.12);
  border-radius: 1.5rem;
  padding: 2rem 1.5rem;
  color: #fff;
  box-shadow: 0 2px 16px rgba(0,0,0,0.07);
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: background 0.2s, transform 0.2s;
  &:hover {
    background: rgba(255,255,255,0.18);
    transform: translateY(-4px) scale(1.03);
  }
`;

const FeatureIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const FeatureTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
`;

const FeatureDesc = styled.p`
  font-size: 1rem;
  font-weight: 400;
`;

const Home = () => {
  const navigate = useNavigate();
  return (
    <HeroSection>
      <Headline>Build Your Resume Effortlessly</Headline>
      <Subheadline>
        Create a professional, ATS-friendly resume in minutes. Choose from modern templates, customize, preview, and download instantly.
      </Subheadline>
      <CTAButton onClick={() => navigate('/builder')}>Start Building</CTAButton>
      <FeaturesGrid>
        <FeatureCard>
          <FeatureIcon><FaMagic /></FeatureIcon>
          <FeatureTitle>Modern & Intuitive</FeatureTitle>
          <FeatureDesc>Enjoy a clean, user-friendly interface with real-time editing and live preview.</FeatureDesc>
        </FeatureCard>
        <FeatureCard>
          <FeatureIcon><FaFilePdf /></FeatureIcon>
          <FeatureTitle>One-Click Download</FeatureTitle>
          <FeatureDesc>Export your resume as PDF or PNG with a single click, ready for job applications.</FeatureDesc>
        </FeatureCard>
        <FeatureCard>
          <FeatureIcon><FaShareAlt /></FeatureIcon>
          <FeatureTitle>Shareable Link</FeatureTitle>
          <FeatureDesc>Generate a public link to share your resume with recruiters or friends instantly.</FeatureDesc>
        </FeatureCard>
        <FeatureCard>
          <FeatureIcon><FaPalette /></FeatureIcon>
          <FeatureTitle>Customizable Templates</FeatureTitle>
          <FeatureDesc>Pick from multiple beautiful templates and color themes to match your style.</FeatureDesc>
        </FeatureCard>
      </FeaturesGrid>
      <HowItWorksSection>
        <HowItWorksTitle>How it Works</HowItWorksTitle>
        <Stepper>
          <Step>
            <StepNumber>1</StepNumber>
            <StepText>Enter your details in easy forms</StepText>
          </Step>
          <Step>
            <StepNumber>2</StepNumber>
            <StepText>Preview your resume live</StepText>
          </Step>
          <Step>
            <StepNumber>3</StepNumber>
            <StepText>Download or share instantly</StepText>
          </Step>
        </Stepper>
      </HowItWorksSection>
      <TestimonialSection>
        <TestimonialCard>
          <TestimonialText>
            "This is the easiest and most beautiful resume builder I've ever used. I landed my dream job in a week!"
          </TestimonialText>
          <TestimonialAuthor>- Sarah K., Product Designer</TestimonialAuthor>
        </TestimonialCard>
      </TestimonialSection>
    </HeroSection>
  );
};

const HowItWorksSection = styled.section`
  margin: 3rem 0 1.5rem 0;
  width: 100%;
  max-width: 700px;
`;
const HowItWorksTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1.2rem;
  color: #fff;
`;
const Stepper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1.5rem;
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
  }
`;
const Step = styled.div`
  background: rgba(255,255,255,0.10);
  border-radius: 1rem;
  padding: 1.2rem 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 120px;
`;
const StepNumber = styled.div`
  background: #fff;
  color: #fc5c7d;
  font-weight: 800;
  font-size: 1.3rem;
  width: 2.2rem;
  height: 2.2rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.7rem;
`;
const StepText = styled.div`
  color: #fff;
  font-size: 1.1rem;
  text-align: center;
`;
const TestimonialSection = styled.section`
  margin: 2.5rem 0 1.5rem 0;
  width: 100%;
  max-width: 500px;
`;
const TestimonialCard = styled.div`
  background: rgba(255,255,255,0.13);
  border-radius: 1.2rem;
  padding: 2rem 1.5rem;
  color: #fff;
  box-shadow: 0 2px 16px rgba(0,0,0,0.09);
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const TestimonialText = styled.p`
  font-size: 1.1rem;
  font-style: italic;
  margin-bottom: 1rem;
`;
const TestimonialAuthor = styled.div`
  font-size: 1rem;
  font-weight: 600;
  color: #fc5c7d;
`;

export default Home; 