/**
 * @file components/ui/Container.tsx
 *
 * Responsive container baziran na cva (class-variance-authority).
 *
 * Varijanti:
 *   - "narrow"  → max-w-3xl (768px)         — blog, auth, uski sadržaj
 *   - "default" → max-w-6xl (1152px)        — standardne stranice
 *   - "wide"    → max-w-screen-2xl (1536px) — dashboard, full-width layouti
 *
 * Usage:
 *   <Container>...</Container>
 *   <Container variant="narrow">...</Container>
 *   <Container variant="wide">...</Container>
 *   <Container variant="wide" as="section">...</Container>
 */

import { cva, type VariantProps } from 'class-variance-authority';
import { type ComponentPropsWithoutRef, type ElementType } from 'react';

// ─── CVA definition ───────────────────────────────────────────────────────────

const containerVariants = cva(
  // Base — uvijek prisutno
  'mx-auto w-full',
  {
    variants: {
      variant: {
        /**
         * narrow — 768px max
         * xs  < 480px  → px-4
         * sm  ≥ 480px  → px-6
         * md  ≥ 768px  → px-8
         */
        narrow: 'max-w-3xl px-4 sm:px-6 md:px-8',

        /**
         * default — 1152px max
         * xs  < 480px  → px-4
         * sm  ≥ 480px  → px-6
         * md  ≥ 768px  → px-8
         * lg  ≥ 1024px → px-10
         * xl  ≥ 1280px → px-12
         */
        default: 'max-w-6xl px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12',

        /**
         * wide — 1536px max
         * xs  < 480px  → px-4
         * sm  ≥ 480px  → px-6
         * md  ≥ 768px  → px-8
         * lg  ≥ 1024px → px-10
         * xl  ≥ 1280px → px-12
         * 2xl ≥ 1536px → px-16
         */
        wide: 'max-w-screen-2xl px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16',
        full: 'w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

// ─── Types ────────────────────────────────────────────────────────────────────

type ContainerProps<T extends ElementType = 'div'> = VariantProps<
  typeof containerVariants
> & {
  /** Render as any HTML element. Default: "div" */
  as?: T;
} & Omit<ComponentPropsWithoutRef<T>, 'variant'>;

// ─── Component ────────────────────────────────────────────────────────────────

const Container = <T extends ElementType = 'div'>({
  variant,
  as,
  className,
  children,
  ...props
}: ContainerProps<T>) => {
  const Tag = (as ?? 'div') as ElementType;

  return (
    <Tag className={containerVariants({ variant, className })} {...props}>
      {children}
    </Tag>
  );
};

export { Container, containerVariants };
