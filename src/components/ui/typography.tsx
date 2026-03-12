import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const typographyVariants = cva('text-base font-normal', {
  variants: {
    variant: {
      h1: 'text-4xl font-bold md:text-5xl xl:text-6xl text-foreground',
      h2: 'text-3xl font-semibold md:text-4xl xl:text-5xl text-foreground',
      h3: 'text-2xl font-semibold md:text-3xl xl:text-4xl text-foreground',
      h4: 'text-xl font-medium md:text-2xl xl:text-3xl text-foreground',
      h5: 'text-lg font-normal md:text-xl xl:text-2xl text-foreground',
      h6: 'text-md font-normal md:text-lg xl:text-xl text-foreground',
      p: 'text-base font-normal md:text-md xl:text-lg text-foreground',
      small: 'text-sm font-normal md:text-base xl:text-md text-foreground',
      muted: 'text-sm text-muted-foreground md:text-base xl:text-md',
      blockquote: 'border-l-2 pl-6 italic m-auto w-fit text-foreground',
    },
  },
  defaultVariants: {
    variant: 'p',
  },
});

export interface TypographyProps
  extends
    React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof typographyVariants> {
  asChild?: boolean;
  element?: React.ElementType;
}

const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  ({ className, variant, asChild = false, element = 'p', ...props }, ref) => {
    const Comp = asChild ? Slot : element;
    return (
      <Comp
        className={cn(typographyVariants({ variant, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);

Typography.displayName = 'Typography';

export { Typography, typographyVariants };
