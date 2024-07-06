import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { isUserLoggedIn } from '@/utils/auth';

const withAuth = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();

    useEffect(() => {
      const token = isUserLoggedIn();
      if (!token) {
        router.replace('/login');
      }
    }, []);

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
