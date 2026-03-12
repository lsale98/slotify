import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Typography } from '@/components/ui/typography';
import Link from 'next/link';

const SignIn = () => {
  return (
    <div className="flex w-full max-w-150 flex-col gap-6 rounded-2xl bg-white p-4 md:rounded-4xl md:p-8 lg:p-10">
      <div className="flex flex-col gap-1">
        <Typography variant="h4">Welcome Back!</Typography>
        <Typography>
          Sign in to access your dashboard and countinue your career path.
        </Typography>
      </div>
      <div className="flex flex-col gap-4">
        <Input label="Email" placeholder="Enter your email" />
        <Input
          type="password"
          label="Password"
          placeholder="Enter your password"
        />
        <Button fullWidth className="mt-1">
          Sing in
        </Button>
      </div>
      <Typography variant="small">
        Don&apos;t have an account yet?{' '}
        <Link href="/" className="text-primary font-medium hover:underline">
          Create an Account
        </Link>
      </Typography>
    </div>
  );
};

export default SignIn;
