'use client';

import { DateSegment } from './date-segment';
import { useRef } from 'react';
import {
  type AriaTimeFieldProps,
  type TimeValue,
  useLocale,
  useTimeField,
} from 'react-aria';
import { useTimeFieldState } from 'react-stately';

import { cn } from '~/lib/utils';

function TimeField(props: AriaTimeFieldProps<TimeValue>) {
  const ref = useRef<HTMLDivElement | null>(null);

  const { locale } = useLocale();
  const state = useTimeFieldState({
    ...props,
    locale,
  });
  const {
    fieldProps: { ...fieldProps },
  } = useTimeField(props, state, ref);

  return (
    <div
      {...fieldProps}
      ref={ref}
      aria-label='Time Field'
      aria-labelledby='time-field-label'
      className={cn(
        'border-input ring-offset-background focus-within:ring-ring focus-visible:ring-ring inline-flex h-10 w-full flex-1 rounded-md border bg-transparent px-3 py-2 text-sm focus-within:ring-2 focus-within:ring-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
        props.isDisabled ? 'cursor-not-allowed opacity-50' : ''
      )}
    >
      {state.segments.map((segment, i) => (
        <DateSegment key={i} segment={segment} state={state} />
      ))}
    </div>
  );
}

export { TimeField };
