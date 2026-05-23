import { Typography } from '@/components/ui/typography';
import ActivateAccount from './ActivateAccount';

type SearchParams = {
  searchParams: Promise<{ [key: string]: string | undefined }>;
};

const ActivateForm = async ({ searchParams }: SearchParams) => {
  const activationToken = (await searchParams).token;

  return (
    <div className="flex w-full max-w-150 flex-col gap-6 rounded-2xl bg-white p-4 md:rounded-4xl md:p-8 lg:p-10">
      <div className="flex flex-col gap-1 text-center">
        <Typography element="h1" variant="h4">
          Verify your account
        </Typography>
        <Typography className="mx-auto max-w-[85%] text-balance">
          Enter the 6-digit code we sent to your email.
        </Typography>
        <ActivateAccount activationToken={activationToken || ''} />
      </div>
    </div>
  );
};

export default ActivateForm;
