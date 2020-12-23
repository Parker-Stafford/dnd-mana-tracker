import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

const options = {
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Providers.Facebook({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
  ],
  database: process.env.DB_URI,
};

export default (req, res) => NextAuth(req, res, options);
