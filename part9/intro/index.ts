import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { exerciseCalculator } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (!isNaN(height) && !isNaN(weight) && height !== 0 && weight !== 0) {
    const bmi = calculateBmi(height, weight);
    const returnObject = { height, weight, bmi };
    res.send(returnObject);
  } else {
    res.send({ error: 'malformatted parameters' });
  }
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;
  const targetVal = Number(target);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const days: Array<number> = daily_exercises;
  const hasString = days.some((x) => isNaN(x));

  if (!target || !daily_exercises) {
    res.status(401).json({ error: 'parameters missing' });
  } else if (!isNaN(targetVal) && !hasString) {
    res.send(exerciseCalculator(days, targetVal));
  } else {
    res.status(401).json({ error: 'malformatted parameters' });
  }
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
