import { NextAuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { jwtDecode } from 'jwt-decode';

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: '/login',
  },

  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: {},
        password: {},
        code: {},
      },

      authorize: async (credentials) => {
        const res = await fetch(`${process.env.API_BASEURL}/auth/signin`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
        });

        const payload = await res.json();
        if (!res.ok) throw new Error(payload.message || "can't login for now");

        if (payload.require2FA) {
          throw new Error('2FA_REQUIRED');
        } else {
          const decodedToken: { id: string } = jwtDecode(payload.token);

          return {
            id: decodedToken.id,
            user: payload.user,
            token: payload.token,
          };
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user.user;
        token.token = user.token;
      }
      return token;
    },

    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
  },
};
