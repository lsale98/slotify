import { Typography } from '@/components/ui/typography';
import ActivateAccount from './ActivateAccount';

type SearchParams = {
  searchParams: Promise<{ [key: string]: string | undefined }>;
};

const ActivateForm = async ({ searchParams }: SearchParams) => {
  const activationToken = (await searchParams).token;

  return (
    <div className="mx-auto flex max-w-150 flex-col gap-5 md:gap-8">
      <div className="flex flex-col gap-2 text-center">
        <Typography element="h1" variant="h3">
          Verify your account
        </Typography>
        <Typography
          element="p"
          variant="small"
          className="mx-auto max-w-[85%] text-balance"
        >
          Enter the 6-digit code we sent to your email.
        </Typography>
        <ActivateAccount activationToken={activationToken || ''} />
      </div>
    </div>
  );
};

export default ActivateForm;
