import diagnosesData from '../../data/diagnoses';
import { Diagnosis } from '../types';

const diagnosis: Array<Diagnosis> = diagnosesData;

const getDiagnosis = (): Diagnosis[] => {
  return diagnosis;
};

export default {
  getDiagnosis,
};
