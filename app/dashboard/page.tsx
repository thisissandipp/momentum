'use client';

import { useEffect, useState } from 'react';
import { User } from '@/db/types';
import axios from 'axios';

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const currentUser = async () => {
      try {
        const response = await axios.get('/api/user');
        setUser(response.data.user);
      } catch (error) {
        console.error('Failed to load user', error);
      }
    };

    currentUser();
  }, []);

  return (
    <div className="flex justify-center py-56 md:py-64 lg:py-72">
      <h2 className="text-center text-lg font-semibold">
        Welcome to dashboard, {user ? user.displayName.split(' ')[0] : 'boss'}!
      </h2>
    </div>
  );
}
