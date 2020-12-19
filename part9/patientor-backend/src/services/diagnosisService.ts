import diagnosesData from '../../data/diagnoses';
import { Diagnose } from '../types';

const diagnosis: Array<Diagnose> = diagnosesData;

const getDiagnosis = (): Diagnose[] => {
  return diagnosis;
};

export default {
  getDiagnosis,
};
