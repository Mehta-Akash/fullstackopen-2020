import patientData from '../../data/patients';
import { nonSensitivePatientData, NewPerson, Patient } from '../types';
import { v4 as uuid } from 'uuid';

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

const addPatient = (patient: NewPerson): Patient => {
  const newPerson = {
    id: uuid(),
    ...patient,
  };
  patientData.push(newPerson);
  return newPerson;
};

export default {
  getPatients,
  addPatient,
};
