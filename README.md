# GeoRank Monster 🦖

**AI-powered mass geo-targeted page builder for local SEO**

Build hundreds of unique, high-converting landing pages for every city you target — with a TurboTax-style wizard, silo architecture, GHL lead forms, and AI-generated content.

---

## 🚀 Features

✅ **TurboTax-Style Wizard** — 6-step guided setup (business → cities → services → contact → style → preview)  
✅ **Silo Architecture** — Auto-generates pillar pages + cluster pages with internal linking  
✅ **GHL Form Embeds** — Drop in GoHighLevel forms with dynamic city/service variables  
✅ **Next.js 15 App Router** — Static generation for speed + SEO  
✅ **Supabase Ready** — Database schema stub for storing projects + pages  
✅ **shadcn/ui Components** — Beautiful, accessible UI out of the box  
✅ **Tailwind CSS** — Utility-first styling with custom theme tokens

---

## 📦 Tech Stack

- **Next.js 15** (App Router, React 19, TypeScript)
- **Tailwind CSS** + **shadcn/ui** (Radix UI primitives)
- **Supabase** (Postgres database + Auth ready)
- **Vercel** (instant deploy)

---

## 🛠️ Setup

### 1. Clone the repo
```bash
git clone https://github.com/Wealthcoop/georank-monster.git
cd georank-monster
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run dev server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

---

## 📂 Project Structure

```
georank-monster/
├── app/
│   ├── globals.css              # Tailwind + shadcn/ui CSS variables
│   ├── layout.tsx               # Root layout with metadata
│   ├── onboarding/
│   │   └── page.tsx             # [TODO] 6-step wizard
│   └── [city]/[service]/
│       └── page.tsx             # [TODO] Dynamic silo pages
├── components/
│   └── GHLForm.tsx              # [TODO] GoHighLevel form embed
├── lib/
│   └── utils.ts                 # [TODO] Utility functions
├── types/
│   └── index.ts                 # [TODO] TypeScript types
├── package.json                 # Dependencies
├── tailwind.config.ts           # Tailwind config
├── tsconfig.json                # TypeScript config
└── next.config.ts               # Next.js config
```

---

## 🎯 Next Steps

### **Core MVP Files (In Progress)**
- [ ] `app/onboarding/page.tsx` — Wizard with LocalStorage state + step logic
- [ ] `components/GHLForm.tsx` — Iframe embed with dynamic params
- [ ] `app/[city]/[service]/page.tsx` — Silo page template with metadata + schema
- [ ] `lib/silo-utils.ts` — Silo generation logic (find nearest cities, generate URLs)
- [ ] `types/index.ts` — TypeScript interfaces

### **Future Enhancements**
- [ ] Supabase integration (store projects, pages, form submissions)
- [ ] AI content generation (OpenAI/Anthropic API for unique city content)
- [ ] XML sitemap generation (`/sitemap.xml`)
- [ ] Bulk page export (static HTML + deployment)
- [ ] Analytics dashboard (track leads per city/service)

---

## 🚢 Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Wealthcoop/georank-monster)

1. Click the button above
2. Connect your GitHub account
3. Deploy in 1 click
4. Add environment variables (if using Supabase):
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

---

## 📝 License

MIT — build and scale your local SEO empire.

---

## 🤝 Contributing

PRs welcome! This is an active project — check the **Issues** tab for tasks.

---

**Built with** ❤️ **by** [Wealthcoop](https://github.com/Wealthcoop)
