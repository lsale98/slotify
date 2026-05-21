'use client';

import * as React from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { cn } from '@/lib/utils';

// ─── Indicator Mount Context ──────────────────────────────────────────────────
// Used by RadioGroup.Item to detect whether a RadioGroup.Indicator
// has been manually placed inside it by the consumer.

interface IndicatorContextValue {
  onMount: () => void;
  onUnmount: () => void;
}

const IndicatorContext = React.createContext<IndicatorContextValue>({
  onMount: () => {},
  onUnmount: () => {},
});

// ─── Item Value Context ───────────────────────────────────────────────────────
// Passes the item's value down to RadioGroup.Indicator so it can
// render the correct Radix primitive.

interface ItemContextValue {
  value: string;
  disabled?: boolean;
}

const ItemContext = React.createContext<ItemContextValue>({ value: '' });

// ─── RadioGroup Root ──────────────────────────────────────────────────────────

interface RadioGroupProps extends Omit<
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>,
  'value' | 'onValueChange'
> {
  /** Form field name — works like <input name="..."> */
  name: string;
  /** Pre-select an option without controlling it */
  defaultValue?: string;
  className?: string;
}

function RadioGroup({ name, className, children, ...props }: RadioGroupProps) {
  return (
    <RadioGroupPrimitive.Root
      name={name}
      className={cn('flex flex-col gap-3', className)}
      {...props}
    >
      {children}
    </RadioGroupPrimitive.Root>
  );
}

// ─── RadioGroup.Indicator ─────────────────────────────────────────────────────

interface RadioGroupIndicatorProps {
  className?: string;
}

function RadioGroupIndicator({ className }: RadioGroupIndicatorProps) {
  const { onMount, onUnmount } = React.useContext(IndicatorContext);
  const { value, disabled } = React.useContext(ItemContext);

  React.useEffect(() => {
    onMount();
    return () => onUnmount();
  }, []);

  return <Indicator value={value} disabled={disabled} className={className} />;
}

// ─── Shared Indicator primitive ───────────────────────────────────────────────

interface IndicatorProps {
  value: string;
  disabled?: boolean;
  className?: string;
}

function Indicator({ value, disabled, className }: IndicatorProps) {
  return (
    <RadioGroupPrimitive.Item
      value={value}
      disabled={disabled}
      className={cn(
        'h-4 w-4 shrink-0 rounded-full border-2 border-neutral-300',
        'bg-white transition-all duration-150 outline-none',
        'focus-visible:ring-primary focus-visible:ring-2 focus-visible:ring-offset-2',
        'data-[state=checked]:border-primary',
        'data-[state=checked]:bg-primary',
        className,
      )}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <span className="block h-1 w-1 rounded-full bg-white" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
}

// ─── RadioGroup.Item ──────────────────────────────────────────────────────────

interface RadioGroupItemProps {
  value: string;
  variant?: 'default' | 'card';
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
}

function RadioGroupItem({
  value,
  variant = 'default',
  disabled,
  className,
  children,
}: RadioGroupItemProps) {
  const isCard = variant === 'card';
  const hasChildren = React.Children.count(children) > 0;

  // Track whether consumer placed a RadioGroup.Indicator inside
  const [indicatorMounted, setIndicatorMounted] = React.useState(false);

  const indicatorContextValue = React.useMemo<IndicatorContextValue>(
    () => ({
      onMount: () => setIndicatorMounted(true),
      onUnmount: () => setIndicatorMounted(false),
    }),
    [],
  );

  // Auto-show indicator when:
  // - no children (classic radio)
  // - has children but consumer hasn't placed RadioGroup.Indicator manually
  const showAutoIndicator = !indicatorMounted;

  return (
    <ItemContext.Provider value={{ value, disabled }}>
      <IndicatorContext.Provider value={indicatorContextValue}>
        <label
          className={cn(
            'group flex cursor-pointer items-start gap-2 select-none',
            isCard && [
              'rounded-xl border border-neutral-200 bg-white p-3',
              'transition-all duration-150',
              'hover:border-neutral-400 hover:shadow-sm',
              'has-data-[state=checked]:border-primary',
              'has-data-[state=checked]:bg-primary/10',
              'has-data-[state=checked]:shadow-[0_0_0_1px_var(--color-primary)]',
            ],
            disabled && 'pointer-events-none cursor-not-allowed opacity-50',
            className,
          )}
        >
          {/* Auto indicator — shown unless consumer placed RadioGroup.Indicator manually */}
          {showAutoIndicator && (
            <Indicator value={value} disabled={disabled} className="mt-0.5" />
          )}

          {/* Consumer children */}
          {hasChildren && (
            <div className="min-w-0 flex-1 text-sm leading-snug text-neutral-700">
              {children}
            </div>
          )}
        </label>
      </IndicatorContext.Provider>
    </ItemContext.Provider>
  );
}

// ─── Attach sub-components ────────────────────────────────────────────────────

RadioGroup.Item = RadioGroupItem;
RadioGroup.Indicator = RadioGroupIndicator;

export { RadioGroup };
export type { RadioGroupProps, RadioGroupItemProps, RadioGroupIndicatorProps };
