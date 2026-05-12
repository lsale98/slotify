'use client';

import { Input } from '@/components/ui/input';
import { useActionState } from 'react';
import OtpValidateForm from './OtpValidateForm';
import { Button } from '@/components/ui/button';
import { Loader } from 'lucide-react';
import { activateAccount } from '../actions/activate-account.action';

const initialState = { error: undefined };

const ActivateAccount = ({ activationToken }: { activationToken: string }) => {
  const [state, formAction, isPending] = useActionState(
    activateAccount,
    initialState,
  );

  return (
    <form action={formAction}>
      <div className="flex flex-col items-center gap-4">
        <div>
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
            type="hidden"
            name="token"
            className="mt-2"
            value={activationToken}
          />
        </div>
        <div className="grid gap-2">
          <OtpValidateForm />
        </div>
        <Button
          type="submit"
          variant="primary"
          disabled={isPending}
          fullWidth
          className="mt-1"
        >
          {isPending ? <Loader className="animate-spin" /> : 'Activate account'}
        </Button>
      </div>
    </form>
  );
};

export default ActivateAccount;
