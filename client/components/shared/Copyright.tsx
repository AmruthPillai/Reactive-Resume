import clsx from 'clsx';

type Props = {
  className?: string;
};

export const Copyright = ({ className }: Props) => (
  <div
    className={clsx('prose prose-sm prose-zinc flex flex-col gap-y-1 text-xs opacity-40 dark:prose-invert', className)}
  >
    <span className="font-medium">v{process.env.appVersion}</span>
    <span>
      Licensed under <a href="https://github.com/AmruthPillai/Reactive-Resume/blob/main/LICENSE">MIT</a>
    </span>
    <span>
      A passion project by <a href="https://www.amruthpillai.com/">Amruth Pillai</a>
    </span>
  </div>
);
