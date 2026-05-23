'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useActionState } from 'react';
import { forgotPassword } from '../actions/forgot-password.action';

const initialState = { error: undefined, success: undefined };

const ForgotPasswordForm = () => {
  const [state, formAction, isPending] = useActionState(
    forgotPassword,
    initialState,
  );
  return (
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
      {state.success && (
        <div className="text-green text-sm" role="alert" aria-live="polite">
          Check your inbox - we&apos;ve sent a reset link if that email is
          registered.
        </div>
      )}
      <Input
        name="email"
        label="Email"
        type="email"
        placeholder="john.doe@gmail.com"
      />
      <Button fullWidth className="mt-1" disabled={isPending}>
        Send link
      </Button>
    </form>
  );
};

export default ForgotPasswordForm;
