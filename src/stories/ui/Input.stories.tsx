import { Input, inputWrapperVariants } from '@/components/ui/input';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { VariantProps } from 'class-variance-authority';
import { fn } from 'storybook/test';

type InputVariantProps = VariantProps<typeof inputWrapperVariants>;

type Variant = NonNullable<InputVariantProps['variant']>;

const variantOptions = ['default', 'error', 'success'] satisfies Variant[];

const meta = {
  title: 'UI/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      options: variantOptions,
      control: { type: 'select' },
    },
    type: {
      options: ['text', 'email', 'password', 'number', 'search', 'url', 'tel'],
      control: { type: 'select' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
    required: {
      control: { type: 'boolean' },
    },
    label: {
      control: { type: 'text' },
      description: 'Label rendered above the input.',
    },
    hint: {
      control: { type: 'text' },
      description: 'Helper text shown below the input.',
    },
    error: {
      control: { type: 'text' },
      description:
        'Error message. Also switches to error variant automatically.',
    },
    success: {
      control: { type: 'text' },
      description:
        'Success message. Also switches to success variant automatically.',
    },
    placeholder: {
      control: { type: 'text' },
    },
    leftAddon: {
      control: false,
      description: 'Element positioned on the left inside the input.',
    },
    rightAddon: {
      control: false,
      description: 'Element positioned on the right inside the input.',
    },
  },
  args: {
    onChange: fn(),
    label: 'Label',
    placeholder: 'Placeholder...',
  },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Default ──────────────────────────────────────────────────────────────────

export const Default: Story = {};

// ─── With Hint ────────────────────────────────────────────────────────────────

export const WithHint: Story = {
  args: {
    hint: 'This is a helper text that provides additional context.',
  },
};

// ─── Required ─────────────────────────────────────────────────────────────────

export const Required: Story = {
  args: {
    required: true,
    hint: 'This field is required.',
  },
};

// ─── Error ────────────────────────────────────────────────────────────────────

export const Error: Story = {
  args: {
    label: 'Email address',
    placeholder: 'you@example.com',
    error: 'Enter a valid email address.',
    value: 'not-an-email',
  },
};

// ─── Success ──────────────────────────────────────────────────────────────────

export const Success: Story = {
  args: {
    label: 'Email address',
    placeholder: 'you@example.com',
    success: 'Email is available!',
    value: 'user@example.com',
  },
};

// ─── Disabled ─────────────────────────────────────────────────────────────────

export const Disabled: Story = {
  args: {
    disabled: true,
    value: 'Disabled value',
  },
};

// ─── Password ─────────────────────────────────────────────────────────────────

export const Password: Story = {
  args: {
    type: 'password',
    label: 'Password',
    placeholder: '••••••••',
    hint: 'Must be at least 8 characters.',
  },
};

// ─── With Left Addon ──────────────────────────────────────────────────────────

const MailIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-4 w-4"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

export const WithLeftAddon: Story = {
  args: {
    label: 'Email address',
    placeholder: 'you@example.com',
    type: 'email',
    leftAddon: <MailIcon />,
  },
};

// ─── With Right Addon ─────────────────────────────────────────────────────────

export const WithRightAddon: Story = {
  args: {
    label: 'Price',
    placeholder: '0.00',
    type: 'number',
    rightAddon: (
      <span className="text-muted-foreground text-sm font-medium">USD</span>
    ),
  },
};
