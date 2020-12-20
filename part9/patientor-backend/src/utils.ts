/* eslint-disable @typescript-eslint/no-explicit-any */
import { NewPerson, Gender } from './types';

const toNewPatient = (object: any): NewPerson => {
  return {
    name: parseString(object.name),
    ssn: parseString(object.ssn),
    dateOfBirth: parseDateOfBirth(object.dateOfBirth),
    occupation: parseString(object.occupation),
    gender: parseGender(object.gender),
  };
};

const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: any): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (gender: any): gender is Gender => {
  return Object.values(Gender).includes(gender);
};

const parseString = (value: any): string => {
  if (!value || !isString(value)) {
    throw new Error(`Incorrect or missing comment: ${value}`);
  }
  return value;
};

const parseDateOfBirth = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error(`Incorrect or missing comment: ${date}`);
  }
  return date;
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error(`Incorrect or missing comment: ${gender}`);
  }
  return gender;
};

export default toNewPatient;
