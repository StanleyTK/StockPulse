import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const ProtectedRoute = ({ children }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return; // Prevents effect from running until loading is complete
    if (!session) router.push('/login'); // Redirects to login if no session
  }, [session, status, router]);

  if (status === 'loading') {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader"></div> {/* Consider a CSS spinner or a graphic loader */}
      </div>
    );
  }

  if (session) {
    return children; // Renders children when the session is present
  }

  return null; // Returns null while waiting for session without showing "Loading..."
};

export default ProtectedRoute;
