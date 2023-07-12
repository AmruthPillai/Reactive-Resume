import GitHubButton from 'react-github-btn';

import { useAppSelector } from '@/store/hooks';

import { Copyright } from '../shared/Copyright';
import Logo from '../shared/Logo';
import { Separator } from '../ui/Separator';

const Footer = () => {
  const theme = useAppSelector((state) => state.build.theme);

  return (
    <footer className="fixed inset-x-0 bottom-0 -z-50 h-[450px] bg-zinc-50 dark:bg-zinc-950">
      <Separator />

      <div className="container grid py-12 sm:grid-cols-3 lg:grid-cols-4">
        <div className="flex flex-col gap-y-2">
          <Logo size={96} className="-ml-2" />

          <h2 className="text-xl font-medium">Reactive Resume</h2>

          <p className="prose prose-sm prose-zinc leading-relaxed opacity-60 dark:prose-invert">
            A free and open-source resume builder that simplifies the tasks of creating, updating, and sharing your
            resume.
          </p>

          <div className="mt-6">
            <GitHubButton
              data-size="large"
              data-show-count="true"
              data-icon="octicon-star"
              data-color-scheme={theme ? 'dark' : 'light'}
              href="https://github.com/AmruthPillai/Reactive-Resume"
              aria-label="Star AmruthPillai/Reactive-Resume on GitHub"
            >
              Star
            </GitHubButton>
          </div>

          <Copyright className="mt-4" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
