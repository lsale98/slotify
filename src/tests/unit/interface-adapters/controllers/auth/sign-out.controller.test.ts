import { getInjection } from '@/di/container';
import { expect, it } from 'vitest';
import { SESSION_COOKIE } from '../../../../../../config';
import { InputParseError } from '@/core/entities/errors/common';

const signInUseCase = getInjection('ISignInUseCase');
const signOutController = getInjection('ISignOutController');

it('returns blank cookie', async () => {
  const { session } = await signInUseCase({
    email: 'test@example.com',
    password: 'password',
  });

  await expect(signOutController(session.id)).resolves.toMatchObject({
    name: SESSION_COOKIE,
    value: '',
    attributes: {},
  });
});

it('throws for invalid input', async () => {
  await expect(signOutController(undefined)).rejects.toBeInstanceOf(
    InputParseError,
  );
});
