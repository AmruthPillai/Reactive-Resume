import Link from 'next/link';

import Logo from '../shared/Logo';
import HomeActions from './Actions';

const Header = () => (
  <header className="fixed inset-x-0 top-0 z-50">
    <nav className="bg-gradient-to-b from-zinc-50 to-transparent py-3 dark:from-zinc-950">
      <div className="container flex items-center justify-between">
        <div className="lg:flex-1">
          <Link href="/">
            <Logo size={48} />
          </Link>
        </div>

        <div className="space-x-4">
          <HomeActions />
        </div>
      </div>
    </nav>
  </header>
);

export default Header;
