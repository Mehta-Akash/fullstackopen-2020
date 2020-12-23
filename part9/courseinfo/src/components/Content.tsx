import React from 'react';
import { CoursePart } from '../types';
import Part from './Part';

const Content: React.FC<{ courseParts: CoursePart[] }> = ({ courseParts }) => {
  return (
    <div>
      {courseParts.map((x) => (
        <Part key={x.name} part={x} />
      ))}
    </div>
  );
};

export default Content;
