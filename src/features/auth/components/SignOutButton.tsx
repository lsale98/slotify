'use client';

import { Button } from '@/components/ui/button';
import { signOut } from '../actions/sign-out.action';

const SignOutButton = () => {
  return <Button onClick={() => signOut()}>Sign out</Button>;
};

export default SignOutButton;
