import { expect, it } from 'vitest';

import { getInjection } from '@/di/container';
import { InputParseError } from '@/core/entities/errors/common';

const forgotPasswordController = getInjection('IForgotPasswordController');

it('returns token with valid input', async () => {
  await expect(
    forgotPasswordController({ email: 'test@example.com' }),
  ).resolves.toMatchObject({
    token: expect.any(String),
  });
});

it('throws for invalid input', async () => {
  await expect(forgotPasswordController({})).rejects.toBeInstanceOf(
    InputParseError,
  );

  await expect(
    forgotPasswordController({ email: 'invalidemail' }),
  ).rejects.toBeInstanceOf(InputParseError);

  await expect(forgotPasswordController({ email: '' })).rejects.toBeInstanceOf(
    InputParseError,
  );
});
