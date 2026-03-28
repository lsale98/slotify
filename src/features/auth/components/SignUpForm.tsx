'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Typography } from '@/components/ui/typography';
import Link from 'next/link';
import { signUp } from '../actions/sign-up.action';
import { useActionState } from 'react';

const initialState = { error: undefined };

const SignUpForm = () => {
  const [state, formAction, isPending] = useActionState(signUp, initialState);
  return (
    <div className="flex w-full max-w-150 flex-col gap-6 rounded-2xl bg-white p-4 md:rounded-4xl md:p-8 lg:p-10">
      <div className="flex flex-col gap-1">
        <Typography element="h1" variant="h4">
          Start your journey!
        </Typography>
      </div>
      <form action={formAction} className="flex flex-col gap-4">
        {state?.error && (
          <div
            className="text-error-text bg-error-card rounded-md px-3 py-2 text-sm"
            role="alert"
            aria-live="polite"
          >
            {state.error}
          </div>
        )}
        <Input name="name" label="Name" placeholder="Enter your name" />
        <Input
          name="lastname"
          label="Lastname"
          placeholder="Enter your lastname"
        />
        <Input
          name="email"
          label="Email"
          type="email"
          placeholder="Enter your email"
        />
        <Input
          name="password"
          type="password"
          label="Password"
          placeholder="Enter your password"
        />
        <Input
          name="confirm_password"
          type="password"
          label="Confirm Password"
          placeholder="Enter your confirm password"
        />
        <Checkbox name="agreedTerms" label="Agreed to terms & conditions" />
        <Button fullWidth className="mt-1" disabled={isPending}>
          Sing in
        </Button>
      </form>
      <Typography variant="small">
        You have an account?{' '}
        <Link
          href="/sign-in"
          className="text-primary font-medium hover:underline"
        >
          Sign in
        </Link>
      </Typography>
    </div>
  );
};

export default SignUpForm;
