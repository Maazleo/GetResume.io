import React from 'react';
import styled from 'styled-components';

const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;
const CertCard = styled.div`
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

const CertificationsForm = ({ value, onChange }) => {
  const handleChange = (idx, e) => {
    const { name, value: val } = e.target;
    const updated = value.map((cert, i) => i === idx ? { ...cert, [name]: val } : cert);
    onChange(updated);
  };
  const addCertification = () => {
    onChange([
      ...value,
      { name: '', issuer: '', year: '' }
    ]);
  };
  const removeCertification = (idx) => {
    onChange(value.filter((_, i) => i !== idx));
  };

  return (
    <Form>
      {value.map((cert, idx) => (
        <CertCard key={idx}>
          <Row>
            <div style={{ flex: 2 }}>
              <Label>Name</Label>
              <Input name="name" value={cert.name} onChange={e => handleChange(idx, e)} placeholder="Certification name" />
            </div>
            <div style={{ flex: 2 }}>
              <Label>Issuer</Label>
              <Input name="issuer" value={cert.issuer} onChange={e => handleChange(idx, e)} placeholder="Issuer" />
            </div>
            <div style={{ flex: 1 }}>
              <Label>Year</Label>
              <Input name="year" value={cert.year} onChange={e => handleChange(idx, e)} placeholder="e.g. 2023" />
            </div>
          </Row>
          <RemoveBtn type="button" onClick={() => removeCertification(idx)} style={{ marginTop: '1rem' }}>Remove</RemoveBtn>
        </CertCard>
      ))}
      <Button type="button" onClick={addCertification}>+ Add Certification</Button>
    </Form>
  );
};

export default CertificationsForm; 