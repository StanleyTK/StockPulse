// pages/portfolio.jsx
import ProtectedRoute from '../../components/ProtectedRoute';
import Layout from '../layout';
import AccountBalance from './components/AccountBalance';

const Portfolio = ({ session }) => {
  return (
    <ProtectedRoute>
      <Layout>
        <h1 className="text-2xl font-bold text-center my-4">Personal Portfolio</h1>
        <div className="text-center my-4">
          <h2 className="text-lg font-semibold">Hello, Guest!</h2>
        </div>
        <AccountBalance balance={10000} />
      </Layout>
    </ProtectedRoute>
  );
};

export default Portfolio;
