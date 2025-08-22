import ky from 'ky';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { AuthResponse } from './lib/types';

export async function middleware(request: NextRequest) {
  const access_token = request.cookies.get('ACCESS_TOKEN');
  const refresh_token = request.cookies.get('REFRESH_TOKEN');

  if (!refresh_token) {
    const url = request.nextUrl.clone();
    url.pathname = '/sign-in';
    const redirect = url.toString();
    return NextResponse.redirect(redirect);
  }

  if (!access_token) {
    try {
      const res = await ky
        .post('http://localhost:8070/refresh', {
          json: {
            refresh_token: refresh_token.value,
          },
        })
        .json<AuthResponse>();

      console.log(res);

      request.cookies.delete('REFRESH_TOKEN');

      const response = NextResponse.next();
      response.cookies.set('ACCESS_TOKEN', res.access_token, {
        maxAge: res.access_token_expires_in,
        path: '/',
        secure: true,
        httpOnly: true,
        sameSite: 'strict',
      });
      response.cookies.set('REFRESH_TOKEN', res.refresh_token, {
        maxAge: res.refresh_token_expires_in,
        path: '/',
        secure: true,
        httpOnly: true,
        sameSite: 'strict',
      });
      return response;
    } catch (error) {
      console.error(error);
    }
  }

  return NextResponse.next();
}
export const config = {
  matcher: ['/'],
};
