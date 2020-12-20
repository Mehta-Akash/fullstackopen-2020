import React from 'react';

interface ContentObject {
  name: string;
  exerciseCount: number;
}

interface ContentProps {
  courseParts: ContentObject[];
}

const Total: React.FC<ContentProps> = ({ courseParts }) => {
  return (
    <div>
      <p>
        Number of exercise{' '}
        {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </p>
    </div>
  );
};

export default Total;
