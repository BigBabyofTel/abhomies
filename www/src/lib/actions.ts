'use server';

import ky from 'ky';
import { AuthResponse } from './types';
import { SignInForm } from './validators';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function signIn(data: SignInForm) {
  try {
    const res = await ky
      .post('http://abhomies-backend-1:8070/login', {
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
  } catch (error) {
    // Handle HTTP errors (400, 401, etc.)
    if (error instanceof Error && 'response' in error) {
      const httpError = error as any;
      if (httpError.response) {
        const errorData = await httpError.response.json();
        throw new Error(errorData.error || 'Authentication failed');
      }
    }
    // Re-throw other errors
    throw error;
  }
}
