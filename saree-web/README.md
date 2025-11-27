# Saree E-Commerce Web Application

A complete Next.js 14 web application for a saree seller with public catalog and admin dashboard.

## 🎯 Features

### Public Site
- **Home Page**: Hero banner, category showcase, featured sarees
- **Catalog Page**: Grid view with filters (category-based)
- **Product Detail Page**: Full product information with WhatsApp "Buy Now" button
- Responsive design for mobile and desktop

### Admin Dashboard
- **Secure Login**: Supabase authentication
- **Manage Sarees**: Add, edit, delete sarees
- **Image Upload**: Direct upload to Supabase Storage
- **Protected Routes**: Only authenticated users can access admin panel

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, TailwindCSS
- **UI Components**: ShadCN UI
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **Forms**: React Hook Form + Zod validation
- **Animations**: Framer Motion

## 📦 Setup Instructions

### 1. Install Dependencies

```bash
cd saree-web
npm install
```

### 2. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** and run the script in `supabase_setup.sql`
3. Get your project credentials:
   - Go to **Settings** → **API**
   - Copy the **Project URL** and **anon/public key**

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
NEXT_PUBLIC_OWNER_PHONE=919876543210
```

Replace:
- `your-supabase-url` with your Supabase project URL
- `your-supabase-anon-key` with your Supabase anon key
- `919876543210` with your WhatsApp number (include country code, no + or spaces)

### 4. Create Admin User

In Supabase Dashboard:
1. Go to **Authentication** → **Users**
2. Click **Add User**
3. Enter email and password for the admin account

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
saree-web/
├── src/
│   ├── app/
│   │   ├── (public)/
│   │   │   ├── page.tsx              # Home page
│   │   │   └── catalog/
│   │   │       ├── page.tsx          # Catalog listing
│   │   │       └── [id]/page.tsx     # Product detail
│   │   ├── admin/
│   │   │   ├── layout.tsx            # Admin layout (protected)
│   │   │   ├── login/page.tsx        # Admin login
│   │   │   ├── dashboard/page.tsx    # Saree management
│   │   │   └── sarees/
│   │   │       ├── new/page.tsx      # Add new saree
│   │   │       └── [id]/edit/page.tsx # Edit saree
│   │   ├── layout.tsx                # Root layout
│   │   └── globals.css               # Global styles
│   ├── components/
│   │   ├── ui/                       # ShadCN components
│   │   ├── Navbar.tsx                # Navigation bar
│   │   ├── Footer.tsx                # Footer
│   │   └── SareeForm.tsx             # Saree add/edit form
│   └── lib/
│       ├── supabase.ts               # Supabase client
│       └── utils.ts                  # Utility functions
├── supabase_setup.sql                # Database setup script
├── env.local.example                 # Environment variables template
└── package.json
```

## 🚀 Usage Guide

### For Admin (Owner)

1. **Login**: Navigate to `/admin/login` and sign in with your credentials
2. **Add Saree**: Click "Add New Saree" in the dashboard
   - Fill in title, price, material, description, category
   - Upload an image
   - Click "Create Saree"
3. **Edit Saree**: Click the edit icon next to any saree
4. **Delete Saree**: Click the delete icon (trash) next to any saree

### For Customers

1. Browse sarees on the home page or catalog
2. Filter by category (Silk, Cotton, Banarasi, etc.)
3. Click on a saree to view details
4. Click "Buy Now on WhatsApp" to contact the owner

## 🎨 Customization

### Change Brand Name
Edit `src/components/Navbar.tsx` and `src/components/Footer.tsx` to replace "SareeStore" with your brand name.

### Add More Categories
Edit the categories array in:
- `src/app/catalog/page.tsx`
- `src/components/SareeForm.tsx`

### Modify Colors
Edit `src/app/globals.css` to change the color scheme (HSL values).

## 📝 Database Schema

### `sarees` Table
| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| title | text | Saree name |
| price | numeric | Price in rupees |
| material | text | Fabric material |
| description | text | Product description |
| category | text | Category (Silk, Cotton, etc.) |
| image_url | text | Image URL from Supabase Storage |
| created_at | timestamp | Creation timestamp |

## 🔒 Security

- Row Level Security (RLS) enabled on all tables
- Public users: Read-only access to sarees
- Authenticated users: Full CRUD access
- Admin routes protected with authentication check
- Environment variables for sensitive data

## 🚢 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and import your repository
3. Add environment variables in Vercel dashboard
4. Deploy!

## 📞 Support

For issues or questions, please check:
- Supabase documentation: https://supabase.com/docs
- Next.js documentation: https://nextjs.org/docs
- ShadCN UI: https://ui.shadcn.com

## 📄 License

This project is open source and available for personal and commercial use.
