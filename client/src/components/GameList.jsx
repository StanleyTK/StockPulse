import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const GameList = () => {
  const { data: session } = useSession();
  const [gamesList, setGamesList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchGames = async () => {
      if (!session?.user?.id) return;

      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/game/user/${session.user.id}`);
        if (res.ok) {
          const data = await res.json();
          setGamesList(data);
        } else {
          const errorData = await res.text();
          throw new Error('Failed to fetch games: ' + errorData);
        }
      } catch (error) {
        console.error('Error during fetch:', error);
      }
    };

    fetchGames();
  }, [session]);

  const handleDelete = async (gameId) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/game`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: gameId }),
      });
      if (res.ok) {
        alert("Game deleted successfully.");
        setGamesList(gamesList.filter(game => game.id !== gameId));
        setCurrentIndex(prevIndex => Math.max(prevIndex - 1, 0));
      } else {
        const errorData = await res.text();
        throw new Error('Failed to delete game: ' + errorData);
      }
    } catch (error) {
      console.error('Error during delete:', error);
      alert('Error during delete: ' + error.message);
    }
  };

  const handlePrev = () => {
    setCurrentIndex(prevIndex => (prevIndex > 0 ? prevIndex - 1 : gamesList.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prevIndex => (prevIndex < gamesList.length - 1 ? prevIndex + 1 : 0));
  };

  const currentGame = gamesList[currentIndex];

  return (
    <div className="space-y-6">
      {gamesList.length === 0 ? (
        <p className="text-gray-400">No games available.</p>
      ) : (
        <div className="relative">
          <div className="bg-gray-800 p-6 rounded-lg shadow-md text-white transition duration-300 ease-in-out">
            <h4 className="font-semibold text-2xl mb-2">{currentGame.name}</h4>
            <p className="mt-2">Starting Money: ${currentGame.startingMoney.toLocaleString()}</p>
            <p className="mt-2">Game Mode: {currentGame.gameMode === 'p' ? 'Personal' : 'Competitive'}</p>
            <div className="flex justify-center space-x-4 mt-4">
              <Link href={`/games/${currentGame.id}`} passHref>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200 ease-in-out">
                  View Game
                </button>
              </Link>
              <button
                onClick={() => handleDelete(currentGame.id)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200 ease-in-out"
              >
                Delete Game
              </button>
            </div>
          </div>
          {currentIndex > 0 && (
            <div className="absolute top-1/2 left-0 transform -translate-y-1/2">
              <button
                onClick={handlePrev}
                className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out"
              >
                <FontAwesomeIcon icon={faArrowLeft} />
              </button>
            </div>
          )}
          {currentIndex < gamesList.length - 1 && (
            <div className="absolute top-1/2 right-0 transform -translate-y-1/2">
              <button
                onClick={handleNext}
                className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out"
              >
                <FontAwesomeIcon icon={faArrowRight} />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GameList;
