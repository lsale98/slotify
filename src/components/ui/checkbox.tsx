// components/ui/checkbox.tsx
'use client';

import * as React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// ─── CVA Variants ────────────────────────────────────────────────────────────

const checkboxVariants = cva(
  [
    'peer shrink-0 rounded',
    'border transition-all duration-150',
    'ring-offset-background',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    'disabled:cursor-not-allowed disabled:opacity-40',
    // Checked state
    'data-[state=checked]:bg-primary data-[state=checked]:border-primary',
    'data-[state=checked]:text-white',
    // Indeterminate
    'data-[state=indeterminate]:bg-primary data-[state=indeterminate]:border-primary',
    'data-[state=indeterminate]:text-white',
    // Unchecked
    'data-[state=unchecked]:bg-white data-[state=unchecked]:border-neutral-300',
    'data-[state=unchecked]:hover:border-neutral-400',
    // Dark mode
    'dark:data-[state=checked]:bg-white dark:data-[state=checked]:border-white dark:data-[state=checked]:text-primary',
    'dark:data-[state=unchecked]:bg-primary dark:data-[state=unchecked]:border-primary',
    'dark:data-[state=unchecked]:hover:primary/50',
  ],
  {
    variants: {
      variant: {
        default: '',
        error: [
          'border-red-400 data-[state=unchecked]:border-red-400',
          'focus-visible:ring-red-500/30',
          'dark:border-red-500 dark:data-[state=unchecked]:border-red-500',
        ],
      },
      size: {
        sm: 'h-4 w-4 rounded',
        md: 'h-5 w-5 rounded-md',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  },
);

const checkboxLabelVariants = cva(
  [
    'font-medium leading-none',
    'peer-disabled:cursor-not-allowed peer-disabled:opacity-40',
    'select-none cursor-pointer',
    'text-neutral-800 dark:text-neutral-200 translate-y-px',
  ],
  {
    variants: {
      size: {
        sm: 'text-xs',
        md: 'text-sm',
        lg: 'text-base',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
);

// ─── Check Icon ───────────────────────────────────────────────────────────────

const CheckIcon = ({ size }: { size: 'sm' | 'md' | 'lg' }) => {
  const dim = { sm: 10, md: 12, lg: 14 }[size];
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={dim}
      height={dim}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
};

const MinusIcon = ({ size }: { size: 'sm' | 'md' }) => {
  const dim = { sm: 10, md: 12 }[size];
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={dim}
      height={dim}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={3}
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M5 12h14" />
    </svg>
  );
};

// ─── Types ────────────────────────────────────────────────────────────────────

export interface CheckboxProps
  extends
    React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>,
    VariantProps<typeof checkboxVariants> {
  /** Label shown next to the checkbox */
  label?: React.ReactNode;
  /** Helper text shown below */
  hint?: string;
  /** Error message */
  error?: string;
  /** Wrapper class */
  wrapperClassName?: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(
  (
    {
      className,
      wrapperClassName,
      variant,
      size = 'md',
      label,
      hint,
      error,
      id,
      ...props
    },
    ref,
  ) => {
    const reactUseId = React.useId();
    const resolvedVariant = error ? 'error' : (variant ?? 'default');
    const resolvedSize = size ?? 'md';

    const checkboxId = id ?? reactUseId;
    const errorId = `${checkboxId}-error`;
    const hintId = `${checkboxId}-hint`;

    return (
      <div className={cn('flex flex-col gap-1.5', wrapperClassName)}>
        <div className="flex items-start gap-2.5">
          <CheckboxPrimitive.Root
            ref={ref}
            id={checkboxId}
            aria-invalid={!!error}
            aria-describedby={error ? errorId : hint ? hintId : undefined}
            className={cn(
              checkboxVariants({
                variant: resolvedVariant,
                size: resolvedSize,
              }),
              // Align with first line of label text
              'mt-px',
              className,
            )}
            {...props}
          >
            <CheckboxPrimitive.Indicator className="flex items-center justify-center">
              {props.checked === 'indeterminate' ? (
                <MinusIcon size={resolvedSize} />
              ) : (
                <CheckIcon size={resolvedSize} />
              )}
            </CheckboxPrimitive.Indicator>
          </CheckboxPrimitive.Root>

          {label && (
            <div className="flex flex-col gap-1">
              <label
                htmlFor={checkboxId}
                className={cn(checkboxLabelVariants({ size: resolvedSize }))}
              >
                {label}
              </label>
              {hint && !error && (
                <p id={hintId} className="text-xs font-normal text-neutral-500">
                  {hint}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Error */}
        {error && (
          <p
            id={errorId}
            role="alert"
            className="ml-[calc(--spacing(5)+(--spacing(2)))] flex items-center gap-1 text-xs font-medium text-red-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3.5 w-3.5 shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" x2="12" y1="8" y2="12" />
              <line x1="12" x2="12.01" y1="16" y2="16" />
            </svg>
            {error}
          </p>
        )}
      </div>
    );
  },
);

Checkbox.displayName = 'Checkbox';

export { Checkbox, checkboxVariants };
