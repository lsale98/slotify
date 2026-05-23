import { IInstrumentationService } from '@/core/application/services/instrumentation.service.interface';
import { IActivateAccountUseCase } from '@/core/application/use-cases/auth/activate-account.use-case';
import { InputParseError } from '@/core/entities/errors/common';
import { Cookie } from '@/core/entities/models/cookie';
import z from 'zod';

const inputSchema = z.object({
  token: z.string(),
  otp: z.string().min(6).max(6),
});

export type IActivateAccountController = ReturnType<
  typeof activateAccountController
>;

export const activateAccountController =
  (
    instrumentationService: IInstrumentationService,
    activateAccountUseCase: IActivateAccountUseCase,
  ) =>
  async (input: Partial<z.infer<typeof inputSchema>>): Promise<Cookie> => {
    return await instrumentationService.startSpan(
      { name: 'activateAccount Controller' },
      async () => {
        const { data, error: inputParseError } = inputSchema.safeParse(input);

        if (inputParseError) {
          throw new InputParseError('Invalid data', { cause: inputParseError });
        }

        const { cookie } = await activateAccountUseCase(data);
        return cookie;
      },
    );
  };
