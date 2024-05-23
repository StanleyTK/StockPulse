import Link from 'next/link';
import Image from 'next/image';
import { useSession, signOut } from 'next-auth/react';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const { data: session } = useSession();
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
            <Link href="/personal" legacyBehavior>
              <a className="bg-dark-blue hover:bg-deeper-blue text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out shadow-md">
                Personal
              </a>
            </Link>
            <Link href="/competitive" legacyBehavior>
              <a className="bg-dark-blue hover:bg-deeper-blue text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out shadow-md">
                Competitive
              </a>
            </Link>
            <div className="relative">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="text-white hover:underline flex items-center"
              >
                <FontAwesomeIcon icon={faUserCircle} size="2x" className="text-white mr-2" />
                {session.user.name}
              </button>
              {menuOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg py-2 z-50">
                  <Link href="/research" legacyBehavior>
                    <a className="block px-4 py-2 text-gray-800 hover:bg-gray-200 transition duration-300 ease-in-out">
                      Research
                    </a>
                  </Link>
                  <Link href="/settings" legacyBehavior>
                    <a className="block px-4 py-2 text-gray-800 hover:bg-gray-200 transition duration-300 ease-in-out">
                      Settings
                    </a>
                  </Link>
                  <Link href="/profile" legacyBehavior>
                    <a className="block px-4 py-2 text-gray-800 hover:bg-gray-200 transition duration-300 ease-in-out">
                      Profile
                    </a>
                  </Link>
                  <button
                    onClick={() => signOut()}
                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200 transition duration-300 ease-in-out"
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
