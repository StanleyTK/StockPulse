import Link from 'next/link';
import Image from 'next/image';
import { useSession, signOut } from 'next-auth/react';

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-800 shadow-lg">
      <div className="flex items-center">
        <Link href="/">
          <div className="flex items-center cursor-pointer">
            <Image src="/Logo.png" alt="StockPulse Logo" width={40} height={40} className="mr-4" />
            <span className="text-white text-2xl font-semibold">StockPulse</span>
          </div>
        </Link>
      </div>
      <div className="flex space-x-4">
        {session ? (
          <>
            <Link href="/portfolio">
              <span className="text-white hover:underline cursor-pointer">Portfolio</span>
            </Link>
            <Link href="/market-analysis">
              <span className="text-white hover:underline cursor-pointer">Market Analysis</span>
            </Link>
            <Link href="/news">
              <span className="text-white hover:underline cursor-pointer">News</span>
            </Link>
            <Link href="/settings">
              <span className="text-white hover:underline cursor-pointer">Settings</span>
            </Link>
            <button onClick={() => signOut()} className="text-white hover:underline">Sign Out</button>
          </>
        ) : (
          <>
            <Link href="/login">
              <span className="text-white hover:underline cursor-pointer">Login</span>
            </Link>
            <Link href="/signup">
              <span className="text-white hover:underline cursor-pointer">Sign Up</span>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
