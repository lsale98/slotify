import { expect, it } from 'vitest';

import { getInjection } from '@/di/container';
import { InputParseError } from '@/core/entities/errors/common';
import { AuthenticationError } from '@/core/entities/errors/auth';
import { RoleSchema } from '@/core/entities/models/user';

const signUpController = getInjection('ISignUpController');

it('returns cookie', async () => {
  const { user } = await signUpController({
    email: 'valid@gamil.com',
    name: 'John',
    lastname: 'Jones',
    password: 'password',
    confirm_password: 'password',
  });
  expect(user).toBeDefined();
  expect(user.role).toBe(RoleSchema.enum.USER);
});

it('throws for invalid input', async () => {
  await expect(signUpController({})).rejects.toBeInstanceOf(InputParseError);
  await expect(
    signUpController({
      email: 'invalidemail',
      name: 'John',
      lastname: 'Jones',
      password: 'password',
      confirm_password: 'password',
    }),
  ).rejects.toBeInstanceOf(InputParseError);
  await expect(
    signUpController({
      email: 'valid@gamil.com',
      name: 'John',
      lastname: 'Jones',
      password: 'pass',
      confirm_password: 'pass',
    }),
  ).rejects.toBeInstanceOf(InputParseError);
  await expect(
    signUpController({
      email: 'valid@gamil.com',
      name: 'John',
      lastname: 'Jones',
      password: 'oneverylongpasswordthatmakesnosense',
      confirm_password: 'oneverylongpasswordthatmakesnosense',
    }),
  ).rejects.toBeInstanceOf(InputParseError);
  await expect(
    signUpController({
      email: 'valid@gamil.com',
      name: 'John',
      lastname: 'Jones',
      password: 'password',
      confirm_password: 'passwords',
    }),
  ).rejects.toBeInstanceOf(InputParseError);
  await expect(
    signUpController({
      email: 'valid@gamil.com',
      lastname: 'Jones',
      password: 'password',
      confirm_password: 'password',
    }),
  ).rejects.toBeInstanceOf(InputParseError);
  await expect(
    signUpController({
      email: 'valid@gamil.com',
      name: 'John',
      password: 'password',
      confirm_password: 'password',
    }),
  ).rejects.toBeInstanceOf(InputParseError);
});

it('throws for existing email', async () => {
  await expect(() =>
    signUpController({
      email: 'test@example.com',
      name: 'Joe',
      lastname: 'Doe',
      password: 'password',
      confirm_password: 'password',
    }),
  ).rejects.toBeInstanceOf(AuthenticationError);
});
