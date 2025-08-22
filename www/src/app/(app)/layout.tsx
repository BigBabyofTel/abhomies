import { SessionProvider } from '@/components/session-provider';
import { User } from '@/lib/types';
import ky from 'ky';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import type { ReactNode } from 'react';

async function getSession(): Promise<User | undefined> {
  const cookieStore = await cookies();
  const accesToken = cookieStore.get('ACCESS_TOKEN');

  if (!accesToken) {
    redirect('/sign-in');
  }

  try {
    const res = await ky
      .get('http://abhomies-backend-1:8070/session', {
        headers: {
          Authorization: `Bearer ${accesToken.value}`,
        },
      })
      .json<User>();

    return res;
  } catch (error) {
    console.error('Session error:', error);
    // Clear invalid cookies
    cookieStore.delete('ACCESS_TOKEN');
    cookieStore.delete('REFRESH_TOKEN');
    // If token is invalid/expired, redirect to sign-in
    redirect('/sign-in');
  }
}
export default async function AppLayout({ children }: { children: ReactNode }) {
  const user = await getSession();
  console.log(user);
  
  // This should never happen because getSession redirects if no user
  if (!user) {
    redirect('/sign-in');
  }
  
  return <SessionProvider user={user}>{children}</SessionProvider>;
}
