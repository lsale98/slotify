import { IInstrumentationService } from '@/core/application/services/instrumentation.service.interface';
import { IResetPasswordUseCase } from '@/core/application/use-cases/auth/reset-password.use-case';
import { InputParseError } from '@/core/entities/errors/common';
import { Cookie } from '@/core/entities/models/cookie';
import z from 'zod';

export type IResetPasswordController = ReturnType<
  typeof resetPasswordController
>;

const inputSchema = z
  .object({
    token: z.string().min(1, { message: 'Token is required' }),
    password: z
      .string()
      .min(6, { message: 'Password must contain at least 6 characters' })
      .max(20, {
        message: 'Password to long. Maximum number of characters is 20',
      }),
    confirm_password: z.string(),
  })
  .superRefine(({ password, confirm_password }, ctx) => {
    if (password !== confirm_password) {
      ctx.addIssue({
        code: 'custom',
        message: 'Passwords do not match',
        path: ['password'],
      });
      ctx.addIssue({
        code: 'custom',
        message: 'Passwords do not match',
        path: ['confirm_password'],
      });
    }
  });

export const resetPasswordController =
  (
    instrumentationService: IInstrumentationService,
    resetPasswordUseCase: IResetPasswordUseCase,
  ) =>
  async (input: Partial<z.infer<typeof inputSchema>>): Promise<Cookie> => {
    return await instrumentationService.startSpan(
      { name: 'forgetPassword Controller' },
      async () => {
        const { data, error: inputParseError } = inputSchema.safeParse(input);

        if (inputParseError) {
          throw new InputParseError('Invalid data', { cause: inputParseError });
        }

        const { cookie } = await resetPasswordUseCase({
          token: data.token,
          password: data.password,
          confirmPassword: data.confirm_password,
        });

        return cookie;
      },
    );
  };
