"use client";
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

const GameList = () => {
  const { data: session } = useSession();
  const [gamesList, setGamesList] = useState([]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/game`);
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
  }, []);

  const handleDelete = async (gameId) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/game`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: gameId,
        }),
      });
      if (res.ok) {
        alert("Game deleted successfully.");
        setGamesList(gamesList.filter(game => game.id !== gameId));
      } else {
        const errorData = await res.text();
        throw new Error('Failed to delete game: ' + errorData);
      }
    } catch (error) {
      console.error('Error during delete:', error);
      alert('Error during delete: ' + error.message);
    }
  };

  return (
    <div className="space-y-6">
      {gamesList.length === 0 ? (
        <p className="text-gray-400">No games available.</p>
      ) : (
        gamesList.map(game => (
          <div key={game.id} className="bg-gray-800 p-6 rounded-lg shadow-md text-white">
            <h4 className="font-semibold text-xl">Name: {game.name}</h4>
            <p className="mt-2">Starting Money: ${game.startingMoney.toLocaleString()}</p>
            <p className="mt-1">Game Mode: {game.gameMode === 'p' ? 'Personal' : 'Competitive'}</p>
            <div className="flex justify-center space-x-2 mt-4">
              <Link href={`/games/${game.id}`} passHref>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200 ease-in-out">
                  View Game
                </button>
              </Link>
              <button
                onClick={() => handleDelete(game.id)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200 ease-in-out"
              >
                Delete Game
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default GameList;
