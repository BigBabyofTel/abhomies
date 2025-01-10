'use client';

import { User } from '@/lib/types';
import { useSessionStore } from '@/lib/session-store';
import { ReactNode, useEffect } from 'react';

export function SessionProvider({
  user,
  children,
}: {
  user: User;
  children: ReactNode;
}) {
  const { setUser } = useSessionStore();

  useEffect(() => {
    setUser(user);
  }, [user, setUser]);

  return <> {children}</>;
}
