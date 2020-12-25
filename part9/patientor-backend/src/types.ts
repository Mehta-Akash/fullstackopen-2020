export interface Diagnose {
  code: string;
  name: string;
  latin?: string;
}

export interface Entry {}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  gender: string;
  occupation: string;
  ssn: string;
  entries: Entry[];
}

export type nonSensitivePatientData = Omit<Patient, 'ssn'>;

export type NewPerson = Omit<Patient, 'id' | 'entries'>;

export type PublicPatient = Omit<Patient, 'ssn' | 'entries'>;

export enum Gender {
  Male = 'male',
  Female = 'female',
}
