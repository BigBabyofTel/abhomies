import { create } from 'zustand';
import { User } from './types';

type SessionStore = {
  user: User | null;
  setUser: (user: User) => void;
  deleteUser: () => void;
};

export const useSessionStore = create<SessionStore>((set) => ({
  user: null,
  setUser: (user) => {
    set({ user });
  },
  deleteUser: () => set({ user: undefined }),
}));
