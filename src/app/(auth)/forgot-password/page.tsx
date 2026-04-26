import { Typography } from '@/components/ui/typography';
import ForgotPasswordForm from '@/features/auth/components/ForgotPasswordForm';

const ForgotPassword = () => {
  return (
    <div className="flex w-full max-w-150 flex-col gap-6 rounded-2xl bg-white p-4 md:rounded-4xl md:p-8 lg:p-10">
      <div className="flex flex-col gap-1">
        <Typography element="h1" variant="h4">
          Forgot your password?
        </Typography>
        <Typography>
          Enter your email below, and we’ll send you a link to reset your
          password.
        </Typography>
      </div>
      <ForgotPasswordForm />
    </div>
  );
};

export default ForgotPassword;
