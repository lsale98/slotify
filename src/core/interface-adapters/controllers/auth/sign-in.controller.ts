import { IInstrumentationService } from '@/core/application/services/instrumentation.service.interface';
import { ISignInUseCase } from '@/core/application/use-cases/auth/sign-in.use-case';
import { InputParseError } from '@/core/entities/errors/common';
import { Cookie } from '@/core/entities/models/cookie';
import { z } from 'zod';

const inputSchema = z.object({
  email: z.email(),
  password: z.string().min(6).max(20),
});

export type ISignInController = ReturnType<typeof signInController>;

export const signInController =
  (
    instrumentationService: IInstrumentationService,
    signInUseCase: ISignInUseCase,
  ) =>
  async (input: Partial<z.infer<typeof inputSchema>>): Promise<Cookie> => {
    return await instrumentationService.startSpan(
      { name: 'signIn Controller' },
      async () => {
        const { data, error: inputParseError } = inputSchema.safeParse(input);

        if (inputParseError) {
          throw new InputParseError('Invalid data', { cause: inputParseError });
        }

        const { cookie } = await signInUseCase(data);
        return cookie;
      },
    );
  };
