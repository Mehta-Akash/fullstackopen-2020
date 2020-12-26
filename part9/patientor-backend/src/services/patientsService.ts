import patientData from '../../data/patients';
import { nonSensitivePatientData, NewPerson, Patient } from '../types';
import { v4 as uuid } from 'uuid';

const patients = patientData;

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

const getSinglePatient = (id: string): Patient | undefined => {
  const patient = patients.find((x) => x.id === id);
  return patient;
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
  getSinglePatient,
};
