import patientData from '../../data/patients';
import { nonSensitivePatientData } from '../types';

const patients: nonSensitivePatientData[] = patientData;

const getPatients = (): nonSensitivePatientData[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

export default {
  getPatients,
};
