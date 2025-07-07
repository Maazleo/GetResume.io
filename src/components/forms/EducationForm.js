import React from 'react';
import styled from 'styled-components';

const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;
const EduCard = styled.div`
  background: ${({ theme }) => theme.bodyBg};
  border: 1.5px solid #e0e0e0;
  border-radius: 12px;
  padding: 1.5rem 1rem;
  margin-bottom: 0.5rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.03);
`;
const Row = styled.div`
  display: flex;
  gap: 1.2rem;
  margin-bottom: 1rem;
  @media (max-width: 600px) {
    flex-direction: column;
    gap: 0.7rem;
  }
`;
const Label = styled.label`
  font-weight: 500;
  margin-bottom: 0.3rem;
`;
const Input = styled.input`
  padding: 0.7rem 1rem;
  border: 1.5px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  font-size: 1rem;
  width: 100%;
  background: ${({ theme }) => theme.inputBg};
  color: ${({ theme }) => theme.inputText};
  transition: border 0.2s, background 0.2s, color 0.2s;
  &:focus {
    border-color: ${({ theme }) => theme.accent};
    outline: none;
  }
`;
const Button = styled.button`
  background: ${({ theme }) => theme.accent};
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 0.5rem 1.2rem;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 0.5rem;
  margin-right: 0.7rem;
  &:hover {
    opacity: 0.9;
  }
`;
const RemoveBtn = styled(Button)`
  background: #e74c3c;
`;

const EducationForm = ({ value, onChange }) => {
  const handleChange = (idx, e) => {
    const { name, value: val } = e.target;
    const updated = value.map((edu, i) => i === idx ? { ...edu, [name]: val } : edu);
    onChange(updated);
  };
  const addEducation = () => {
    onChange([
      ...value,
      { degree: '', university: '', cgpa: '', start: '', end: '' }
    ]);
  };
  const removeEducation = (idx) => {
    onChange(value.filter((_, i) => i !== idx));
  };

  return (
    <Form>
      {value.map((edu, idx) => (
        <EduCard key={idx}>
          <Row>
            <div style={{ flex: 2 }}>
              <Label>Degree</Label>
              <Input name="degree" value={edu.degree} onChange={e => handleChange(idx, e)} placeholder="e.g. BSc Computer Science" />
            </div>
            <div style={{ flex: 2 }}>
              <Label>University</Label>
              <Input name="university" value={edu.university} onChange={e => handleChange(idx, e)} placeholder="e.g. MIT" />
            </div>
          </Row>
          <Row>
            <div style={{ flex: 1 }}>
              <Label>CGPA / %</Label>
              <Input name="cgpa" value={edu.cgpa} onChange={e => handleChange(idx, e)} placeholder="e.g. 3.8 / 90%" />
            </div>
            <div style={{ flex: 1 }}>
              <Label>Start Year</Label>
              <Input name="start" value={edu.start} onChange={e => handleChange(idx, e)} placeholder="e.g. 2018" />
            </div>
            <div style={{ flex: 1 }}>
              <Label>End Year</Label>
              <Input name="end" value={edu.end} onChange={e => handleChange(idx, e)} placeholder="e.g. 2022" />
            </div>
          </Row>
          <RemoveBtn type="button" onClick={() => removeEducation(idx)} style={{ marginTop: '1rem' }}>Remove</RemoveBtn>
        </EduCard>
      ))}
      <Button type="button" onClick={addEducation}>+ Add Education</Button>
    </Form>
  );
};

export default EducationForm; 