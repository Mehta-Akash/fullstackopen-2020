import express from 'express';
import patientService from '../services/patientsService';

const router = express.Router();

router.get('/', (_req, res) => {
  const data = patientService.getPatients();
  res.send(data);
});

router.post('/', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { name, ssn, dateOfBirth, occupation, gender } = req.body;
  const addedPatient = patientService.addPatient({
    name,
    ssn,
    dateOfBirth,
    occupation,
    gender,
  });
  res.json(addedPatient);
});

export default router;
