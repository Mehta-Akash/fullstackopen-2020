import express from 'express';
import cors from 'cors';
import diagnosisRouter from './routes/diagnosesRoute';
import patientRouter from './routes/patientsRoute';

const app = express();
app.use(express.json());
app.use(cors());

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api/diagnosis', diagnosisRouter);
app.use('/api/patients', patientRouter);

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server ready on ${PORT}`);
});
