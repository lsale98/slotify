'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Typography } from '@/components/ui/typography';
import Link from 'next/link';
import { signUp } from '../actions/sign-up.action';
import { useActionState } from 'react';
import { RadioGroup } from '@/components/ui/radio';
import { RoleSchema } from '@/core/entities/models/user';
import { useFormFields } from '@/hooks/useFormFields';

const initialState = { error: undefined };

const SignUpForm = () => {
  const [state, formAction, isPending] = useActionState(signUp, initialState);

  const { fields, handleChange } = useFormFields({
    role: RoleSchema.enum.USER,
    name: '',
    lastname: '',
    email: '',
    password: '',
    confirm_password: '',
    agreed_terms: false,
  });

  return (
    <div className="flex w-full max-w-150 flex-col gap-6 rounded-2xl bg-white p-4 md:rounded-4xl md:p-8 lg:p-10">
      <div className="flex flex-col gap-1">
        <Typography element="h1" variant="h4">
          Start your journey as...
        </Typography>
      </div>
      <form action={formAction} className="flex flex-col gap-4">
        {state?.error && (
          <div
            className="text-destructive text-sm"
            role="alert"
            aria-live="polite"
          >
            {state.error}
          </div>
        )}
        <RadioGroup
          name="role"
          defaultValue={RoleSchema.enum.USER}
          {...({
            value: fields.role,
            onValueChange: handleChange('role'),
          } as object)}
        >
          <RadioGroup.Item value={RoleSchema.enum.USER} variant="card">
            <div className="flex justify-between gap-2">
              <div className="flex flex-col">
                <Typography variant="p">User</Typography>
                <Typography variant="muted">
                  Learn, grow, and develop with the guidance of expert mentors
                </Typography>
              </div>
              <RadioGroup.Indicator />
            </div>
          </RadioGroup.Item>
          <RadioGroup.Item value={RoleSchema.enum.MENTOR} variant="card">
            <div className="flex justify-between gap-2">
              <div className="flex flex-col">
                <Typography variant="p">Mentor</Typography>
                <Typography variant="muted">
                  Share your expertise and guide learners through their journey
                  in your field
                </Typography>
              </div>
              <RadioGroup.Indicator />
            </div>
          </RadioGroup.Item>
        </RadioGroup>
        <Input
          name="name"
          label="Name"
          placeholder="John"
          value={fields.name}
          onChange={(e) => handleChange('name')(e.target.value)}
        />

        <Input
          name="lastname"
          label="Lastname"
          placeholder="Doe"
          value={fields.lastname}
          onChange={(e) => handleChange('lastname')(e.target.value)}
        />

        <Input
          name="email"
          label="Email"
          type="email"
          placeholder="john.doe@gmail.com"
          value={fields.email}
          onChange={(e) => handleChange('email')(e.target.value)}
        />

        <Input
          name="password"
          type="password"
          label="Password"
          placeholder="Enter your password"
          value={fields.password}
          onChange={(e) => handleChange('password')(e.target.value)}
        />

        <Input
          name="confirm_password"
          type="password"
          label="Confirm Password"
          placeholder="Enter your confirm password"
          value={fields.confirm_password}
          onChange={(e) => handleChange('confirm_password')(e.target.value)}
        />

        <Checkbox
          name="agreedTerms"
          label="Agreed to terms & conditions"
          checked={fields.agreed_terms}
          onCheckedChange={handleChange('agreed_terms')}
        />
        <Button
          fullWidth
          className="mt-1"
          disabled={isPending || !fields.agreed_terms}
        >
          Sign up
        </Button>
      </form>
      <Typography variant="small">
        You have an account?{' '}
        <Link
          href="/sign-in"
          className="text-primary font-medium hover:underline"
        >
          Sign in
        </Link>
      </Typography>
    </div>
  );
};

export default SignUpForm;
