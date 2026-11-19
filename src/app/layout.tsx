import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { Toaster } from 'sonner';
import Navbar from '@/components/common/Navbar';
import ConditionalFooter from '@/components/common/ConditionalFooter';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'MentorLagbe - Smart Tuition & Academic Mentorship Platform',
  description:
    'Find verified tutors by subject, class level, and mode. Secure tuition booking, role-based dashboards, and interactive learning in Bangladesh.',
  icons: {
    icon: '/logo-icon.jpg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans min-h-screen flex flex-col antialiased bg-background text-foreground transition-colors duration-200`}>
        <ThemeProvider>
          <AuthProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <ConditionalFooter />
            <Toaster richColors position="top-right" closeButton />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
