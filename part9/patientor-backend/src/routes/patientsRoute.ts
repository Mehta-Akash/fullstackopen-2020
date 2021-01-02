import express from 'express';
import patientsService from '../services/patientsService';
import patientService from '../services/patientsService';
import {toNewPatient, toNewEntry} from '../utils';

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

router.get('/:id', (req, res) => {
  const id = req.params.id;
  const patient = patientService.getSinglePatient(id);
  if (patient) {
    res.send(patient);
  } else {
    res.status(404);
  }
});

router.post('/:id/entries', (req, res) => {
  const patient = patientService.getSinglePatient(req.params.id);
  if (patient) {
    try {
      const newEntry = toNewEntry(req.body);
      const entry = patientService.addEntry(patient, newEntry);
      res.json(entry);
    } catch (e) {
      res.status(400);
    }
  } else {
    res.status(400);
  }
});

export default router;
