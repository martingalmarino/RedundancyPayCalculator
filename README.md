# Redundancy Pay Calculator - Ireland

A modern, responsive web application for calculating statutory redundancy payments under Irish law. Built with Next.js 14, TypeScript, and TailwindCSS, following the design principles of Wise.com calculators.

## Features

- **Accurate Calculations**: Based on current Irish legislation (Redundancy Payments Acts 1967–2014)
- **Modern UI**: Clean, trustworthy design inspired by Wise.com
- **Responsive Design**: Mobile-first approach with excellent UX across all devices
- **SEO Optimized**: Includes JSON-LD schema markup for FAQ sections
- **Accessibility**: Built with accessibility best practices
- **Fast Performance**: Optimized for Core Web Vitals

## Calculation Logic

The calculator implements the statutory redundancy payment formula:

- **Minimum Service**: 2 years of continuous service required
- **Calculation**: 2 weeks' pay per year of service + 1 additional week
- **Weekly Cap**: €600 maximum per week
- **Example**: 5 years service = (5 × 2 + 1) × €600 = €6,600

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Icons**: Lucide React
- **UI Components**: Headless UI
- **Deployment**: Vercel-ready

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
├── app/                          # Next.js App Router
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Home page
│   └── en/redundancy-calculator/ireland/
│       └── page.tsx             # Ireland calculator page
├── components/                   # React components
│   ├── Breadcrumbs.tsx          # SEO breadcrumb navigation
│   ├── Calculator.tsx           # Main calculator component
│   ├── CTASection.tsx           # Call-to-action section
│   ├── FAQ.tsx                  # FAQ accordion
│   ├── FAQSchema.tsx            # JSON-LD schema markup
│   ├── Footer.tsx               # Site footer
│   └── Navigation.tsx           # Sticky navigation
├── lib/                         # Business logic
│   ├── calcRedundancy.ts        # Calculation functions
│   └── redundancyRules.ts       # Irish redundancy rules
└── public/                      # Static assets
```

## Deployment

The project is configured for easy deployment on Vercel:

1. **Connect your repository** to Vercel
2. **Deploy automatically** on every push to main branch
3. **Environment variables** (if needed) can be set in Vercel dashboard

## Legal Disclaimer

This calculator is for informational purposes only and should not be considered legal advice. Always consult with a qualified employment solicitor for specific legal guidance regarding redundancy payments.

## License

MIT License - feel free to use this project for your own redundancy calculator applications.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
