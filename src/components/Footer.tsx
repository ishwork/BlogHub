import Link from 'next/link';

const Footer = () => (
  <footer className="bg-footer text-text mt-4">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="flex space-x-6 mb-4 md:mb-0">
          <Link href="/about" className="text-text/70 hover:text-text transition-colors">
            About
          </Link>
          <Link href="/contact" className="text-text/70 hover:text-text transition-colors">
            Contact
          </Link>
        </div>
        <div>
          <p className="text-sm text-text/70">
            © {new Date().getFullYear()} BlogHub. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
