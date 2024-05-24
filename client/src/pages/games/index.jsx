import ProtectedRoute from '../../components/ProtectedRoute';
import Layout from '../layout';
import AccountBalance from './components/AccountBalance';
import { useSession } from 'next-auth/react';

const Game = () => {
  const { data: session } = useSession();

  return (
    <ProtectedRoute>
      <Layout>
        <h1 className="text-2xl font-bold text-center my-4">Game</h1>
        <div className="text-center my-4">
          <h2 className="text-lg font-semibold">Hello, {session?.user?.id || 'null'}!</h2>
        </div>
        <AccountBalance balance={10000} />
      </Layout>
    </ProtectedRoute>
  );
};

export default Game;
