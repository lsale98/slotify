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
      <div className="flex flex-col items-center gap-3">
        <div className="grid gap-2">
          {state.error && <p className="text-destructive">{state.error}</p>}
          <Input type="hidden" name="token" value={activationToken} />
        </div>
        <div className="grid gap-2">
          <OtpValidateForm />
        </div>
        <Button
          type="submit"
          variant="primary"
          disabled={isPending}
          className="w-full"
        >
          {isPending ? <Loader className="animate-spin" /> : 'Activate Account'}
        </Button>
      </div>
    </form>
  );
};

export default ActivateAccount;
