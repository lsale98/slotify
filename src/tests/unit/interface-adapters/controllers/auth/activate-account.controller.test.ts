import { expect, it } from 'vitest';

import { getInjection } from '@/di/container';
import { SESSION_COOKIE } from '../../../../../../config';
import { InputParseError } from '@/core/entities/errors/common';

const activateAccountController = getInjection('IActivateAccountController');

it('activates account with valid input', async () => {
  await expect(
    activateAccountController({ token: 'valid-token', otp: '123456' }),
  ).resolves.toMatchObject({
    name: SESSION_COOKIE,
    value: 'test-session-id',
    attributes: {},
  });
});

it('throws for invalid input', async () => {
  await expect(activateAccountController({})).rejects.toBeInstanceOf(
    InputParseError,
  );

  await expect(
    activateAccountController({ otp: '123456' }),
  ).rejects.toBeInstanceOf(InputParseError);

  await expect(
    activateAccountController({ token: 'valid-token' }),
  ).rejects.toBeInstanceOf(InputParseError);

  await expect(
    activateAccountController({ token: 'valid-token', otp: '12345' }),
  ).rejects.toBeInstanceOf(InputParseError);

  await expect(
    activateAccountController({ token: 'valid-token', otp: '1234567' }),
  ).rejects.toBeInstanceOf(InputParseError);
});
