'use client';

import { useUserStore } from '@/providers/user-store-provider';
import { useEffect } from 'react';
import { User } from '@/types';
import axios from 'axios';

export const UserInitializer = () => {
  const { setUser, status, setStatus } = useUserStore((store) => store);

  useEffect(() => {
    const currentUser = async () => {
      setStatus('loading');
      try {
        const response = await axios.get('/api/user');
        setUser(response.data.user satisfies User);
        setStatus('success');
      } catch (error) {
        console.error('Failed to load user', error);
        setStatus('failed');
      }
    };

    if (status !== 'loading' && status !== 'success') {
      currentUser();
    }
  }, [setStatus, setUser, status]);

  return <></>;
};
