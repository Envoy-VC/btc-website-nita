import React from 'react';
import { cn } from '~/lib/utils';

import { AiOutlineLoading } from 'react-icons/ai';

import type { IconBaseProps } from 'react-icons';

const LoadingSpinner = ({ className, ...props }: IconBaseProps) => {
  return (
    <AiOutlineLoading
      className={cn('animate-spin text-xl', className)}
      {...props}
    />
  );
};

export default LoadingSpinner;
