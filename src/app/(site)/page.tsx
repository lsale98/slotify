import { Button } from '@/components/ui/button';
import { Typography } from '@/components/ui/typography';
import { getClaims } from '@/lib/getClaims';
import { UserClaims } from '@/lib/headerSigning';
import Link from 'next/link';

export default async function Home() {
  const claims = (await getClaims()) as UserClaims;

  return (
    <div className="bg-background flex flex-col items-center justify-center gap-8 rounded-2xl p-6">
      <Typography>Slotify Demo</Typography>
      {claims?.userId ? (
        <Button asChild>
          <Link href="/dashboard">Dashboard</Link>
        </Button>
      ) : (
        <Button asChild>
          <Link href="/sign-in">Sign in</Link>
        </Button>
      )}
    </div>
  );
}
