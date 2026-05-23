import { IInstrumentationService } from '@/core/application/services/instrumentation.service.interface';
import { ISignUpUseCase } from '@/core/application/use-cases/auth/sign-up.use-case';
import { InputParseError } from '@/core/entities/errors/common';
import { RoleSchema, StatusSchema } from '@/core/entities/models/user';
import z from 'zod';

const inputSchema = z
  .object({
    name: z.string({ message: 'Name is required' }),
    lastname: z.string({ message: 'Lastname is required' }),
    email: z.email({ message: 'Email is not valid format' }),
    password: z
      .string()
      .min(6, { message: 'Password must contain at least 6 characters' })
      .max(20, {
        message: 'Password to long. Maximum number of characters is 20',
      }),
    confirm_password: z.string(),
    role: RoleSchema.default('USER'),
    status: StatusSchema.default('PENDING'),
    agreed_terms: z.boolean().default(true),
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

export type ISignUpController = ReturnType<typeof signUpController>;

export const signUpController =
  (
    instrumentationService: IInstrumentationService,
    signUpUseCase: ISignUpUseCase,
  ) =>
  async (
    input: Partial<z.infer<typeof inputSchema>>,
  ): Promise<ReturnType<typeof signUpUseCase>> => {
    return await instrumentationService.startSpan(
      { name: 'signUp Controller' },
      async () => {
        const { data, error: inputParseError } = inputSchema.safeParse(input);

        if (inputParseError) {
          throw new InputParseError('Invalid data', { cause: inputParseError });
        }

        return await signUpUseCase(data);
      },
    );
  };
