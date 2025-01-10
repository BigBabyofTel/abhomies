'use server';

import ky from 'ky';
import { AuthResponse } from './types';
import { SignInForm } from './validators';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function signIn(data: SignInForm) {
  const res = await ky
    .post('http://localhost:8070/login', {
      json: data,
    })
    .json<AuthResponse>();

  const cookieStore = await cookies();
  cookieStore.set('ACCESS_TOKEN', res.access_token, {
    maxAge: res.access_token_expires_in,
    path: '/',
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
  cookieStore.set('REFRESH_TOKEN', res.refresh_token, {
    maxAge: res.refresh_token_expires_in,
    path: '/',
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });

  redirect('/');
}
