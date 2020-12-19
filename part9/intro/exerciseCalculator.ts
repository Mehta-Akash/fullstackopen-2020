interface exerciseSummary {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const parseArgs = (args: Array<string>) => {
  if (args.length < 4) throw new Error('Not enough arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    const targets = Number(args[2]);
    const days: Array<number> = [];
    for (let i = 3; i < args.length; i++) {
      days.push(Number(args[i]));
    }
    return {
      targets,
      days,
    };
  } else {
    throw new Error('Provided values were not numbers');
  }
};

const exerciseCalculator = (
  days: Array<number>,
  target: number
): exerciseSummary => {
  const average: number =
    days.reduce((previous, later) => later + previous, 0) / days.length;
  let rate;
  let descriptionOfRating;
  if (average >= target) {
    rate = 3;
    descriptionOfRating = 'Good work';
  } else if (average < target / 2) {
    rate = 1;
    descriptionOfRating = 'Need to do more';
  } else {
    rate = 2;
    descriptionOfRating = 'not too bad but could be better';
  }

  return {
    periodLength: days.length,
    trainingDays: days.filter((day) => day !== 0).length,
    success: average >= target ? true : false,
    rating: rate,
    ratingDescription: descriptionOfRating,
    target: target,
    average: average,
  };
};

try {
  const { days, targets } = parseArgs(process.argv);
  console.log(exerciseCalculator(days, targets));
} catch (e) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  console.log('Error has occuted', e.message);
}
