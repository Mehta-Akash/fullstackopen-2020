interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartsBaseWithDescription extends CoursePartBase {
  description: string;
}

interface CoursePartOne extends CoursePartsBaseWithDescription {
  name: 'Fundamentals';
}

interface CoursePartTwo extends CoursePartBase {
  name: 'Using props to pass data';
  groupProjectCount: number;
}

interface CoursePartThree extends CoursePartsBaseWithDescription {
  name: 'Deeper type usage';
  exerciseSubmissionLink: string;
}

interface CoursePartFour {
  name: 'A new course';
  exerciseCount: number;
  description: string;
}

export type CoursePart =
  | CoursePartOne
  | CoursePartTwo
  | CoursePartThree
  | CoursePartFour;
