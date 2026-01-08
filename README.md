# BCDC Website - Admin Dashboard

> Official website and admin dashboard for BUFT Career Development Club (BCDC)

Built with Next.js 16, TypeScript, Tailwind CSS, MySQL, and NextAuth.

---

## 🎯 Project Overview

This is a comprehensive admin dashboard system for managing the BCDC website content, including:

- ✅ **User Management** - Admin user CRUD operations
- ✅ **Membership Management** - Handle BCDC membership applications
- ✅ **Activities Management** - Manage club events and activities
- ✅ **Executive Board** - Manage board categories and members
- ✅ **Career Resources** - Job posts, CV templates, interview tips, career guidelines
- ✅ **Success Stories** - Member testimonials and achievements
- ✅ **File Management** - FTP integration for image/file uploads
- ✅ **Email Notifications** - SMTP integration for automated emails

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- MySQL database (XAMPP, WAMP, or cPanel)
- SMTP account (Gmail recommended)
- FTP access (for file uploads)

### Installation

```bash
# Clone or download the project
cd bcdc-website

# Install dependencies (already done)
npm install

# Configure environment variables
# .env file already created - update with your credentials

# Import database schema
# Open phpMyAdmin and import: database/schema.sql

# Run development server
npm run dev

# Open browser
http://localhost:3000
```

### First Login

```
URL: http://localhost:3000/admin/login
Username: admin
Password: admin123
```

⚠️ **Change default password after first login!**

---

## 📚 Documentation

| Document | Purpose | Start Here |
|----------|---------|-----------|
| **[QUICK_START.md](QUICK_START.md)** | Get running in 10 minutes | ⚡ **START HERE** |
| **[SETUP_CHECKLIST.md](SETUP_CHECKLIST.md)** | Step-by-step setup guide | 📝 Detailed setup |
| **[ENVIRONMENT_SETUP_GUIDE.md](ENVIRONMENT_SETUP_GUIDE.md)** | Complete environment config | 🔧 Configuration help |
| **[IMPLEMENTATION_GUIDE.md](IMPLEMENTATION_GUIDE.md)** | How to build dashboard | 📚 Development guide |
| **[PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)** | Project overview | 📊 Full documentation |

**👉 Start here:** [QUICK_START.md](QUICK_START.md)

---

## 🧪 Testing Your Setup

### Test Database Connection
```bash
# Visit in browser or use curl
http://localhost:3000/api/test-db
```

### Test Email Connection
```bash
http://localhost:3000/api/test-email
```

### Send Test Email
```bash
curl -X POST http://localhost:3000/api/test-email \
  -H "Content-Type: application/json" \
  -d '{"to":"your-email@example.com"}'
```

### Test FTP Connection
```bash
http://localhost:3000/api/test-ftp
```

---

## 📦 Database Schema

**12 Tables Created:**
- `admin_users` - Admin authentication (1 default user)
- `membership_submissions` - BCDC membership forms
- `executive_board_categories` - Board categories (3 default)
- `executive_board_members` - Individual board members
- `activities` - Club events
- `activity_images` - Event photos
- `job_posts` - Job opportunities
- `job_application_submissions` - Job applications
- `cv_templates` - Downloadable CVs
- `interview_tips` - Interview tips
- `career_guidelines` - Career guidance
- `success_stories` - Member testimonials

**Import:** `database/schema.sql` via phpMyAdmin

---

## 🔐 Default Credentials

```
Username: admin
Password: admin123
```

⚠️ **IMPORTANT:** Change this password after creating user management!

---

## ✅ What's Complete

- [x] Database schema (12 tables)
- [x] MySQL connection pooling
- [x] NextAuth authentication
- [x] Password hashing (bcrypt)
- [x] SMTP email integration
- [x] FTP file upload utilities
- [x] Admin login page
- [x] Route protection middleware
- [x] Test endpoints (DB, Email, FTP)
- [x] Complete documentation

---

## ⏳ What's Next

Follow [IMPLEMENTATION_GUIDE.md](IMPLEMENTATION_GUIDE.md) to build:

1. Dashboard layout with sidebar
2. User management CRUD
3. Membership submissions management
4. Activities CRUD with image upload
5. Executive board management
6. Career resources CRUD
7. Success stories CRUD
8. Email templates
9. Data migration
10. Frontend API integration

---

## 🛠️ Tech Stack

- **Frontend**: Next.js 16, TypeScript, Tailwind CSS
- **Backend**: MySQL, NextAuth, Nodemailer
- **File Storage**: FTP (cPanel)
- **Security**: bcrypt, JWT, parameterized queries

---

## 📁 Key Files

```
bcdc-website/
├── database/schema.sql          # MySQL schema
├── .env                         # Your configuration (update this!)
├── src/lib/
│   ├── db.ts                    # Database connection
│   ├── auth.ts                  # Password hashing
│   ├── auth-options.ts          # NextAuth config
│   ├── email.ts                 # Email sending
│   └── ftp.ts                   # FTP uploads
├── src/app/admin/login/         # Login page ✅
├── src/app/api/test-*/          # Test endpoints ✅
└── Documentation files          # 5 complete guides
```

---

## 🚨 Troubleshooting

| Issue | Solution |
|-------|----------|
| Database connection failed | Check MySQL running, verify .env credentials |
| Login not working | Clear cookies, check NEXTAUTH_SECRET is set |
| Email not sending | Use Gmail App Password (not regular password) |
| FTP upload failed | Test with FileZilla, verify upload path exists |
| Port 3000 in use | Run: `npx kill-port 3000` |

**See:** [SETUP_CHECKLIST.md](SETUP_CHECKLIST.md) → "Troubleshooting" for detailed fixes

---

## 📞 Need Help?

1. **Quick Setup**: [QUICK_START.md](QUICK_START.md)
2. **Configuration Issues**: [ENVIRONMENT_SETUP_GUIDE.md](ENVIRONMENT_SETUP_GUIDE.md)
3. **Development Questions**: [IMPLEMENTATION_GUIDE.md](IMPLEMENTATION_GUIDE.md)
4. Check browser console (F12) for errors
5. Check terminal for server error messages

---

## 🎓 About BCDC

BUFT Career Development Club (BCDC) is the premier career-focused student organization at BGMEA University of Fashion & Technology.

- **Facebook**: https://www.facebook.com/BUFTCareerDevelopmentClub
- **LinkedIn**: https://www.linkedin.com/company/buft-career-development-club
- **Email**: buftcareerdevelopmentclub@gmail.com

---

## 📊 Project Status

**✅ Phase 1: Foundation Complete**
- Database schema ✅
- Core utilities ✅
- Authentication ✅
- Environment setup ✅
- Documentation ✅

**⏳ Phase 2: Dashboard (In Progress)**
- Follow [IMPLEMENTATION_GUIDE.md](IMPLEMENTATION_GUIDE.md)
- Create dashboard layout
- Implement CRUD modules

---

## 🚀 Getting Started

1. **Read** → [QUICK_START.md](QUICK_START.md) (10 minutes)
2. **Setup** → [SETUP_CHECKLIST.md](SETUP_CHECKLIST.md) (Step-by-step)
3. **Configure** → Update `.env` file
4. **Import** → `database/schema.sql` to MySQL
5. **Test** → All test endpoints
6. **Build** → Follow [IMPLEMENTATION_GUIDE.md](IMPLEMENTATION_GUIDE.md)

---

**Let's build something amazing! 🚀**

*For detailed information, see [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)*
