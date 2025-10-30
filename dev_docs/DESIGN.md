
---

# CV Builder — Landing Page Design Brief

**Product:** CV Builder
**Owner:** Emmanuel Chekumbe (@emcie4)
**Date:** October 2025
**Purpose:** Design and develop a clean, fast, conversion-optimized landing page for CV Builder — a Kenyan resume-building platform based on Reactive Resume.

---

## 1. Project Overview

**CV Builder** helps Kenyan students, graduates, and job seekers create professional, ATS-friendly CVs and cover letters quickly and affordably.
Users can start for free and unlock additional templates, AI writing, or lifetime access through M-PESA or card payments.

The landing page should:

* Communicate **trust**, **local relevance**, and **ease of use**
* Convert visitors into **free sign-ups** or **paying users**
* Use a **clean, SaaS-inspired layout** similar to [react-saas.com](https://react-saas.com)

---

## 2. Target Audience

| Segment             | Description                                  | Goals                               |
| ------------------- | -------------------------------------------- | ----------------------------------- |
| University students | Seeking internships or entry-level positions | Build first CV easily               |
| Job seekers (20–35) | Looking for employment or remote work        | Update and download professional CV |
| Young professionals | Want modern, clean CV templates              | Use AI for rewriting and editing    |

**Devices:** 70% mobile, 30% desktop
**Behavior:** M-PESA-first, prefers simple, fast-loading tools.

---

## 3. Design Direction

**Overall Feel:**
Clean, confident, and minimal. Inspired by React SaaS — strong typography, consistent spacing, and focused calls to action.
Localized with Kenyan identity through color, tone, and imagery.

**Visual Identity**

| Element         | Description                                                |
| --------------- | ---------------------------------------------------------- |
| Primary color   | Kenya green `#00A859`                                      |
| Secondary color | Charcoal `#111827`                                         |
| Background      | White `#FFFFFF`, Light grey `#F9FAFB`                      |
| Typography      | Sans-serif, modern and readable — *Inter* or *Poppins*     |
| Icons           | Lucide React or HeroIcons                                  |
| Imagery         | Kenyan students and professionals using laptops or at work |
| CTA buttons     | Rounded corners (8–12px), bold and high-contrast           |
| Tone            | Empowering, professional, and local                        |

---

## 4. Page Structure and Content

### 4.1 Navbar

**Purpose:** Quick navigation, consistent across site.

* Left: CV Builder logo (wordmark, "CV" in green)
* Center: Links – Features, Pricing, FAQ, Contact
* Right: Buttons – **Sign In** (outline) and **Start Free** (solid green)
* Sticky on scroll, white background with light shadow

---

### 4.2 Hero Section

**Purpose:** Capture attention and drive free sign-ups.

**Layout:**
Two columns — text on the left, product image (resume editor) on the right.

**Content:**

* **Headline:** Create a Professional Kenyan CV in Minutes
* **Sub-headline:** Start free. Upgrade anytime with M-PESA or Card.
* **Primary CTA:** Start Free
* **Secondary CTA:** See Plans
* **Trust row:** Trusted by 5,000+ Kenyan job seekers · Powered by Paystack & OpenAI

**Design Notes:**

* Large, bold headline (48–60px)
* Subtle gradient background or green accent
* Use generous whitespace like React SaaS

---

### 4.3 Feature Highlights

**Purpose:** Communicate value and product benefits quickly.

**Layout:** 2x2 grid of simple cards (icon, headline, description)

| Feature              | Description                                       |
| -------------------- | ------------------------------------------------- |
| Modern Templates     | Job-ready designs optimized for Kenyan employers  |
| AI Writing Assistant | Rephrase, fix grammar, and improve tone instantly |
| Affordable Plans     | Start free, upgrade from KES 100                  |
| Secure & Private     | User data is protected and stored safely          |

**Design Notes:**

* White cards with soft shadows and hover effects
* Consistent spacing and alignment

---

### 4.4 Pricing Section

**Purpose:** Present the freemium tiers clearly and drive conversions.

**Layout:** 3–4 cards, each representing a plan. Highlight the Lifetime plan.

| Plan           | Price     | Includes                    |
| -------------- | --------- | --------------------------- |
| Free           | KES 0     | 3 templates, basic features |
| Templates Pack | KES 100   | 10 premium templates        |
| AI Add-on      | KES 500   | AI writing suite            |
| Lifetime       | KES 1,000 | All templates + AI forever  |

**Design Notes:**

* Use consistent card heights and typography
* Highlight the “Lifetime” plan with a different background or “Best Value” label
* Show Paystack and M-PESA icons under the pricing grid

---

### 4.5 How It Works

**Purpose:** Show ease of use and reduce hesitation.

**Layout:** Three-step horizontal process or timeline.

1. **Sign Up Free** – Create your account in seconds
2. **Choose a Template** – Customize your details easily
3. **Download or Upgrade** – Export your CV or unlock premium templates anytime

**Design Notes:**

* Use simple numbered circles with icons
* Connect steps with a faint line or arrow

---

### 4.6 Testimonials

**Purpose:** Build trust with local credibility.

**Layout:** Carousel of testimonial cards (photo, quote, name, institution)

**Examples:**

* “I landed my internship after improving my CV here.” — Brian, Strathmore University
* “Affordable and fast. I paid with M-PESA instantly.” — Lucy, Nairobi

**Optional Footer Line:**
Over 5,000 Kenyan job seekers trust CV Builder.

---

### 4.7 FAQ Section

**Purpose:** Address common concerns and clarify process.

**Layout:** Accordion component (expandable questions).

**Example Questions:**

* Can I start free?
* How do I pay?
* Is my data safe?
* What does the AI feature do?
* Can I upgrade later?

---

### 4.8 Footer

**Purpose:** Reinforce call-to-action and provide essential links.

**CTA Banner:**

Start building your professional CV today — it’s free.
[Start Free] button

**Footer Links:**

About · Privacy · Terms · FAQ · Contact
Social links: LinkedIn, X (Twitter), Email

**Footer Text:**

© 2025 CV Builder · Built in Kenya · Powered by Paystack and OpenAI

---

## 5. Design Principles

| Principle     | Description                                       |
| ------------- | ------------------------------------------------- |
| Whitespace    | Keep 80–100px vertical padding between sections   |
| Consistency   | Same button, icon, and font style throughout      |
| Hierarchy     | One main heading, subheading, and CTA per section |
| Mobile-first  | Stack vertically on smaller screens               |
| Performance   | Optimize assets; total page <1MB on mobile        |
| Accessibility | Proper color contrast and alt text for images     |
| Localization  | Use Kenyan imagery, color palette, and language   |

---

## 6. Technical Notes

* Built using **React (Vite)** for the frontend
* Styling via **Tailwind CSS** or **Shadcn UI**
* Components: Button, Card, Accordion, Carousel
* Responsive design for 320px to 1440px breakpoints
* SEO Metadata:

  * Title: `CV Builder — Create a Professional Kenyan CV Online`
  * Description: `Free resume builder with M-PESA payments and AI writing tools.`
* Deployment: DigitalOcean App Platform or Vercel static hosting

---

## 7. Deliverables Checklist

| Deliverable        | Description                                      |
| ------------------ | ------------------------------------------------ |
| Figma design       | Desktop and mobile layouts for all sections      |
| Assets             | Logo, screenshots, icons, testimonial images     |
| Brand kit          | Colors, typography, spacing rules                |
| UI components      | Buttons, Cards, Nav, Footer, Accordion           |
| Handoff spec       | Margins, paddings, hover states, breakpoints     |
| Responsive preview | Mobile (375px), Tablet (768px), Desktop (1440px) |

---

## 8. Success Criteria

The final landing page should:

* Load in under 2 seconds on mobile
* Feel clean, professional, and locally relevant
* Convert visitors to free or paid users
* Clearly represent CV Builder’s values: **affordable, smart, Kenyan**

---

