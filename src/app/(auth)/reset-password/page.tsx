import { Typography } from '@/components/ui/typography';
import ResetPasswordForm from '@/features/auth/components/ResetPasswordForm';

const ResetPassword = async ({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) => {
  const { token } = await searchParams;

  return (
    <div className="flex w-full max-w-150 flex-col gap-6 rounded-2xl bg-white p-4 md:rounded-4xl md:p-8 lg:p-10">
      <div className="flex flex-col gap-1">
        <Typography element="h1" variant="h4">
          Reset your password
        </Typography>
        <Typography>
          Enter your new password below to regain access to your account.
        </Typography>
      </div>
      <ResetPasswordForm token={token} />
    </div>
  );
};

export default ResetPassword;
