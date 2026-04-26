import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const ResetPasswordForm = () => {
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
      <Button fullWidth className="mt-1">
        Reset password
      </Button>
    </form>
  );
};

export default ResetPasswordForm;
