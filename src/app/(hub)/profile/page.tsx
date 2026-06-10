import { Typography } from '@/components/ui/typography';
import { getClaims } from '@/lib/getClaims';

const Profile = async () => {
  const claims = await getClaims();
  return (
    <div>
      <Typography>{claims?.role}</Typography>
    </div>
  );
};

export default Profile;
