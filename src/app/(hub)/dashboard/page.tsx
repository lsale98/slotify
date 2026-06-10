import { Role } from '@/core/entities/models/user';
import { getClaims } from '@/lib/getClaims';
import { UserClaims } from '@/lib/headerSigning';
import SuperadminDashboard from './_views/SuperadminDashboard';
import MentorDashboard from './_views/MentorDashboard';
import AdminDashboard from './_views/AdminDashboard';

const ROLE_VIEWS: Record<Role, React.ReactNode> = {
  SUPERADMIN: <SuperadminDashboard />,
  ADMIN: <AdminDashboard />,
  MENTOR: <MentorDashboard />,
  SUPPORT: null,
  USER: null,
};

const Dashboard = async () => {
  const claims = (await getClaims()) as UserClaims;

  return <>{ROLE_VIEWS[claims.role as Role]}</>;
};

export default Dashboard;
