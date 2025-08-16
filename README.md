# AI Newsletter Generator SaaS

Personalized & Smart newsletters powered by AI. Curate your news experience with favorite topics and flexible delivery schedules.

## 🌐 Live Demo

🔗 **[ai-newsletter-saas.vercel.app](https://ai-newsletter-saas.vercel.app)**

---

## Table of Contents

- [Features](#features)
- [Screenshots](#screenshots)
- [Getting Started](#getting-started)
- [Tech Stack](#tech-stack)
- [Usage](#usage)
- [Configuration](#configuration)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- 📰 Personalized newsletter generation based on user-selected interests
- 📅 Flexible delivery schedules (daily, weekly, bi-weekly)
- ✉️ Automated email delivery
- ⚡ Modern UI with Next.js and Tailwind CSS
- 🔒 Authentication and user management
- 🦾 AI-powered news summarization
- ⏱️ Scheduled jobs with [Inngest](https://www.inngest.com/)
- 📊 Dashboard for managing preferences

---

## Screenshots

### Inngest Dev Server Run Trace
<img width="1920" height="879" alt="ai-saas (3)" src="https://github.com/user-attachments/assets/a6fd6706-aa8f-4e09-a6c0-330122e8e722" />

### Personalize Newsletter Preferences
<img width="1920" height="874" alt="ai-saas (2)" src="https://github.com/user-attachments/assets/3de19162-31dc-440e-acd4-b4ac08f27cef" />

### Newsletter Dashboard
<img width="1920" height="871" alt="ai-saas (1)" src="https://github.com/user-attachments/assets/f6b05093-dd2e-44d1-a07b-24fc780a63f3" />

---

## Getting Started

First, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

You can start editing the page by modifying [`app/page.tsx`](app/page.tsx). The page auto-updates as you edit the file.

---

## Tech Stack

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Inngest](https://www.inngest.com/) (for scheduling and event-driven workflows)
- [Supabase](https://supabase.com/) (authentication & database)
- [Resend](https://resend.com/) (email delivery)

---

## Usage

1. **Sign Up / Login:** Authenticate with your email.
2. **Set Preferences:** Choose your interests and delivery schedule.
3. **Dashboard:** View and update your preferences, subscribe/unsubscribe.
4. **Receive Newsletters:** Get curated news delivered to your inbox as per your schedule.

---

## Configuration

- Copy `.env.example` to `.env` and fill in required environment variables.
- Configure Supabase, Resend, and Inngest credentials as needed.

---

## Deployment

The easiest way to deploy your Next.js app is to use [Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

See [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

---

## 📺 Tutorial

This project was built following this comprehensive tutorial:

[![Build AI Newsletter Generator SaaS](https://img.shields.io/badge/YouTube-Tutorial-red?style=for-the-badge&logo=youtube)](https://www.youtube.com/watch?v=1aZRT2cs7u0)

**[Build AI Newsletter Generator SaaS - Full Stack Tutorial](https://www.youtube.com/watch?v=1aZRT2cs7u0)**

---

## Contributing

Contributions are welcome! Please open issues and submit pull requests for improvements or bug fixes.

