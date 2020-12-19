import express from 'express';
import patientService from '../services/patientsService';

const router = express.Router();

router.get('/', (_req, res) => {
  const data = patientService.getPatients();
  res.send(data);
});

export default router;
