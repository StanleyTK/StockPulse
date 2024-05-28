"use client";
import React from 'react';
import Layout from '../layout';
import { useSession } from 'next-auth/react';
import ProtectedRoute from '../../components/ProtectedRoute';
import Link from 'next/link';
import GameList from './components/GameList';

const Game = () => {
  const { data: session } = useSession();

  return (
    <ProtectedRoute>
      <Layout>
        <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
          <div className="w-full max-w-6xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="col-span-1">
                <Link href="/games/create-game" passHref>
                  <div className="w-5/4 bg-gray-800 text-white font-bold py-6 rounded-lg shadow-lg cursor-pointer text-center transition-transform duration-200 ease-in-out transform hover:scale-105 mx-auto">
                    Create New Game
                  </div>
                </Link>
              </div>
              <div className="col-span-3">
                <h3 className="bg-gray-800 text-white font-bold py-6 rounded-lg shadow-lg text-center mb-6">
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
