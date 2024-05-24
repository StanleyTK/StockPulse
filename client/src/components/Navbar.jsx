import Link from 'next/link';
import Image from 'next/image';
import { useSession, signOut } from 'next-auth/react';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';

const Navbar = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    const value = e.target.value;
    if (value.length <= 5) {
      setSearchQuery(value);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim().length > 0) {
      router.push(`/research?query=${searchQuery}`);
    }
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-grey-900 shadow-lg">
      <div className="flex items-center space-x-4">
        <Link href="/" legacyBehavior>
          <a className="flex items-center cursor-pointer">
            <Image src="/Logo.png" alt="StockPulse Logo" width={40} height={40} className="mr-4" />
            <span className="text-white text-2xl font-semibold">StockPulse</span>
          </a>
        </Link>
      </div>

      {session ? (
      <form onSubmit={handleSearchSubmit} className="flex items-center bg-gray-800 rounded-full overflow-hidden shadow-md">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search for a stock ticker..."
          className="px-4 py-2 w-72 text-white bg-gray-800 focus:outline-none"
        />
        <button type="submit" className="px-4 py-2 bg-gray-700 text-white font-bold hover:bg-gray-600 transition duration-300">Search</button>
      </form>
      ) : null}
 

      <div className="flex space-x-4 items-center">
        {session ? (
          <>
            <Link href="/games" legacyBehavior>
              <a className="bg-dark-black hover:bg-deeper-black text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out shadow-md">
                Games
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
                <div className="absolute right-0 mt-2 w-64 bg-gray-900 rounded-md shadow-lg py-2 z-50">
                  <Link href="/settings" legacyBehavior>
                    <a className="block px-4 py-2 text-gray-300 hover:bg-gray-700 transition duration-300 ease-in-out">
                      Settings
                    </a>
                  </Link>
                  <Link href="/profile" legacyBehavior>
                    <a className="block px-4 py-2 text-gray-300 hover:bg-gray-700 transition duration-300 ease-in-out">
                      Profile
                    </a>
                  </Link>
                  <button
                    onClick={() => signOut()}
                    className="block w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-700 transition duration-300 ease-in-out"
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
