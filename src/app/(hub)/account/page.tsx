import { Container } from '@/components/ui/container';
import { Typography } from '@/components/ui/typography';
import MentorCompletionBaner from '@/features/mentor/components/MentorCompletionBaner';
import { getCurrentUser } from '@/features/user/queries/get-current-user';
import { Role } from '@/generated/prisma';

const Account = async () => {
  const user = await getCurrentUser();

  if (!user?.id) return null;

  return (
    <Container variant="hub">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <Typography element="h1" variant="h4">
            Account
          </Typography>
          <Typography variant="p">
            Manage your personal information and preferences.
          </Typography>
        </div>
        {!user.mentorProfile?.verified && user.role === Role.MENTOR ? (
          <MentorCompletionBaner />
        ) : null}
      </div>
    </Container>
  );
};

export default Account;
