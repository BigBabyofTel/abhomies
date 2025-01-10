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
    const res = ky
      .get('http://localhost:8070/session', {
        headers: {
          Authorization: `Bearer ${accesToken.value}`,
        },
      })
      .json<User>();

    return res;
  } catch (error) {
    console.error(error);
  }
}
export default async function AppLayout({ children }: { children: ReactNode }) {
  const user = await getSession();
  console.log(user);
  return <SessionProvider user={user!}>{children}</SessionProvider>;
}
