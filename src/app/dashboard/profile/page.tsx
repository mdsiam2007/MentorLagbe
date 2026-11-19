'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import {
  User,
  Phone,
  Mail,
  Upload,
  Sparkles,
  Save,
  CheckCircle2,
} from 'lucide-react';

export default function ProfilePage() {
  const { user, updateLocalUser } = useAuth();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [bio, setBio] = useState('');
  const [image, setImage] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setPhone(user.phone || '');
      setBio(user.bio || '');
      setImage(user.image || '');
    }
  }, [user]);

  // ImgBB Upload via secure backend proxy
  const handleAvatarFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file.');
      return;
    }

    setUploadingImage(true);
    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await api.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (res.data.success && res.data.url) {
        setImage(res.data.url);
        toast.success('Avatar image uploaded successfully to ImgBB!');
      }
    } catch (err: any) {
      toast.error('Failed to upload image. You can also paste an image URL below.');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await api.patch('/auth/profile', {
        name: name.trim(),
        phone: phone.trim(),
        bio: bio.trim(),
        image: image.trim(),
      });

      if (res.data.success) {
        toast.success('Profile updated successfully!');
        updateLocalUser({
          name: name.trim(),
          phone: phone.trim(),
          bio: bio.trim(),
          image: image.trim(),
        });
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to update profile.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-black text-foreground tracking-tight">Account Profile</h1>
        <p className="text-xs text-muted-foreground mt-1">
          Manage your personal details, public bio, and avatar.
        </p>
      </div>

      <Card className="p-6 sm:p-8 border border-border/80 shadow-sm bg-card rounded-3xl">
        <form onSubmit={handleProfileSubmit} className="space-y-6">
          {/* Avatar Upload */}
          <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-border/60">
            <div className="relative h-24 w-24 rounded-full overflow-hidden border-2 border-primary/40 bg-muted shrink-0 shadow-md">
              <img
                src={image || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}
                alt={name}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="space-y-2 text-center sm:text-left">
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <Badge
                  variant={user?.role === 'admin' ? 'destructive' : user?.role === 'tutor' ? 'secondary' : 'outline'}
                  className="capitalize font-bold text-xs"
                >
                  {user?.role} Account
                </Badge>
                {user?.plan === 'pro' && (
                  <Badge variant="pro" className="text-xs">
                    PRO MEMBER
                  </Badge>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <label className="cursor-pointer inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-border bg-muted/60 text-xs font-semibold text-foreground hover:bg-muted transition-colors">
                  <Upload className="h-3.5 w-3.5 text-primary" />
                  {uploadingImage ? 'Uploading...' : 'Upload via ImgBB'}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarFileChange}
                    disabled={uploadingImage}
                    className="hidden"
                  />
                </label>

                <Input
                  type="url"
                  placeholder="Or paste image URL"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  className="max-w-xs h-9 text-xs"
                />
              </div>
            </div>
          </div>

          {/* Name & Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-foreground mb-1.5">
                Full Name
              </label>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-foreground mb-1.5">
                Email Address (Read Only)
              </label>
              <Input
                type="email"
                value={user?.email || ''}
                disabled
                className="opacity-70 cursor-not-allowed bg-muted/40"
              />
            </div>
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-xs font-semibold text-foreground mb-1.5">
              Contact Phone Number
            </label>
            <Input
              type="text"
              placeholder="+880 1700 000000"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          {/* Bio */}
          <div>
            <label className="block text-xs font-semibold text-foreground mb-1.5">
              Bio / Academic Background
            </label>
            <Textarea
              rows={3}
              placeholder="Tell others about your university, subjects of interest, or teaching methodology..."
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>

          <div className="pt-2 flex justify-end">
            <Button type="submit" disabled={saving || uploadingImage} className="font-bold gap-2">
              <Save className="h-4 w-4" />
              {saving ? 'Saving Changes...' : 'Save Profile'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
