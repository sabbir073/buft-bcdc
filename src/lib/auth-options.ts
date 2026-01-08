import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { query } from './db';
import { verifyPassword } from './auth';

interface AdminUser {
  id: number;
  username: string;
  email: string;
  password: string;
  full_name: string;
  status: string;
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          throw new Error('Username and password are required');
        }

        try {
          // Fetch user from database
          const users = await query<AdminUser[]>(
            'SELECT id, username, email, password, full_name, status FROM admin_users WHERE username = ? AND status = ?',
            [credentials.username, 'active']
          );

          if (!users || users.length === 0) {
            throw new Error('Invalid credentials');
          }

          const user = users[0];

          // Verify password
          const isValid = await verifyPassword(
            credentials.password,
            user.password
          );

          if (!isValid) {
            throw new Error('Invalid credentials');
          }

          // Update last login
          await query(
            'UPDATE admin_users SET last_login = NOW() WHERE id = ?',
            [user.id]
          );

          // Return user object (password excluded)
          return {
            id: user.id.toString(),
            name: user.full_name,
            email: user.email,
            username: user.username,
          };
        } catch (error) {
          console.error('Authentication error:', error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: '/admin/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = (user as any).username;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        (session.user as any).id = token.id;
        (session.user as any).username = token.username;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
