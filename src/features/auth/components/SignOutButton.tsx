'use client';

import { Button } from '@/components/ui/button';
import { signOut } from '../actions/sign-out.action';
import { LogOut } from 'lucide-react';

const SignOutButton = () => {
  return (
    <Button onClick={() => signOut()} className="w-full">
      <LogOut />
      Sign out
    </Button>
  );
};

export default SignOutButton;
