export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
  type: EntryType;
}

export enum HealthCheckRating {
  'Healthy' = 0,
  'LowRisk' = 1,
  'HighRisk' = 2,
  'CriticalRisk' = 3,
}

export enum EntryType {
  HealthCheck = 'HealthCheck',
  OccupationalHealthcare = 'OccupationalHealthcare',
  Hospital = 'Hospital',
}

interface HealthCheckEntry extends BaseEntry {
  type: EntryType.HealthCheck;
  healthCheckRating: HealthCheckRating;
}

export interface SickLeave {
  startDate: string;
  endDate: string;
}

interface OccupationalHealthCareEntry extends BaseEntry {
  type: EntryType.OccupationalHealthcare;
  employerName: string;
  sickLeave?: SickLeave;
}

export interface Discharge {
  date: string;
  criteria: string;
}

interface HospitalEntry extends BaseEntry {
  type: EntryType.Hospital;
  discharge: Discharge;
}

export type Entry =
  | HospitalEntry
  | HealthCheckEntry
  | OccupationalHealthCareEntry;

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  gender: string;
  occupation: string;
  ssn: string;
  entries: Entry[];
}

// export type NewEntry =
//   | Omit<HospitalEntry, 'id'>
//   | Omit<HealthCheckEntry, 'id'>
//   | Omit<OccupationalHealthCareEntry, 'id'>;

export type NewEntry = DistributiveOmit<Entry, 'id'>;

type DistributiveOmit<T, K extends keyof T> = T extends any
  ? Omit<T, K>
  : never;

export type nonSensitivePatientData = Omit<Patient, 'ssn'>;

export type NewPerson = Omit<Patient, 'id' | 'entries'>;

export type PublicPatient = Omit<Patient, 'ssn' | 'entries'>;

export type NewBaseEntry = Omit<BaseEntry, 'id'>;

export enum Gender {
  Male = 'male',
  Female = 'female',
}
