import Link from 'next/link';
import Image from 'next/image';
import { useSession, signOut } from 'next-auth/react';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const { data: session } = useSession();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-900 shadow-lg">
      <div className="flex items-center space-x-4">
        <Link href="/" legacyBehavior>
          <a className="flex items-center cursor-pointer">
            <Image src="/Logo.png" alt="StockPulse Logo" width={40} height={40} className="mr-4" />
            <span className="text-white text-2xl font-semibold">StockPulse</span>
          </a>
        </Link>
      </div>

      <div className="flex space-x-4 items-center">
        {session ? (
          <>
            <div className="relative">
              <button onClick={() => setMenuOpen(!menuOpen)} className="text-white hover:underline flex items-center">
                <FontAwesomeIcon icon={faUserCircle} size="2x" className="text-white mr-2"/>
                {session.user.name}
              </button>
              {menuOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg py-2">
                  <Link href="/news" legacyBehavior>
                    <a className="block px-4 py-2 text-gray-800 hover:bg-gray-200">News</a>
                  </Link>
                  <Link href="/settings" legacyBehavior>
                    <a className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Settings</a>
                  </Link>
                  <Link href="/personal" legacyBehavior>
                    <a className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Personal</a>
                  </Link>
                  <Link href="/competitive" legacyBehavior>
                    <a className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Competitive</a>
                  </Link>
                  <Link href="/profile" legacyBehavior>
                    <a className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Profile</a>
                  </Link>
                  <button
                    onClick={() => signOut()}
                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <Link href="/login" legacyBehavior>
              <a className="text-white hover:underline cursor-pointer">Login</a>
            </Link>
            <Link href="/signup" legacyBehavior>
              <a className="text-white hover:underline cursor-pointer">Sign Up</a>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
