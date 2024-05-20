import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Layout = ({ children }) => {
  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col justify-between">
      <Navbar />
      <div className="flex flex-col items-center justify-center flex-grow text-center p-4">
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
