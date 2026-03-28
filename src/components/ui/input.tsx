'use client';

import * as React from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// ─── CVA Variants ─────────────────────────────────────────────────────────────

const inputVariants = cva(
  // Border živeo ovde pre — premešten na wrapper
  'flex h-9 w-full bg-transparent py-1 text-foreground text-xs shadow-xs transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-hidden disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
  {
    variants: {
      // px zavisi od toga sta ima levo/desno
      hasLeftAddon: {
        true: 'pl-9',
        false: 'pl-3',
      },
      hasRightAddon: {
        true: 'pr-9',
        false: 'pr-3',
      },
    },
    defaultVariants: {
      hasLeftAddon: false,
      hasRightAddon: false,
    },
  },
);

// Wrapper dobija border i focus-ring — jedino mesto za border
export const inputWrapperVariants = cva(
  'relative flex gap-1.5 items-center w-full rounded-md border transition-colors focus-within:ring-1',
  {
    variants: {
      variant: {
        default: 'border-input focus-within:ring-ring',
        error: 'border-destructive focus-within:ring-deborder-destructive',
        success: 'border-green-500 focus-within:ring-green-500',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

// ─── Eye Icons ────────────────────────────────────────────────────────────────

const EyeIcon = () => (
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
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeOffIcon = () => (
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
    <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
    <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
    <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
    <line x1="2" x2="22" y1="2" y2="22" />
  </svg>
);

// ─── Types ────────────────────────────────────────────────────────────────────

export interface InputProps
  extends
    React.InputHTMLAttributes<HTMLInputElement>,
    Omit<VariantProps<typeof inputWrapperVariants>, 'variant'> {
  variant?: 'default' | 'error' | 'success';
  label?: string;
  hint?: string;
  error?: string;
  success?: string;
  leftAddon?: React.ReactNode;
  rightAddon?: React.ReactNode;
}

// ─── Component ────────────────────────────────────────────────────────────────

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = 'text',
      label,
      hint,
      error,
      success,
      leftAddon,
      rightAddon,
      id,
      required,
      disabled,
      ...props
    },
    ref,
  ) => {
    const reactUseId = React.useId();
    const [showPassword, setShowPassword] = React.useState(false);

    const isPassword = type === 'password';
    const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

    const resolvedVariant = error ? 'error' : success ? 'success' : 'default';

    const inputId = id ?? reactUseId;
    const hintId = `${inputId}-hint`;
    const errorId = `${inputId}-error`;

    const hasRightAddon = !!(rightAddon || isPassword);

    return (
      <div className="flex w-full flex-col gap-1.5">
        {/* Label */}
        {label && (
          <label
            htmlFor={inputId}
            className="text-foreground text-sm font-medium select-none"
          >
            {label}
            {required && (
              <span className="text-destructive ml-1" aria-hidden="true">
                *
              </span>
            )}
          </label>
        )}

        {/* Wrapper — border i focus-ring su OVDE, ne na inputu */}
        <div
          className={cn(
            inputWrapperVariants({ variant: resolvedVariant }),
            disabled && 'cursor-not-allowed opacity-50',
          )}
        >
          {leftAddon && (
            <span className="text-muted-foreground pointer-events-none absolute left-3 flex items-center">
              {leftAddon}
            </span>
          )}

          <input
            ref={ref}
            id={inputId}
            type={inputType}
            disabled={disabled}
            required={required}
            aria-invalid={!!error}
            aria-describedby={error ? errorId : hint ? hintId : undefined}
            className={cn(
              inputVariants({
                hasLeftAddon: !!leftAddon,
                hasRightAddon,
              }),
              className,
            )}
            {...props}
          />

          {/* Password toggle */}
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              disabled={disabled}
              className="text-muted-foreground hover:bg-primary/10 focus-within:bg-primary/10 absolute right-3 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition-colors focus-visible:outline-none"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOffIcon /> : <EyeIcon />}
            </button>
          )}

          {!isPassword && rightAddon && (
            <span className="text-muted-foreground pointer-events-none absolute right-3 flex items-center">
              {rightAddon}
            </span>
          )}
        </div>

        {/* Messages */}
        {error && (
          <p
            id={errorId}
            role="alert"
            className="text-destructive flex items-center gap-1 text-xs font-medium"
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

        {success && !error && (
          <p className="flex items-center gap-1 text-xs font-medium text-green-600">
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
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <path d="m9 11 3 3L22 4" />
            </svg>
            {success}
          </p>
        )}

        {hint && !error && !success && (
          <p id={hintId} className="text-muted-foreground text-xs">
            {hint}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';

export { Input, inputVariants };
