# SigAuth - AI-Powered Signature Verification System

A production-ready signature verification system using Siamese Neural Networks for authenticity detection and CNN-based tamper detection.

## 🚀 Quick Start

```bash
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to project directory
cd sigauth

# Install dependencies
npm install

# Start development server
npm run dev
```

## 📁 Complete Project Structure

```
sigauth/
├── public/
│   ├── favicon.ico                    # Browser tab icon
│   ├── placeholder.svg                # Placeholder image
│   └── robots.txt                     # SEO robots configuration
│
├── src/
│   ├── assets/
│   │   └── signatures/                # Demo signature images
│   │       ├── reference-genuine.svg  # Reference signature for demo
│   │       ├── test-genuine.svg       # Genuine test signature
│   │       ├── test-forged.svg        # Forged signature sample
│   │       └── test-tampered.svg      # Tampered signature sample
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   └── Header.tsx             # Navigation header component
│   │   │
│   │   ├── sections/
│   │   │   ├── DemoSection.tsx        # Interactive demo with test cases
│   │   │   ├── FeaturesSection.tsx    # Features showcase
│   │   │   ├── Footer.tsx             # Site footer
│   │   │   ├── HeroSection.tsx        # Landing hero section
│   │   │   ├── HowItWorksSection.tsx  # Process flow explanation
│   │   │   ├── StatsSection.tsx       # Performance metrics display
│   │   │   ├── TechnologySection.tsx  # Technology stack info
│   │   │   └── VerificationSection.tsx # Live verification interface
│   │   │
│   │   ├── ui/                        # Shadcn UI components
│   │   │   ├── accordion.tsx
│   │   │   ├── alert-dialog.tsx
│   │   │   ├── alert.tsx
│   │   │   ├── aspect-ratio.tsx
│   │   │   ├── avatar.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── breadcrumb.tsx
│   │   │   ├── button.tsx
│   │   │   ├── calendar.tsx
│   │   │   ├── card.tsx
│   │   │   ├── carousel.tsx
│   │   │   ├── chart.tsx
│   │   │   ├── checkbox.tsx
│   │   │   ├── collapsible.tsx
│   │   │   ├── command.tsx
│   │   │   ├── context-menu.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── drawer.tsx
│   │   │   ├── dropdown-menu.tsx
│   │   │   ├── form.tsx
│   │   │   ├── hover-card.tsx
│   │   │   ├── input-otp.tsx
│   │   │   ├── input.tsx
│   │   │   ├── label.tsx
│   │   │   ├── menubar.tsx
│   │   │   ├── navigation-menu.tsx
│   │   │   ├── pagination.tsx
│   │   │   ├── popover.tsx
│   │   │   ├── progress.tsx
│   │   │   ├── radio-group.tsx
│   │   │   ├── resizable.tsx
│   │   │   ├── scroll-area.tsx
│   │   │   ├── select.tsx
│   │   │   ├── separator.tsx
│   │   │   ├── sheet.tsx
│   │   │   ├── sidebar.tsx
│   │   │   ├── skeleton.tsx
│   │   │   ├── slider.tsx
│   │   │   ├── sonner.tsx
│   │   │   ├── switch.tsx
│   │   │   ├── table.tsx
│   │   │   ├── tabs.tsx
│   │   │   ├── textarea.tsx
│   │   │   ├── toast.tsx
│   │   │   ├── toaster.tsx
│   │   │   ├── toggle-group.tsx
│   │   │   ├── toggle.tsx
│   │   │   ├── tooltip.tsx
│   │   │   └── use-toast.ts
│   │   │
│   │   └── NavLink.tsx                # Navigation link component
│   │
│   ├── hooks/
│   │   ├── use-mobile.tsx             # Mobile detection hook
│   │   ├── use-toast.ts               # Toast notification hook
│   │   └── useSignatureVerification.ts # Signature verification logic
│   │
│   ├── lib/
│   │   └── utils.ts                   # Utility functions (cn, etc.)
│   │
│   ├── pages/
│   │   ├── Index.tsx                  # Main landing page
│   │   └── NotFound.tsx               # 404 error page
│   │
│   ├── App.css                        # App-specific styles
│   ├── App.tsx                        # Main app component with routing
│   ├── index.css                      # Global styles & Tailwind config
│   ├── main.tsx                       # React entry point
│   └── vite-env.d.ts                  # TypeScript declarations
│
├── .gitignore                         # Git ignore rules
├── components.json                    # Shadcn UI configuration
├── eslint.config.js                   # ESLint configuration
├── index.html                         # HTML entry point
├── package.json                       # Dependencies & scripts
├── package-lock.json                  # Dependency lock file
├── postcss.config.js                  # PostCSS configuration
├── tailwind.config.ts                 # Tailwind CSS configuration
├── tsconfig.json                      # TypeScript configuration
├── tsconfig.app.json                  # App TypeScript config
├── tsconfig.node.json                 # Node TypeScript config
├── vite.config.ts                     # Vite bundler configuration
└── README.md                          # This file
```

## 🛠️ Technology Stack

| Category | Technology |
|----------|------------|
| Frontend | React 18, TypeScript, Vite |
| Styling | Tailwind CSS, Shadcn UI |
| Animation | Framer Motion |
| Routing | React Router DOM |
| State | TanStack React Query |
| Forms | React Hook Form, Zod |

## 📊 Key Features

- **Siamese Network Verification** - Deep learning signature matching
- **Tamper Detection** - CNN-based digital manipulation detection
- **Interactive Demo** - Pre-loaded test cases for demonstration
- **Real-time Analysis** - Live verification with progress tracking
- **Responsive Design** - Works on desktop and mobile devices

## 🔧 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## 📂 Dataset Requirements (For Full Implementation)

| Dataset | Purpose | Format |
|---------|---------|--------|
| SVC2004 Task 1 & 2 | Online signatures | Text → Convert to PNG |
| SCUT-MMSIG | Mobile signatures | Images |
| Custom Tamper Set | Forgery detection | Synthetic generation |

## 🔗 Useful Links

- [Lovable Documentation](https://docs.lovable.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Shadcn UI](https://ui.shadcn.com)
- [Framer Motion](https://www.framer.com/motion)

## 📝 License

MIT License - Feel free to use this project for educational purposes.
