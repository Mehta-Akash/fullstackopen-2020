import patientData from '../../data/patients';
import {
  nonSensitivePatientData,
  NewPerson,
  Patient,
  NewEntry,
  Entry,
} from '../types';
import { v4 as uuid } from 'uuid';

let patients = [...patientData];

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
    entries: [] as Entry[],
    ...patient,
  };
  patients = patientData.concat(newPerson);
  return newPerson;
};

const addEntry = (patient: Patient, entry: NewEntry): Patient => {
  const newEntry = {
    ...entry,
    id: uuid(),
  };
  const updatedPatient = {
    ...patient,
    entries: patient.entries.concat(newEntry),
  };
  patients.find((x) => x.id === patient.id)?.entries.push(newEntry);
  console.log('Updated patient:', updatedPatient);
  return updatedPatient;
};

export default {
  getPatients,
  addPatient,
  getSinglePatient,
  addEntry,
};
