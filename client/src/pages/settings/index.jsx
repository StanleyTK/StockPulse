import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faMoon,
  faSun,
  faBell,
  faServer,
  faGlobe,
  faHeadphones,
  faRightToBracket,
  faDeleteLeft,
} from '@fortawesome/free-solid-svg-icons';
import ProtectedRoute from '../../components/ProtectedRoute';
import Layout from '../layout';
import Option from './components/Options';
import NotificationButton from './components/Notifications';

const Settings = () => {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', newTheme);
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <ProtectedRoute>
      <Layout>
        <div className="container mx-auto p-8">
          <div className="flex flex-col items-center mb-12">
            <h1 className="text-3xl font-semibold mb-8">Settings</h1>
          </div>
          <div className="space-y-6 w-full max-w-2xl mx-auto">
            <Option
              icon={faUser}
              header="Account"
              context="Privacy, security, change email or number"
              link="/settings/account"
            />
             <Option
              icon={faDeleteLeft}
              header="Delete Account"
              context="Delete your account"
              link="/delete"
            />
          </div>
        </div>
      </Layout>
    </ProtectedRoute>
  );
};

export default Settings;
