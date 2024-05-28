import { useRouter } from 'next/router';
import Layout from '../../layout';
import ProtectedRoute from '../../../components/ProtectedRoute';
const GameDetails = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <ProtectedRoute>
        <Layout>
        <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
            <div className="w-full max-w-4xl p-8">
            <div className="bg-gray-800 p-6 rounded-lg shadow-md">
                <p className="mt-2 text-xl">game id: {id}</p>

            </div>
            </div>
        </div>
        </Layout>
    </ProtectedRoute>
  );
};

export default GameDetails;
