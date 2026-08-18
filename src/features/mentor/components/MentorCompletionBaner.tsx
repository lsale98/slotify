import { Button } from '@/components/ui/button';
import { Typography } from '@/components/ui/typography';
import { UserCircle } from 'lucide-react';

const MentorCompletionBaner = () => {
  return (
    <div className="flex w-260 max-w-full flex-col gap-4 rounded-xl border border-blue-200 bg-blue-50 px-5 py-4 sm:flex-row sm:items-center">
      <div className="flex flex-1 items-center gap-4">
        <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white sm:flex">
          <UserCircle className="text-primary h-5 w-5" />
        </div>
        <div className="min-w-0 flex-1">
          <Typography>Complete your profile</Typography>
          <Typography variant="muted">
            Add your hourly rate and other details so clients can find and book
            you.
          </Typography>
        </div>
      </div>
      <Button size="sm">Complete profile</Button>
    </div>
  );
};

export default MentorCompletionBaner;
