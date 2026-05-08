import React from 'react';
import { Badge } from '../common/Badge';
import { getInitials } from '../../utils/formatters';

export const NameRenderer = (props) => {
  if (!props.value) return null;
  const { firstName, lastName } = props.data;
  const initials = getInitials(firstName, lastName);
  
  return (
    <div className="cell-flex employee-name-cell">
      <div className="avatar">{initials}</div>
      <span className="font-medium">{props.value}</span>
    </div>
  );
};

export const DepartmentRenderer = (props) => {
  if (!props.value) return null;
  const dept = props.value;
  let variant = 'default';
  
  if (dept === 'Engineering') variant = 'primary';
  else if (dept === 'Sales') variant = 'success';
  else if (dept === 'Marketing') variant = 'warning';
  else if (dept === 'HR') variant = 'info';
  else if (dept === 'Finance') variant = 'danger';
  
  return <Badge variant={variant}>{dept}</Badge>;
};

export const StatusRenderer = (props) => {
  const isActive = props.value;
  return (
    <Badge variant={isActive ? 'success' : 'default'}>
      {isActive ? 'Active' : 'Inactive'}
    </Badge>
  );
};

export const PerformanceRenderer = (props) => {
  const value = props.value || 0;
  let color = 'var(--success-color)';
  if (value < 75) color = 'var(--warning-color)';
  if (value < 60) color = 'var(--danger-color)';
  
  return (
    <div className="progress-cell">
      <div className="progress-text">{value}%</div>
      <div className="progress-bar-container">
        <div 
          className="progress-bar-fill" 
          style={{ width: `${value}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
};

export const SkillsRenderer = (props) => {
  const skills = props.value;
  if (!skills || !Array.isArray(skills)) return null;
  
  return (
    <div className="skills-cell">
      {skills.slice(0, 3).map((skill, index) => (
        <span key={index} className="skill-tag">{skill}</span>
      ))}
      {skills.length > 3 && (
        <span className="skill-tag">+{skills.length - 3}</span>
      )}
    </div>
  );
};
