import { cn } from '@/src/lib/utils';
import type { ReactNode } from 'react';

interface Props {
  label: ReactNode;
  children: ReactNode;
  className?: string;
  rowClassName?: string;
  labelClassName?: string;
  as?: 'label' | 'div';
}

const Field: React.FC<Props> = ({ label, children, className, rowClassName, labelClassName, as: Tag = 'label' }) => {
  return (
    <Tag className={cn('flex flex-col gap-1', className)}>
      <span className={cn('text-emperor-500 text-xs font-medium tracking-wide uppercase', labelClassName)}>
        {label}
      </span>
      <span
        className={cn(
          'border-sand-300 focus-within:border-ocean-600 flex items-center gap-2 border-b pb-1.5',
          rowClassName
        )}
      >
        {children}
      </span>
    </Tag>
  );
};

export default Field;
