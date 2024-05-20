import Link from 'next/link';
import Image from 'next/image';
import { useSession, signOut } from 'next-auth/react';

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-800 shadow-lg">
      <div className="flex items-center">
        <Image src="/Logo.png" alt="StockPulse Logo" width={40} height={40} className="mr-4" />
        <span className="text-white text-2xl font-semibold">StockPulse</span>
      </div>
      <div className="flex space-x-4">
        {session ? (
          <>
            <Link href="/portfolio" className="text-white hover:underline">Portfolio</Link>
            <Link href="/market-analysis" className="text-white hover:underline">Market Analysis</Link>
            <Link href="/news" className="text-white hover:underline">News</Link>
            <button onClick={() => signOut()} className="text-white hover:underline">Sign Out</button>
          </>
        ) : (
          <>
            <Link href="/login" className="text-white hover:underline">Login</Link>
            <Link href="/signup" className="text-white hover:underline">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
