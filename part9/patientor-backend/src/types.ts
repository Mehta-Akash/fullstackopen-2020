export interface Diagnose {
  code: string;
  name: string;
  latin?: string;
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  gender: string;
  occupation: string;
  ssn: string;
}

export type nonSensitivePatientData = Omit<Patient, 'ssn'>;

export type NewPerson = Omit<Patient, 'id'>;

export enum Gender {
  Male = 'male',
  Female = 'female',
}