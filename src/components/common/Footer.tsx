import React from 'react';
import Link from 'next/link';
import Logo from './Logo';
import { Mail, Phone, MapPin, Github, Linkedin, Facebook } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="border-t border-border bg-card/50 text-foreground transition-colors">
      <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand & Tagline */}
          <div className="space-y-4 md:col-span-1">
            <Logo size="md" />
            <p className="text-sm text-muted-foreground leading-relaxed">
              MentorLagbe is Bangladesh&apos;s most trusted tuition finder and personalized academic
              mentorship platform connecting students with top-rated tutors.
            </p>
            {/* Social Links with new X logo */}
            <div className="flex items-center gap-3 pt-2">
              {/* New X (Twitter) Logo */}
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                className="h-9 w-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary transition-colors"
                aria-label="X (formerly Twitter)"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="h-9 w-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>

              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="h-9 w-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-4 w-4" />
              </a>

              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="h-9 w-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-foreground">
              Explore
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/tuitions" className="hover:text-primary transition-colors">
                  Find Tuition Batches
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-primary transition-colors">
                  Pricing & Pro Upgrade
                </Link>
              </li>
              <li>
                <Link href="/sign-up" className="hover:text-primary transition-colors">
                  Become a Tutor
                </Link>
              </li>
              <li>
                <Link href="/sign-in" className="hover:text-primary transition-colors">
                  Student Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Subjects */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-foreground">
              Top Subjects
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/tuitions?subject=Mathematics" className="hover:text-primary transition-colors">
                  Higher Mathematics
                </Link>
              </li>
              <li>
                <Link href="/tuitions?subject=Physics" className="hover:text-primary transition-colors">
                  HSC & Admission Physics
                </Link>
              </li>
              <li>
                <Link href="/tuitions?subject=Programming" className="hover:text-primary transition-colors">
                  Web & Python Programming
                </Link>
              </li>
              <li>
                <Link href="/tuitions?subject=English" className="hover:text-primary transition-colors">
                  IELTS & Spoken English
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-foreground">
              Contact & Support
            </h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-primary shrink-0" />
                <span>support@mentorlagbe.com</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-primary shrink-0" />
                <span>+880 1700 000000</span>
              </li>
              <li className="flex items-center gap-2.5">
                <MapPin className="h-4 w-4 text-primary shrink-0" />
                <span>Dhaka, Bangladesh</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-border/60 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} MentorLagbe Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/" className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="/" className="hover:text-primary transition-colors">
              Terms of Service
            </Link>
            <Link href="/" className="hover:text-primary transition-colors">
              Security
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
