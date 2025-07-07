import React from 'react';
import styled from 'styled-components';

const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;
const ProjectCard = styled.div`
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
const TextArea = styled.textarea`
  padding: 0.7rem 1rem;
  border: 1.5px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  font-size: 1rem;
  width: 100%;
  min-height: 60px;
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

const ProjectsForm = ({ value, onChange }) => {
  const handleChange = (idx, e) => {
    const { name, value: val } = e.target;
    const updated = value.map((proj, i) => i === idx ? { ...proj, [name]: val } : proj);
    onChange(updated);
  };
  const addProject = () => {
    onChange([
      ...value,
      { title: '', description: '', technologies: '', link: '' }
    ]);
  };
  const removeProject = (idx) => {
    onChange(value.filter((_, i) => i !== idx));
  };

  return (
    <Form>
      {value.map((proj, idx) => (
        <ProjectCard key={idx}>
          <Row>
            <div style={{ flex: 2 }}>
              <Label>Title</Label>
              <Input name="title" value={proj.title} onChange={e => handleChange(idx, e)} placeholder="Project title" />
            </div>
            <div style={{ flex: 2 }}>
              <Label>Technologies</Label>
              <Input name="technologies" value={proj.technologies} onChange={e => handleChange(idx, e)} placeholder="e.g. React, Node.js" />
            </div>
          </Row>
          <Row>
            <div style={{ flex: 2 }}>
              <Label>Description</Label>
              <TextArea name="description" value={proj.description} onChange={e => handleChange(idx, e)} placeholder="Describe the project..." />
            </div>
            <div style={{ flex: 1 }}>
              <Label>GitHub / Demo Link</Label>
              <Input name="link" value={proj.link} onChange={e => handleChange(idx, e)} placeholder="https://github.com/yourproject" />
            </div>
          </Row>
          <RemoveBtn type="button" onClick={() => removeProject(idx)} style={{ marginTop: '1rem' }}>Remove</RemoveBtn>
        </ProjectCard>
      ))}
      <Button type="button" onClick={addProject}>+ Add Project</Button>
    </Form>
  );
};

export default ProjectsForm; 