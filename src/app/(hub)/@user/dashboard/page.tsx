import { Typography } from '@/components/ui/typography';
import SignOutButton from '@/features/auth/components/SignOutButton';

const UserDashboard = () => {
  return (
    <div>
      <Typography>User</Typography>
      <SignOutButton />
    </div>
  );
};

export default UserDashboard;
