# MentorLagbe (Client)

Smart Tuition & Academic Mentorship Platform frontend built with Next.js 15, TypeScript, Tailwind CSS, shadcn/ui, GSAP, and DaisyUI Skeleton.

## 🚀 Purpose
MentorLagbe bridges the gap between qualified academic tutors and students across Bangladesh. It provides seamless tuition search, class level and mode filtering, role-restricted application workflows, Stripe Pro upgrades, and comprehensive dashboards for Students, Tutors, and Admins.

## 🌟 Key Features
- **Modern Responsive Design**: Flat, eye-pleasing aesthetic with unified global CSS color variables in `globals.css`.
- **GSAP Animations**: Smooth entrance timeline, floating badges, and micro-interactions.
- **DaisyUI Skeleton**: Modern loading skeleton placeholders on browse listings, tables, and statistics.
- **Server-Side Search & Filter**: Real-time keyword search, subject, class level, and tuition mode filters with server pagination.
- **Role-Restricted Tuition Booking**: Protected application modal accessible exclusively to Student accounts.
- **Role-Based Dashboards**: Collapsible responsive sidebar layout with dedicated portals for Students, Tutors, and Admins.
- **Stripe Checkout & Verification**: Seamless Pro plan upgrades for Students ($10) and Tutors ($15).
- **ImgBB Direct Upload**: Secure image uploads for tutor banners and profile avatars via backend proxy.
- **Error Handling**: Custom 404 Not Found and Error Boundary pages.

## 🔑 Test Credentials
| Role | Email | Password |
|---|---|---|
| **Admin** | `admin@mentorlagbe.com` | `Admin@12345` |
| **Tutor** | `tutor.rahim@mentorlagbe.com` | `Tutor@12345` |
| **Student** | `student.siam@mentorlagbe.com` | `Student@12345` |

## 📦 Packages Used
- `next`: ^15.1.7 (App Router, Server Components)
- `react` & `react-dom`: ^19.0.0
- `tailwindcss`: ^3.4.17
- `daisyui`: ^4.12.24 (Skeleton loaders)
- `gsap`: ^3.12.7 (GreenSock Animation Platform)
- `lucide-react`: Modern icon set (including new X brand icon)
- `sonner`: Toast notifications
- `axios`: REST client with interceptors
- `canvas-confetti`: Celebration animation on Pro upgrade
- `@stripe/stripe-js`: Stripe Client SDK
- `clsx` & `tailwind-merge`: Class merging utilities

## 🛠️ Local Development
```bash
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.
