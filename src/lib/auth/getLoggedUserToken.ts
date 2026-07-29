'use server';
import { decode } from 'next-auth/jwt';
import { cookies } from 'next/headers';

export async function getLoggedUserToken() {
  try {
    const encryptedToken =
      (await cookies()).get(`next-auth.session-token`)?.value ||
      (await cookies()).get(`__Secure-next-auth.session-token`)?.value;

    if (!encryptedToken) {
      return null;
    }

    const token = await decode({
      token: encryptedToken,
      secret: process.env.NEXTAUTH_SECRET!,
    });

    return token?.token;
  } catch (_) {
    return null;
  }
}
