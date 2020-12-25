import patientData from '../../data/patients';
import { nonSensitivePatientData, NewPerson, Patient } from '../types';
import { v4 as uuid } from 'uuid';

const patients: nonSensitivePatientData[] = patientData;

const getPatients = (): nonSensitivePatientData[] => {
  return patients.map(
    ({ id, name, dateOfBirth, gender, occupation, entries }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
      entries,
    })
  );
};

const addPatient = (patient: NewPerson): Patient => {
  const newPerson = {
    id: uuid(),
    entries: [],
    ...patient,
  };
  patientData.push(newPerson);
  return newPerson;
};

export default {
  getPatients,
  addPatient,
};
