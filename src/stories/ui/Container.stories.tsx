import { Container, containerVariants } from '@/components/ui/container';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { type VariantProps } from 'class-variance-authority';

type ContainerVariantProps = VariantProps<typeof containerVariants>;
type Variant = NonNullable<ContainerVariantProps['variant']>;

const variantOptions = [
  'narrow',
  'default',
  'wide',
  'full',
] satisfies Variant[];

const DemoContent = () => (
  <div className="rounded-md border border-dashed border-gray-300 bg-gray-50 p-6 text-center text-sm text-gray-500">
    Content block
  </div>
);

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
    element: {
      control: { type: 'text' },
      description: 'HTML element to render as. Default: `div`.',
      table: {
        defaultValue: { summary: 'div' },
      },
    },
    asChild: {
      control: { type: 'boolean' },
      description:
        'When `true`, merges props onto the immediate child via Radix `Slot`. Avoids an extra wrapper DOM node.',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    className: {
      control: { type: 'text' },
      description: 'Additional Tailwind classes merged via `cn` + cva.',
    },
  },
} satisfies Meta<typeof Container>;

export default meta;
type Story = StoryObj<typeof meta>;

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

export const Full: Story = {
  args: {
    variant: 'full',
    children: <DemoContent />,
  },
};

export const AsSection: Story = {
  args: {
    variant: 'default',
    element: 'section',
    children: <DemoContent />,
  },
};

export const AsMain: Story = {
  args: {
    variant: 'wide',
    element: 'main',
    children: <DemoContent />,
  },
};

export const AsChild: Story = {
  args: {
    variant: 'narrow',
    asChild: true,
    children: (
      <article>
        <DemoContent />
      </article>
    ),
  },
};

export const WithVerticalPadding: Story = {
  args: {
    variant: 'default',
    className: 'py-16',
    children: <DemoContent />,
  },
};
