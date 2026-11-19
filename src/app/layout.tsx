import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { HeroUIProviderWrapper } from '@/components/providers/HeroUIProviderWrapper';
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
      <head>
        {/* Zero White Flash / Anti-FOUC Blocking Theme Script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('mentorlagbe_theme');
                  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  if (saved === 'dark' || (!saved && prefersDark)) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={`${inter.variable} font-sans min-h-screen flex flex-col antialiased bg-background text-foreground transition-colors duration-200`}>
        <ThemeProvider>
          <HeroUIProviderWrapper>
            <AuthProvider>
              <Navbar />
              <main className="flex-1">{children}</main>
              <ConditionalFooter />
              <Toaster richColors position="top-right" closeButton />
            </AuthProvider>
          </HeroUIProviderWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
