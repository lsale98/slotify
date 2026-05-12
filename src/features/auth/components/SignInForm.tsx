'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Typography } from '@/components/ui/typography';
import Link from 'next/link';
import { useActionState } from 'react';
import { signIn } from '../actions/sign-in.action';
import { useFormFields } from '@/hooks/useFormFields';

const initialState = { error: undefined };

const SignInForm = () => {
  const [state, formAction, isPending] = useActionState(signIn, initialState);
  const { fields, handleChange } = useFormFields({
    email: '',
    password: '',
  });

  return (
    <div className="flex w-full max-w-150 flex-col gap-6 rounded-2xl bg-white p-4 md:rounded-4xl md:p-8 lg:p-10">
      <div className="flex flex-col gap-1">
        <Typography element="h1" variant="h4">
          Welcome Back!
        </Typography>
        <Typography>
          Sign in to access your dashboard and countinue your career path.
        </Typography>
      </div>
      <form action={formAction} className="flex flex-col gap-4">
        {state?.error && (
          <div
            className="text-destructive text-sm"
            role="alert"
            aria-live="polite"
          >
            {state.error}
          </div>
        )}
        <Input
          name="email"
          label="Email"
          type="email"
          placeholder="john.doe@gmail.com"
          value={fields.email}
          onChange={(e) => handleChange('email')(e.target.value)}
        />
        <Input
          name="password"
          type="password"
          label="Password"
          placeholder="Enter your password"
          value={fields.password}
          onChange={(e) => handleChange('password')(e.target.value)}
        />
        <Typography variant="small" className="ml-auto">
          <Link
            href="/forgot-password"
            className="text-primary font-medium hover:underline"
          >
            Forgot password?
          </Link>
        </Typography>
        <Button fullWidth className="mt-1" disabled={isPending}>
          Sign in
        </Button>
      </form>
      <Typography variant="small">
        Don&apos;t have an account yet?{' '}
        <Link
          href="/sign-up"
          className="text-primary font-medium hover:underline"
        >
          Create an Account
        </Link>
      </Typography>
    </div>
  );
};

export default SignInForm;
