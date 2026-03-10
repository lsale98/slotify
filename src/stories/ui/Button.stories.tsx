import { Button, buttonVariants } from '@/components/ui/button';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { VariantProps } from 'class-variance-authority';

import { fn } from 'storybook/test';

type ButtonVariantProps = VariantProps<typeof buttonVariants>;

type Variant = NonNullable<ButtonVariantProps['variant']>;
type Size = NonNullable<ButtonVariantProps['size']>;

const variantOptions = [
  'primary',
  'secondary',
  'destructive',
] satisfies Variant[];

const sizeOptions = ['default', 'sm', 'lg', 'icon'] satisfies Size[];

const meta = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      options: variantOptions,
      control: { type: 'select' },
    },
    size: {
      options: sizeOptions,
      control: { type: 'select' },
    },
    leftIcon: {
      control: false,
      description:
        'Icon element rendered before the label. Hidden during loading.',
    },
    rightIcon: {
      control: false,
      description:
        'Icon element rendered after the label. Hidden during loading.',
    },
    loading: {
      control: { type: 'boolean' },
      description: 'Shows a spinner and disables the button.',
    },
    fullWidth: {
      control: { type: 'boolean' },
      description: 'Stretches the button to fill the parent width.',
    },
  },
  args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: 'Reservation',
    asChild: false,
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Update',
  },
};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: 'Remove',
  },
};

export const Loading: Story = {
  args: {
    children: 'Saving…',
    loading: true,
  },
};

const PlusIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M5 12h14M12 5v14" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

export const WithLeftIcon: Story = {
  args: {
    children: 'Add reservation',
    leftIcon: <PlusIcon />,
  },
};

export const WithRightIcon: Story = {
  args: {
    children: 'Continue',
    variant: 'secondary',
    rightIcon: <ArrowRightIcon />,
  },
};

export const FullWidth: Story = {
  args: {
    children: 'Confirm reservation',
    fullWidth: true,
  },
  parameters: {
    layout: 'padded',
  },
};

export const Disabled: Story = {
  args: {
    children: 'Reservation',
    disabled: true,
  },
};
