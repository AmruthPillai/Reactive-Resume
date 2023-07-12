import { cn } from '@/utils/styles';

type LogoProps = { brand: string };

const Logo = ({ brand }: LogoProps) => (
  <div className={cn('col-span-2 col-start-2 sm:col-start-auto lg:col-span-1', brand === 'twilio' && 'sm:col-start-2')}>
    {/* Show on Light Theme */}
    <img
      className="block max-h-12 object-contain dark:hidden"
      src={`/images/brand-logos/dark/${brand}.svg`}
      alt={brand}
      width={212}
      height={48}
    />
    {/* Show on Dark Theme */}
    <img
      className="hidden max-h-12 object-contain dark:block"
      src={`/images/brand-logos/light/${brand}.svg`}
      alt={brand}
      width={212}
      height={48}
    />
  </div>
);

const logoList: string[] = ['amazon', 'google', 'postman', 'twilio', 'zalando'];

const LogoSection = () => (
  <section className="relative py-24 sm:py-32">
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <p className="text-center text-lg leading-relaxed">
        Reactive Resume has helped people land jobs at these great companies:
      </p>
      <div className="mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
        {logoList.map((brand) => (
          <Logo key={brand} brand={brand} />
        ))}
      </div>

      <p className="mx-auto mt-8 max-w-sm text-center leading-relaxed">
        If this app has helped you with your job hunt, let me know by reaching out through{' '}
        <a href="https://www.amruthpillai.com/#contact" target="_blank" rel="noreferrer" className="hover:underline">
          this contact form
        </a>
        .
      </p>
    </div>
  </section>
);

export default LogoSection;
