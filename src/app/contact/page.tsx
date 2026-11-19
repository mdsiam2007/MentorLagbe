'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  Sparkles,
  MessageSquare,
} from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'student',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill in your name, email, and message.');
      return;
    }
    setSubmitted(true);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* 1. Header Banner */}
      <section className="bg-gradient-to-b from-primary/10 via-background to-background py-16 sm:py-20 border-b border-border/60">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="secondary" className="mb-3 px-3 py-1">
            <MessageSquare className="h-3.5 w-3.5 mr-1 text-primary" /> 24/7 Academic Support Desk
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-black text-foreground tracking-tight">
            We&apos;re Here to <span className="text-primary underline decoration-primary/30">Help You</span>
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto mt-3">
            Have questions about finding a tutor, tuition applications, or Pro subscriptions? Get in touch with our Dhaka team.
          </p>
        </div>
      </section>

      {/* 2. Contact Grid */}
      <section className="py-16 sm:py-20 flex-1">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Contact Information */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-foreground">Contact Information</h2>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                  Reach out directly via phone or email for quick assistance.
                </p>
              </div>

              <div className="space-y-4">
                <Card className="p-5 rounded-2xl border border-border/80 bg-card flex items-start gap-4">
                  <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-foreground">Student & Tutor Hotline</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">+880 1700 000000</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">Available 9:00 AM – 10:00 PM (Daily)</p>
                  </div>
                </Card>

                <Card className="p-5 rounded-2xl border border-border/80 bg-card flex items-start gap-4">
                  <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-foreground">Official Email</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">support@mentorlagbe.com</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">Typically replies within 2 hours</p>
                  </div>
                </Card>

                <Card className="p-5 rounded-2xl border border-border/80 bg-card flex items-start gap-4">
                  <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-foreground">Dhaka Headquarters</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      House #42, Road #7/A, Dhanmondi, Dhaka - 1209, Bangladesh
                    </p>
                  </div>
                </Card>
              </div>

              {/* Safety Quick Link */}
              <Card className="p-5 rounded-2xl border border-emerald-500/20 bg-emerald-500/5">
                <h4 className="text-xs font-bold text-emerald-700 dark:text-emerald-400">
                  Trust & Security Notice
                </h4>
                <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed">
                  MentorLagbe admin will never ask for your account password or Stripe credit card details over phone or email.
                </p>
              </Card>
            </div>

            {/* Right Form */}
            <div className="lg:col-span-7">
              <Card className="p-8 sm:p-10 rounded-3xl border border-border bg-card shadow-lg">
                {submitted ? (
                  <div className="text-center py-12 space-y-4">
                    <div className="h-16 w-16 bg-emerald-500/10 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle2 className="h-8 w-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground">Message Sent Successfully!</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
                      Thank you for reaching out, {formData.name}. Our support team has received your query and will reply to <span className="font-semibold text-foreground">{formData.email}</span> shortly.
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({
                          name: '',
                          email: '',
                          phone: '',
                          role: 'student',
                          subject: '',
                          message: '',
                        });
                      }}
                      className="mt-4"
                    >
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <h3 className="text-xl font-bold text-foreground">Send Us a Message</h3>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Fill in the details below and we will get back to you promptly.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-foreground">Your Full Name *</label>
                        <Input
                          placeholder="e.g. Tanvir Hasan"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          required
                          className="rounded-xl text-xs"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-foreground">Email Address *</label>
                        <Input
                          type="email"
                          placeholder="e.g. tanvir@gmail.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          required
                          className="rounded-xl text-xs"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-foreground">Phone Number</label>
                        <Input
                          placeholder="e.g. 01700-000000"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="rounded-xl text-xs"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-foreground">I am a</label>
                        <select
                          value={formData.role}
                          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                          className="w-full h-10 px-3 rounded-xl border border-input bg-background text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                        >
                          <option value="student">Student / Parent</option>
                          <option value="tutor">Tutor / Instructor</option>
                          <option value="other">General Inquirer</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-foreground">Subject</label>
                      <Input
                        placeholder="e.g. Question about tuition verification or Pro plan"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="rounded-xl text-xs"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-foreground">Message *</label>
                      <Textarea
                        rows={4}
                        placeholder="Write your question or request in detail..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        required
                        className="rounded-xl text-xs"
                      />
                    </div>

                    <Button type="submit" className="w-full font-bold gap-2 py-6 text-sm">
                      <Send className="h-4 w-4" />
                      Submit Message
                    </Button>
                  </form>
                )}
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
