import React from 'react';

interface ContentObject {
  name: string;
  exerciseCount: number;
}

interface ContentProps {
  courseParts: ContentObject[];
}

const Content: React.FC<ContentProps> = ({ courseParts }) => {
  return (
    <div>
      {courseParts.map((x) => (
        <p key={x.name}>
          {x.name} {x.exerciseCount}
        </p>
      ))}
    </div>
  );
};

export default Content;
