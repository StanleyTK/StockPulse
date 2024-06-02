import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Layout from '../../layout';
import ProtectedRoute from '../../../components/ProtectedRoute';
import { useSession } from 'next-auth/react';

const GameDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { data: session } = useSession();
  useEffect(() => {
    const fetchGameDetails = async () => {
      if (!id) return;

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/game/${id}/user/${session?.user?.id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setGame(data);
        } else {
          router.push("/error");
        } 
      } catch (error) {
        console.error('Error fetching game details:', error);
        setError('An error occurred while fetching the game details.');
      } finally {
        setLoading(false);
      }
    };

    fetchGameDetails();
  }, [session]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
      </div>
    );
  }

  if (!game) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <Layout>
        <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
          <div className="w-full max-w-4xl p-8">
            <div className="bg-gray-800 p-6 rounded-lg shadow-md">
              <p className="mt-2 text-xl">Game ID: {game.id}</p>
              <p className="mt-2 text-xl">Game Name: {game.name}</p>
              <p className="mt-2 text-xl">Starting Money: ${game.startingMoney}</p>
              <p className="mt-2 text-xl">Game Mode: {game.gameMode === 'p' ? 'Personal' : 'Competitive'}</p>
            </div>
          </div>
        </div>
      </Layout>
    </ProtectedRoute>
  );
};

export default GameDetails;
