# AI Clipper Frontend

This is the **frontend** for the AI Clipper project, built with **Next.js**, **TypeScript**, **Tailwind CSS**, and **Prisma**.  
It provides a UI for uploading, processing, and managing video clips, integrating with an AI-powered backend and AWS S3 for storage.

---

## 🚀 Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (with App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + `tailwind-merge` + `tw-animate-css`
- **Forms**: React Hook Form + Zod
- **Auth**: NextAuth.js with Prisma Adapter
- **Database ORM**: Prisma
- **Storage**: AWS S3
- **UI Components**: Radix UI + ShadCN
- **Icons**: Lucide React
- **Animations**: Motion
- **Background Jobs**: Inngest
- **Notifications**: Sonner

---

## 📂 Project Structure

```
ai-clipper-frontend/
│── .next/ # Next.js build output (ignored in git)
│── node_modules/ # Dependencies (ignored in git)
│── prisma/ # Prisma schema & migrations
│── public/ # Static assets
│── src/
│ ├── app/ # App router pages & layouts
│ ├── components/ # Reusable UI components
│ ├── lib/ # Utility functions & helpers
│ ├── schemas/ # Zod validation schemas
│ ├── server/ # Server-side logic
│ ├── styles/ # Global styles
│ └── actions/ # Server actions
│── .env # Environment variables (not committed)
│── package.json
│── tsconfig.json
│── README.md
```


---

## ⚙️ Setup & Installation

### 1. Clone the repository
```bash
git clone https://github.com/yogeshsinghchilwal/ai-video-clipper.git
cd ai-clipper-frontend

# Using npm
npm install

# Or using pnpm
pnpm install
```
### 3. Setup environment variables
```
AUTH_SECRET="your-auth-secret"
NODE_ENV="development"

DATABASE_URL="postgresql://user:password@host:port/db"

AWS_ACCESS_KEY_ID="your-aws-access-key"
AWS_SECRET_ACCESS_KEY="your-aws-secret-key"
AWS_REGION="ap-south-1"

S3_BUCKET_NAME="your-s3-bucket-name"

PROCESS_VIDEO_ENDPOINT="http://your-backend-endpoint/api/process"
PROCESS_VIDEO_ENDPOINT_AUTH="your-backend-auth-token"
```
### 4. Setup the database
```
npx prisma migrate dev
```

### 5. Run the development server
```
npm run dev
```

The app will be available at:
👉 http://localhost:3000