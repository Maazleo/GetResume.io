import React from 'react';
import styled from 'styled-components';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;
const Row = styled.div`
  display: flex;
  gap: 1.5rem;
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
const PhotoInput = styled.input`
  margin-top: 0.5rem;
  background: ${({ theme }) => theme.inputBg};
  color: ${({ theme }) => theme.inputText};
`;

const PersonalInfoForm = ({ value, onChange }) => {
  const handleChange = (e) => {
    const { name, value: val, files } = e.target;
    if (name === 'photo') {
      onChange({ ...value, photo: files[0] });
    } else {
      onChange({ ...value, [name]: val });
    }
  };

  return (
    <Form>
      <Row>
        <div style={{ flex: 2 }}>
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" name="name" value={value.name || ''} onChange={handleChange} placeholder="e.g. John Doe" />
        </div>
        <div style={{ flex: 1 }}>
          <Label htmlFor="title">Title</Label>
          <Input id="title" name="title" value={value.title || ''} onChange={handleChange} placeholder="e.g. Software Engineer" />
        </div>
      </Row>
      <Row>
        <div style={{ flex: 1 }}>
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" value={value.email || ''} onChange={handleChange} placeholder="e.g. john@email.com" type="email" />
        </div>
        <div style={{ flex: 1 }}>
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" name="phone" value={value.phone || ''} onChange={handleChange} placeholder="e.g. +1234567890" type="tel" />
        </div>
      </Row>
      <Row>
        <div style={{ flex: 1 }}>
          <Label htmlFor="linkedin">LinkedIn</Label>
          <Input id="linkedin" name="linkedin" value={value.linkedin || ''} onChange={handleChange} placeholder="LinkedIn profile URL" />
        </div>
        <div style={{ flex: 1 }}>
          <Label htmlFor="address">Address</Label>
          <Input id="address" name="address" value={value.address || ''} onChange={handleChange} placeholder="City, Country" />
        </div>
      </Row>
      <div>
        <Label htmlFor="photo">Photo</Label>
        <PhotoInput id="photo" name="photo" type="file" accept="image/*" onChange={handleChange} />
      </div>
    </Form>
  );
};

export default PersonalInfoForm; 