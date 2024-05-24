import React, { useState } from 'react';
import Layout from '../../layout';
import ProtectedRoute from '../../../components/ProtectedRoute';

const CreateGame = () => {
  const [gameName, setGameName] = useState('');
  const [startingMoney, setStartingMoney] = useState('');
  const [gameType, setGameType] = useState('personal');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (startingMoney < 1000 || startingMoney > 1000000) {
      alert('Starting Money should be between 1,000 and 1,000,000');
      return;
    }

    const gameData = {
      gameName,
      startingMoney,
      gameType,
    };

    // Make the API call here
    console.log('Submitting game data:', gameData);

    // Reset form
    setGameName('');
    setStartingMoney('');
    setGameType('personal');
  };

  return (
   // <ProtectedRoute>
    <Layout>
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="w-full max-w-md bg-white p-8 shadow-lg rounded-lg">
          <h1 className="text-2xl font-bold text-center mb-6 text-gray-900">Create Game</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="gameName">
                Game Name
              </label>
              <input
                id="gameName"
                type="text"
                value={gameName}
                onChange={(e) => setGameName(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="startingMoney">
                Starting Money
              </label>
              <input
                id="startingMoney"
                type="number"
                value={startingMoney}
                onChange={(e) => setStartingMoney(e.target.value)}
                min="1000"
                max="1000000"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="gameType">
                Game Type
              </label>
              <select
                id="gameType"
                value={gameType}
                onChange={(e) => setGameType(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="personal">Personal</option>
                <option value="competitive" disabled>
                  Competitive
                </option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Create Game
            </button>
          </form>
        </div>
      </div>
    </Layout>
   //</ProtectedRoute>
  );
};

export default CreateGame;
