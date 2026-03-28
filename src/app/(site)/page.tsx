import { Input } from '@/components/ui/input';
import { getClaims } from '@/lib/getClaims';

export default async function Home() {
  const claims = await getClaims();

  return (
    <div className="bg-background min-h-screen items-center justify-center">
      <h1>Slotify</h1>
      <Input label="Test" error="Test" />
      <p>UserId: {claims?.userId ?? 'Nije ulogovan'}</p>
    </div>
  );
}
