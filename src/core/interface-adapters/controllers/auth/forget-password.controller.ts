import { IInstrumentationService } from '@/core/application/services/instrumentation.service.interface';
import { IForgotPasswordUseCase } from '@/core/application/use-cases/auth/forgot-password.use-case';
import { InputParseError } from '@/core/entities/errors/common';
import z from 'zod';

export type IForgotPasswordController = ReturnType<
  typeof forgotPasswordController
>;

const inputSchema = z.object({
  email: z.email(),
});

export const forgotPasswordController =
  (
    instrumentationService: IInstrumentationService,
    forgotPasswordUseCase: IForgotPasswordUseCase,
  ) =>
  async (
    input: Partial<z.infer<typeof inputSchema>>,
  ): Promise<{ token: string }> => {
    return await instrumentationService.startSpan(
      { name: 'forgetPassword Controller' },
      async () => {
        const { data, error: inputParseError } = inputSchema.safeParse(input);

        if (inputParseError) {
          throw new InputParseError('Invalid data', { cause: inputParseError });
        }

        const { token } = await forgotPasswordUseCase(data);
        return { token };
      },
    );
  };
