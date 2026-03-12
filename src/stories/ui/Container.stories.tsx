import { Container, containerVariants } from '@/components/ui/container';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { type VariantProps } from 'class-variance-authority';

type ContainerVariantProps = VariantProps<typeof containerVariants>;
type Variant = NonNullable<ContainerVariantProps['variant']>;

const variantOptions = ['narrow', 'default', 'wide'] satisfies Variant[];

// ─── Helper — visible content block ──────────────────────────────────────────

const DemoContent = () => (
  <div className="rounded-md border border-dashed border-gray-300 bg-gray-50 p-6 text-center text-sm text-gray-500">
    Content block
  </div>
);

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta = {
  title: 'UI/Container',
  component: Container,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      options: variantOptions,
      control: { type: 'select' },
      description:
        'Controls max-width and horizontal padding across breakpoints.',
      table: {
        defaultValue: { summary: 'default' },
      },
    },
    as: {
      control: { type: 'text' },
      description: 'HTML element to render as. Default: `div`.',
      table: {
        defaultValue: { summary: 'div' },
      },
    },
    className: {
      control: { type: 'text' },
      description: 'Additional Tailwind classes merged via cva.',
    },
  },
} satisfies Meta<typeof Container>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Stories ──────────────────────────────────────────────────────────────────

export const Default: Story = {
  args: {
    variant: 'default',
    children: <DemoContent />,
  },
};

export const Narrow: Story = {
  args: {
    variant: 'narrow',
    children: <DemoContent />,
  },
};

export const Wide: Story = {
  args: {
    variant: 'wide',
    children: <DemoContent />,
  },
};

/** Render as semantic <section> element */
export const AsSection: Story = {
  args: {
    variant: 'default',
    as: 'section',
    children: <DemoContent />,
  },
};

/** Render as semantic <main> element */
export const AsMain: Story = {
  args: {
    variant: 'wide',
    as: 'main',
    children: <DemoContent />,
  },
};

/** Extra className merged via cva — adds vertical padding */
export const WithVerticalPadding: Story = {
  args: {
    variant: 'default',
    className: 'py-16',
    children: <DemoContent />,
  },
};

/** All three variants stacked for visual comparison */
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4 py-8">
      {variantOptions.map((variant) => (
        <div key={variant} className="relative">
          {/* Variant label */}
          <span className="absolute -top-5 left-0 text-xs font-medium text-gray-400">
            variant=&quot;{variant}&quot;
          </span>

          {/* Coloured background to visualise actual width */}
          <div className="w-full bg-blue-50">
            <Container variant={variant}>
              <div className="rounded-md border border-dashed border-blue-300 bg-white p-6 text-center text-sm text-blue-600">
                {variant} —{' '}
                {variant === 'narrow'
                  ? 'max-w-3xl'
                  : variant === 'default'
                    ? 'max-w-6xl'
                    : 'max-w-screen-2xl'}
              </div>
            </Container>
          </div>
        </div>
      ))}
    </div>
  ),
};
