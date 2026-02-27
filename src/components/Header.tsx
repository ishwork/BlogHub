import Image from 'next/image';
import Link from 'next/link';

import { LOGO_IMAGE } from '@/src/constants';
import ThemeToggle from '@/src/components/ThemeToggle';

const Header = () => {
  return (
    <header className="bg-header text-text shadow-md">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold hover:opacity-80">
            <Image
              src={LOGO_IMAGE}
              alt="BlogHub Logo"
              width={150}
              height={150}
              data-testid="bloghub-logo"
              className="h-10 w-auto"
            />
          </Link>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
};

export default Header;
