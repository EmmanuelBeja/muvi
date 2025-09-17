import { Link } from '@tanstack/react-router';
import { SquareArrowOutUpRight } from 'lucide-react';

const Footer = () => {
  return (
    <div className="grid md:grid-cols-2 shadow-lg drop-shadow-lg mt-6 border-primary border-t w-full gri-cols-1">
      <div className="flex justify-center items-center bg-primary py-6 text-white">
        Powered by{' '}
        <Link
          to="https://www.themoviedb.org"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-1 pl-1 text-secondary underline"
        >
          TMDD <SquareArrowOutUpRight className="h-[12px]" />
        </Link>
      </div>
      <div className="flex justify-center items-center bg-white py-6">
        🍿 Lights. Camera. Magic.
      </div>
    </div>
  );
};

export default Footer;
