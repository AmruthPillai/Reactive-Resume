import Tilt from 'react-parallax-tilt';

import { defaultTiltProps } from '@/constants/tilt';

import HomeActions from '../Actions';
import HeroBackground from '../Background';
import HeroPattern from '../Pattern';

const HeroSection = () => (
  <section className="relative">
    <HeroPattern />
    <HeroBackground />

    <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-52">
      <div className="mx-auto max-w-2xl shrink-0 lg:mx-0 lg:max-w-xl lg:pt-12">
        <div className="mt-10 space-y-2">
          <h6 className="text-base font-bold tracking-wide">Finally,</h6>
          <h1 className="text-4xl font-bold !leading-[1.15] tracking-tight sm:text-6xl">
            A free and open-source resume builder
          </h1>
        </div>

        <p className="prose prose-base prose-zinc mt-6 text-lg leading-8 dark:prose-invert">
          Reactive Resume is a free and open-source resume builder that simplifies the tasks of creating, updating, and
          sharing your resume.
        </p>

        <div className="mt-12 space-x-4">
          <HomeActions />
        </div>
      </div>

      <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32">
        <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
          <Tilt {...defaultTiltProps}>
            <img
              width={2432}
              height={1442}
              src="/images/screenshots/builder.png"
              alt="Reactive Resume Screenshot - Builder Screen"
              className="w-[76rem] rounded-lg bg-zinc-50/5 shadow-2xl ring-1 ring-zinc-950/10 dark:bg-zinc-950/5 dark:ring-zinc-50/10"
            />
          </Tilt>
        </div>
      </div>
    </div>
  </section>
);

export default HeroSection;
