import { expect, it } from 'vitest';

import { getInjection } from '@/di/container';
import { SESSION_COOKIE } from '../../../../../../config';
import { InputParseError } from '@/core/entities/errors/common';
import { AuthenticationError } from '@/core/entities/errors/auth';

const signInController = getInjection('ISignInController');

it('signs in with valid input', async () => {
  await expect(
    signInController({ email: 'test@example.com', password: 'password' }),
  ).resolves.toMatchObject({
    name: SESSION_COOKIE,
    value: 'test-session-id',
    attributes: {},
  });
});

it('throws for invalid input', async () => {
  await expect(signInController({ email: '' })).rejects.toBeInstanceOf(
    InputParseError,
  );
  await expect(signInController({ password: '' })).rejects.toBeInstanceOf(
    InputParseError,
  );
  await expect(
    signInController({ email: 'invalidemail' }),
  ).rejects.toBeInstanceOf(InputParseError);
  await expect(
    signInController({ password: 'password-one' }),
  ).rejects.toBeInstanceOf(InputParseError);
  await expect(
    signInController({
      email: 'invalidemail',
      password: 'password-one',
    }),
  ).rejects.toBeInstanceOf(InputParseError);
  await expect(
    signInController({
      email: 'joe@gmail.com',
      password: 'short',
    }),
  ).rejects.toBeInstanceOf(InputParseError);
  await expect(
    signInController({
      email: 'joe@gmail.com',
      password: 'oneverylongpasswordthatmakesnosense',
    }),
  ).rejects.toBeInstanceOf(InputParseError);
});

it('throws for invalid credentials', async () => {
  await expect(
    signInController({
      email: 'notexisting@gamil.com',
      password: 'doesntmatter',
    }),
  ).rejects.toBeInstanceOf(AuthenticationError);
  await expect(
    signInController({ email: 'peter@gmail.com', password: 'wrongpass' }),
  ).rejects.toBeInstanceOf(AuthenticationError);
});
