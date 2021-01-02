/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  NewPerson,
  Gender,
  NewEntry,
  Diagnosis,
  EntryType,
  HealthCheckRating,
  NewBaseEntry,
  Discharge,
  SickLeave,
} from './types';

export const toNewPatient = (object: any): NewPerson => {
  return {
    name: parseString(object.name),
    ssn: parseString(object.ssn),
    dateOfBirth: parseDateOfBirth(object.dateOfBirth),
    occupation: parseString(object.occupation),
    gender: parseGender(object.gender),
  };
};

const toBaseEntry = (object: any): NewBaseEntry => {
  const baseEntry: NewBaseEntry = {
    description: parseString(object.description),
    type: parseEntryType(object.type),
    date: parseDateOfBirth(object.date),
    specialist: parseString(object.specialist),
  };
  if (object.diagnosisCodes) {
    baseEntry.diagnosisCodes = parseDiagnosisCode(object.diagnosisCodes);
  }
  return baseEntry;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const toNewEntry = (object: any): NewEntry => {
  const entryBase = toBaseEntry(object) as NewEntry;

  switch (entryBase.type) {
    case EntryType.HealthCheck:
      return {
        ...entryBase,
        healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
      };
    case EntryType.OccupationalHealthcare:
      const occuEntry = {
        ...entryBase,
        employerName: parseString(object.employerName),
      };
      if (object.sickLeave) {
        occuEntry.sickLeave = parseSickLeave(object.sickLeave);
      }
      return occuEntry;
    case EntryType.Hospital:
      return {
        ...entryBase,
        discharge: parseDischarge(object.discharge),
      };
    default:
      return assertNever(entryBase);
  }
};

const parseSickLeave = (sickLeave: any): SickLeave => {
  if (!sickLeave) {
    throw new Error(`Sick leave is missing or incorrect type`);
  }
  return {
    startDate: parseString(sickLeave.startDate),
    endDate: parseString(sickLeave.endDate),
  };
};

const parseDischarge = (discharge: any): Discharge => {
  if (!discharge) {
    throw new Error(`Missing discharge type`);
  }
  return {
    date: parseDateOfBirth(discharge.date),
    criteria: parseString(discharge.criteria),
  };
};

const parseHealthCheckRating = (value: any): HealthCheckRating => {
  if (!value || !isHealthRating(value)) {
    throw new Error(`Health check rating is invalid or empty`);
  }
  return value;
};

const isHealthRating = (value: any): value is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(value);
};

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const isEntryType = (type: any): type is EntryType => {
  return Object.values(EntryType).includes(type);
};

const parseEntryType = (type: any): EntryType => {
  if (!type || !isEntryType(type)) {
    throw new Error('Incorrect entry type');
  }
  return type;
};

const parseDiagnosisCode = (code: any): Array<Diagnosis['code']> => {
  if (!code || !Array.isArray(code) || !isStringArray(code)) {
    throw new Error(`Incorrect or missing diagnosis code`);
  }
  return code;
};

const isStringArray = (code: any[]): code is string[] => {
  const hasString = code.every((value) => {
    return typeof value === 'string' || value instanceof String;
  });
  return hasString;
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

// export default toNewPatient;
