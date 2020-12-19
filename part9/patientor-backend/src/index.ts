import express from 'express';
import cors from 'cors';
import diagnosisRouter from './routes/diagnoses';

const app = express();
app.use(express.json());
app.use(cors());

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api/diagnoses', diagnosisRouter);

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server ready on ${PORT}`);
});
