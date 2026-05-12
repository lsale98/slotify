'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useActionState } from 'react';
import { resetPassword } from '../actions/reset-password.action';
import { useFormFields } from '@/hooks/useFormFields';

const initialState = { error: undefined, success: undefined };

const ResetPasswordForm = ({ token }: { token: string | undefined }) => {
  const [state, formAction, isPending] = useActionState(
    resetPassword,
    initialState,
  );

  const { fields, handleChange } = useFormFields({
    password: '',
    confirm_password: '',
  });

  if (!token) {
    return (
      <div
        className="text-error-text bg-error-card rounded-md px-3 py-2 text-sm"
        role="alert"
      >
        Invalid or missing reset token. Please request a new password reset.
      </div>
    );
  }

  return (
    <form className="flex flex-col gap-4" action={formAction}>
      {state?.error && (
        <div
          className="text-error-text bg-error-card rounded-md px-3 py-2 text-sm"
          role="alert"
          aria-live="polite"
        >
          {state.error}
        </div>
      )}
      <input type="hidden" name="token" value={token} />
      <Input
        name="password"
        type="password"
        label="Password"
        placeholder="Enter your password"
        value={fields.password}
        onChange={(e) => handleChange('password')(e.target.value)}
      />
      <Input
        name="confirm_password"
        type="password"
        label="Confirm Password"
        placeholder="Enter your confirm password"
        value={fields.confirm_password}
        onChange={(e) => handleChange('confirm_password')(e.target.value)}
      />
      <Button fullWidth className="mt-1" disabled={isPending}>
        Reset password
      </Button>
    </form>
  );
};

export default ResetPasswordForm;
