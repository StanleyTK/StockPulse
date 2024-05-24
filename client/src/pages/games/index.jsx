import ProtectedRoute from '../../components/ProtectedRoute';
import Layout from '../layout';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import gamesList from './components/gameList';

const Game = () => {
  const { data: session } = useSession();

  return (
   // <ProtectedRoute>
      <Layout>
        <div className="grid grid-cols-1 gap-4 my-6 text-center">
          <div className="col-span-1">
            <h1 className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-6 px-60 rounded-lg shadow-lg w-full">
              Welcome, {session?.user?.username || 'user'}
            </h1>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 my-6">
        <div className="col-span-1">
        <Link href="/games/create-game" passHref>
          <div className="bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold py-6 px-4 rounded-lg shadow-lg transform hover:scale-105 transition duration-200 ease-in-out cursor-pointer mb-8">
            Create New Game
          </div>
        </Link>
{/*         
        <Link href="/games/find-games" passHref>
          <div className="bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold py-6 px-4 rounded-lg shadow-lg transform hover:scale-105 transition duration-200 ease-in-out cursor-pointer mb-8">
            Join a Game
          </div>
        </Link>
        
        <Link href="/games/notifications" passHref>
          <div className="bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold py-6 px-4 rounded-lg shadow-lg transform hover:scale-105 transition duration-200 ease-in-out cursor-pointer">
            Game Notifications
          </div>
        </Link> */}
      </div>

          <div className="col-span-3">
            <h3 className="bg-indigo-600 text-white font-bold py-6 px-4 rounded-lg shadow-lg w-full">
              List of the games
            </h3>
            <div className="space-y-4">
              {gamesList.map(game => (
                <div key={game.id} className="bg-gray-900 p-6 rounded-lg shadow-md text-white">
                  <h4 className="font-semibold">{game.name}</h4>
                  <p>Status: {game.status} | Players: {game.players}</p>
                  <p>Returns: {game.returns}</p>
                  <Link href={`/games/${game.id}`} passHref>
                    <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                      View Game
                    </button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Layout>
 // </ProtectedRoute>
  );
};

export default Game;
