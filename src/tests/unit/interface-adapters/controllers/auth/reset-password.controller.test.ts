import { expect, it } from 'vitest';

import { getInjection } from '@/di/container';
import { SESSION_COOKIE } from '../../../../../../config';
import { InputParseError } from '@/core/entities/errors/common';

const resetPasswordController = getInjection('IResetPasswordController');
const forgotPasswordController = getInjection('IForgotPasswordController');

it('resets password with valid input', async () => {
  const { token } = await forgotPasswordController({
    email: 'test@example.com',
  });

  await expect(
    resetPasswordController({
      token,
      password: 'password',
      confirm_password: 'password',
    }),
  ).resolves.toMatchObject({
    name: SESSION_COOKIE,
    value: 'test-session-id',
    attributes: {},
  });
});

it('throws for invalid input', async () => {
  await expect(resetPasswordController({})).rejects.toBeInstanceOf(
    InputParseError,
  );

  await expect(
    resetPasswordController({
      password: 'password',
      confirm_password: 'password',
    }),
  ).rejects.toBeInstanceOf(InputParseError);

  await expect(
    resetPasswordController({
      token: '',
      password: 'password',
      confirm_password: 'password',
    }),
  ).rejects.toBeInstanceOf(InputParseError);

  await expect(
    resetPasswordController({
      token: 'valid-token',
      confirm_password: 'password',
    }),
  ).rejects.toBeInstanceOf(InputParseError);

  await expect(
    resetPasswordController({
      token: 'valid-token',
      password: 'short',
      confirm_password: 'short',
    }),
  ).rejects.toBeInstanceOf(InputParseError);

  await expect(
    resetPasswordController({
      token: 'valid-token',
      password: 'thispasswordiswaytoolong',
      confirm_password: 'thispasswordiswaytoolong',
    }),
  ).rejects.toBeInstanceOf(InputParseError);

  await expect(
    resetPasswordController({ token: 'valid-token', password: 'password' }),
  ).rejects.toBeInstanceOf(InputParseError);

  await expect(
    resetPasswordController({
      token: 'valid-token',
      password: 'password',
      confirm_password: 'different',
    }),
  ).rejects.toBeInstanceOf(InputParseError);
});
