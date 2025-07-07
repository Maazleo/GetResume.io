import React, { useState } from 'react';
import styled from 'styled-components';

const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;
const Row = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
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
  &:hover {
    opacity: 0.9;
  }
`;
const AchTag = styled.div`
  display: inline-flex;
  align-items: center;
  background: ${({ theme }) => theme.toggleBg};
  color: ${({ theme }) => theme.bodyText};
  border-radius: 16px;
  padding: 0.4rem 1rem 0.4rem 0.8rem;
  margin: 0.2rem 0.5rem 0.2rem 0;
  font-size: 1rem;
  font-weight: 500;
`;
const RemoveBtn = styled.button`
  background: #e74c3c;
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 1.5rem;
  height: 1.5rem;
  margin-left: 0.5rem;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AchievementsForm = ({ value, onChange }) => {
  const [input, setInput] = useState('');
  const addAchievement = () => {
    if (input.trim() && !value.includes(input.trim())) {
      onChange([...value, input.trim()]);
      setInput('');
    }
  };
  const removeAchievement = (idx) => {
    onChange(value.filter((_, i) => i !== idx));
  };
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addAchievement();
    }
  };
  return (
    <Form>
      <Row>
        <Input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add an achievement and press Enter or +"
        />
        <Button type="button" onClick={addAchievement}>+</Button>
      </Row>
      <div>
        {value.map((ach, idx) => (
          <AchTag key={idx}>
            {ach}
            <RemoveBtn type="button" onClick={() => removeAchievement(idx)} title="Remove">×</RemoveBtn>
          </AchTag>
        ))}
      </div>
    </Form>
  );
};

export default AchievementsForm; 