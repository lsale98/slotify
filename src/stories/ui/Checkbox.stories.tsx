import { Checkbox, checkboxVariants } from '@/components/ui/checkbox';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { VariantProps } from 'class-variance-authority';
import { fn } from 'storybook/test';

type CheckboxVariantProps = VariantProps<typeof checkboxVariants>;

type Variant = NonNullable<CheckboxVariantProps['variant']>;
type Size = NonNullable<CheckboxVariantProps['size']>;

const variantOptions = ['default', 'error'] satisfies Variant[];
const sizeOptions = ['sm', 'md'] satisfies Size[];

const meta = {
  title: 'UI/Checkbox',
  component: Checkbox,
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
    checked: {
      options: [true, false, 'indeterminate'],
      control: { type: 'select' },
      description: 'Checked state. Supports true, false, and "indeterminate".',
    },
    disabled: {
      control: { type: 'boolean' },
    },
    label: {
      control: { type: 'text' },
      description: 'Label rendered next to the checkbox.',
    },
    hint: {
      control: { type: 'text' },
      description: 'Helper text shown below the label.',
    },
    error: {
      control: { type: 'text' },
      description:
        'Error message. Also switches to error variant automatically.',
    },
  },
  args: {
    onCheckedChange: fn(),
    label: 'Accept terms and conditions',
    checked: false,
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── States ───────────────────────────────────────────────────────────────────

export const Unchecked: Story = {
  args: {
    checked: false,
  },
};

export const Checked: Story = {
  args: {
    checked: true,
  },
};

export const Indeterminate: Story = {
  args: {
    checked: 'indeterminate',
    label: 'Select all',
  },
};

// ─── With hint ────────────────────────────────────────────────────────────────

export const WithHint: Story = {
  args: {
    label: 'Marketing emails',
    hint: 'Receive updates about products, features, and events.',
  },
};

// ─── Error ────────────────────────────────────────────────────────────────────

export const Error: Story = {
  args: {
    label: 'I agree to the terms',
    error: 'You must accept the terms to continue.',
  },
};

// ─── Disabled ─────────────────────────────────────────────────────────────────

export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'Feature unavailable',
  },
};

export const DisabledChecked: Story = {
  args: {
    disabled: true,
    checked: true,
    label: 'Pre-selected option',
  },
};

// ─── Sizes ────────────────────────────────────────────────────────────────────

export const Small: Story = {
  args: {
    size: 'sm',
    checked: true,
  },
};

export const Medium: Story = {
  args: {
    size: 'md',
    checked: true,
  },
};
