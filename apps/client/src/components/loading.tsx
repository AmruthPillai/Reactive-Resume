import { cn } from '@reactive-resume/utils';
import { CircleNotch } from '@phosphor-icons/react';

interface LoadingProps {
  className?: string;
}

export function Loading({ className }: LoadingProps) {
  return (
    <div className={cn('flex items-center justify-center', className)}>
      <CircleNotch size={24} className="animate-spin text-primary" />
    </div>
  );
}