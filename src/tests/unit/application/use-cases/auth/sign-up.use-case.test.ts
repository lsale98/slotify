import { expect, it } from 'vitest';

import { getInjection } from '@/di/container';
import { AuthenticationError } from '@/core/entities/errors/auth';

const signUpUseCase = getInjection('ISignUpUseCase');

it('returns session and cookie', async () => {
  const result = await signUpUseCase({
    email: 'joedoe@gmail.com',
    password: 'password-new',
    name: 'Joe',
    lastname: 'Doe',
    role: 'USER',
    status: 'PENDING',
    agreed_terms: true,
  });
  expect(result).toHaveProperty('activationToken');
  expect(result).toHaveProperty('user');
});

it('throws for invalid input', async () => {
  await expect(() =>
    signUpUseCase({
      email: 'test@example.com',
      password: 'password',
      name: 'Joe',
      lastname: 'Doe',
      role: 'USER',
      status: 'PENDING',
      agreed_terms: true,
    }),
  ).rejects.toBeInstanceOf(AuthenticationError);
});
