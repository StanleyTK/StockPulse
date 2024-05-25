"use client";
import React from 'react';
import Layout from '../layout';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import ProtectedRoute from '../../components/ProtectedRoute';
import GameList from './components/gameList';
const Game = () => {
  const { data: session } = useSession();

  return (
    <ProtectedRoute>
    <Layout>
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="w-full max-w-6xl p-8">
          <div className="grid grid-cols-1 gap-6 mb-12 text-center">
            <div className="col-span-1">
              <h1 className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-6 rounded-lg shadow-lg w-full">
                Welcome, {session?.user?.username || 'User'}
              </h1>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="col-span-1">
              <Link href="/games/create-game" passHref>
                <div className="bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold py-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-200 ease-in-out cursor-pointer">
                  Create New Game
                </div>
              </Link>
            </div>
            <div className="col-span-3">
              <h3 className="bg-indigo-600 text-white font-bold py-6 rounded-lg shadow-lg w-full text-center mb-6">
                List of the Games
              </h3>
              <GameList />
            </div>
          </div>
        </div>
      </div>
    </Layout>
    </ProtectedRoute>
  );
};

export default Game;
