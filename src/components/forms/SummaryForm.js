import React from 'react';
import styled from 'styled-components';

const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;
const Label = styled.label`
  font-weight: 500;
  margin-bottom: 0.3rem;
`;
const TextArea = styled.textarea`
  padding: 0.7rem 1rem;
  border: 1.5px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  font-size: 1.1rem;
  width: 100%;
  min-height: 100px;
  background: ${({ theme }) => theme.inputBg};
  color: ${({ theme }) => theme.inputText};
  transition: border 0.2s, background 0.2s, color 0.2s;
  &:focus {
    border-color: ${({ theme }) => theme.accent};
    outline: none;
  }
`;

const SummaryForm = ({ value, onChange }) => (
  <Form>
    <Label htmlFor="summary">Professional Summary</Label>
    <TextArea
      id="summary"
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder="Write a short professional summary..."
    />
  </Form>
);

export default SummaryForm; 