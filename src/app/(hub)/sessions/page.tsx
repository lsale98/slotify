import { Container } from '@/components/ui/container';
import { Typography } from '@/components/ui/typography';
import { Role } from '@/generated/prisma';
import SuperadminSessions from './_views/SuperadminSessions';
import { getClaims } from '@/lib/getClaims';
import { UserClaims } from '@/lib/headerSigning';

const ROLE_VIEWS: Record<Role, React.ReactNode> = {
  SUPERADMIN: <SuperadminSessions />,
  ADMIN: null,
  MENTOR: null,
  SUPPORT: null,
  USER: null,
};

const Sessions = async () => {
  const claims = (await getClaims()) as UserClaims;

  return (
    <Container variant="hub">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <Typography element="h1" variant="h4">
            Sessions
          </Typography>
          <Typography variant="p">
            Manage you sessions and view your session history.
          </Typography>
        </div>
        {ROLE_VIEWS[claims.role as Role]}
      </div>
    </Container>
  );
};

export default Sessions;
