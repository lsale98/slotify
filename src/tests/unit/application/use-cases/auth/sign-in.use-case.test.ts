import {
  AuthenticationError,
  UnauthorizedError,
} from '@/core/entities/errors/auth';
import { getInjection } from '@/di/container';
import { expect, it } from 'vitest';

const signInUseCase = getInjection('ISignInUseCase');

it('returns session and cookie', async () => {
  const result = await signInUseCase({
    email: 'test@example.com',
    password: 'password',
  });

  expect(result).toHaveProperty('session');
  expect(result).toHaveProperty('cookie');
  expect(result.session.userId).toBe('test-user-id');
});

it('throws for non existing user', async () => {
  await expect(() =>
    signInUseCase({ email: 'j@gmail.com', password: 'password-one' }),
  ).rejects.toBeInstanceOf(AuthenticationError);

  await expect(() =>
    signInUseCase({ email: 'test@example.com', password: 'password-two' }),
  ).rejects.toBeInstanceOf(AuthenticationError);
});

it('throws for not active status of user account', async () => {
  await expect(() =>
    signInUseCase({
      email: 'pending@example.com',
      password: 'password',
    }),
  ).rejects.toBeInstanceOf(UnauthorizedError);
});
