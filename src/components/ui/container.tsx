import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const containerVariants = cva('mx-auto w-full', {
  variants: {
    variant: {
      narrow: 'max-w-3xl px-4 sm:px-6 md:px-8',
      default: 'max-w-6xl px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12',
      wide: 'max-w-screen-2xl px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16',
      full: 'w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export interface ContainerProps
  extends
    React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof containerVariants> {
  asChild?: boolean;
  element?: React.ElementType;
}

const Container = React.forwardRef<HTMLElement, ContainerProps>(
  ({ className, variant, asChild = false, element = 'div', ...props }, ref) => {
    const Comp = asChild ? Slot : element;

    return (
      <Comp
        ref={ref}
        className={cn(containerVariants({ variant, className }))}
        {...props}
      />
    );
  },
);

Container.displayName = 'Container';

export { Container, containerVariants };
