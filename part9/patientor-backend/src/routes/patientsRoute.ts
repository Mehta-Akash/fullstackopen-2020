import express from 'express';
import patientsService from '../services/patientsService';
import patientService from '../services/patientsService';
import toNewPatient from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  const data = patientService.getPatients();
  res.send(data);
});

router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientsService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

export default router;
