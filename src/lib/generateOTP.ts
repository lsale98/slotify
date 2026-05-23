import { randomInt } from 'crypto';

export const generateOTP = (): string => {
  return randomInt(100000, 999999).toString();
};
