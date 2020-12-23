import React from 'react';
import { CoursePart } from '../types';

const Part: React.FC<{ part: CoursePart }> = ({ part }) => {
  switch (part.name) {
    case 'Fundamentals':
      return (
        <div>
          <p>
            <b>name:</b> {part.name} <b>count:</b> {part.exerciseCount}{' '}
            <b>description: </b>
            {part.description}
          </p>
        </div>
      );
    case 'Using props to pass data':
      return (
        <div>
          <p>
            <b>name: </b>
            {part.name} <b>exercise count: </b> {part.exerciseCount}{' '}
            <b>group project count: </b>
            {part.groupProjectCount}
          </p>
        </div>
      );
    case 'Deeper type usage':
      return (
        <div>
          <p>
            <b>name: </b>
            {part.name} <b>exercise count: </b> {part.exerciseCount}{' '}
            <b>submission link: </b>
            {part.exerciseSubmissionLink} <b>description: </b>
            {part.description}
          </p>
        </div>
      );
    case 'A new course':
      return (
        <div>
          <p>
            {part.name} {part.exerciseCount} {part.description}
          </p>
        </div>
      );
  }
};

export default Part;
