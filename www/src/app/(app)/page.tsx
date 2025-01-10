'use client';
import { useSessionStore } from '@/lib/session-store';

export default function Home() {
  const { user } = useSessionStore();
  return <div>Hello, {user?.name}</div>;
}
