import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const ForgotPasswordForm = () => {
  return (
    <form className="flex flex-col gap-4">
      {/* {state?.error && (
          <div
            className="text-error-text bg-error-card rounded-md px-3 py-2 text-sm"
            role="alert"
            aria-live="polite"
          >
            {state.error}
          </div>
        )} */}
      <Input
        name="email"
        label="Email"
        type="email"
        placeholder="john.doe@gmail.com"
      />
      <Button fullWidth className="mt-1">
        Send link
      </Button>
    </form>
  );
};

export default ForgotPasswordForm;
