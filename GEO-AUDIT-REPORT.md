# GEO Audit Report: CreativeClaw

**Audit Date:** 2026-03-31
**URL:** https://creativeclaw.co
**Business Type:** SaaS (MCP plugin for Claude)
**Pages Analyzed:** 2

---

## Executive Summary

**Overall GEO Score: 25/100 (Critical)**

CreativeClaw has a well-built, visually polished landing page with strong product content, but it is almost entirely invisible to AI search platforms. The site has zero structured data, zero Open Graph tags, no robots.txt, no llms.txt, and near-zero external brand presence. The technical foundation (Astro SSG on Cloudflare) is excellent for crawlability, but every discoverability layer on top of it is missing. The good news: the highest-impact fixes (JSON-LD schema, OG tags, robots.txt, llms.txt) are low-effort changes that would immediately lift scores across all platforms.

### Score Breakdown

| Category | Score | Weight | Weighted Score |
|---|---|---|---|
| AI Citability | 27/100 | 25% | 6.75 |
| Brand Authority | 5/100 | 20% | 1.00 |
| Content E-E-A-T | 34/100 | 20% | 6.80 |
| Technical GEO | 52/100 | 15% | 7.80 |
| Schema & Structured Data | 3/100 | 10% | 0.30 |
| Platform Optimization | 24/100 | 10% | 2.40 |
| **Overall GEO Score** | | | **25/100** |

---

## Critical Issues (Fix Immediately)

### ~~1. Zero Structured Data (Schema Score: 3/100)~~ FIXED
Added Organization, WebSite, SoftwareApplication, FAQPage (9 Q&As), and BreadcrumbList JSON-LD schemas.

### ~~2. No Open Graph or Twitter Card Meta Tags~~ FIXED
Added OG tags (title, description, image, url, type, site_name) and Twitter Card tags with 1200x630 share image.

### ~~3. No robots.txt File~~ FIXED
Created `public/robots.txt` with `Allow: /` and sitemap reference.

### ~~4. No llms.txt File~~ FIXED
Created `public/llms.txt` with full product description, capabilities, pages, and contact info.

### ~~5. No Canonical Tags~~ FIXED
Added `<link rel="canonical">` to Layout.astro with dynamic URL generation.

### ~~6. No Privacy Policy or Terms of Service~~ FIXED
Added /privacy and /terms pages modeled after fal.ai (YC W24). Covers AI-generated content ownership, third-party model providers, data collection, GDPR rights, and acceptable use. Linked from footer.

---

## High Priority Issues

### 7. Near-Zero Brand Presence (Brand Score: 5/100)
No Wikipedia article, no Reddit mentions, no YouTube channel, no LinkedIn company page, no Product Hunt listing, no G2/Capterra reviews. AI models cannot verify CreativeClaw as a credible entity.

### 8. No About Page or Team Information
Zero information about who built this product. No author bylines, no team page, no credentials. AI models and quality raters cannot cite a source when they cannot determine who is behind it.

### 9. No Blog or Content Hub
Only 2 pages total (~1,550 words). No educational content, no tutorials, no comparisons, no documentation beyond basic setup. Topical authority is minimal.

### 10. FAQ Answers Lack Depth and Statistics
Most FAQ answers are 1-2 sentences with no concrete data. The entire site contains exactly one number: "1,000+" models. Zero pricing figures, user counts, performance benchmarks, or comparison data.

### ~~11. No Publication or Updated Dates~~ FIXED
All pages now show "Last updated" date in footer (build-time generated). Sitemap includes `<lastmod>` dates. `article:modified_time` meta tag added to all pages.

---

## Medium Priority Issues

### ~~12. Hero Prompt Text Invisible to Crawlers~~ FIXED
Hero text is now server-rendered in the HTML and cleared by JS before the typing animation starts.

### ~~13. No Mobile Navigation~~ FIXED
Added hamburger menu with slide-down nav panel. Links auto-close menu on click. CTA button included in mobile menu.

### ~~14. Missing Image Dimensions~~ FIXED
Added width/height attributes to all major content images (~30 images across Hero, OnBrand, UseCases, ValueProps, HowItWorks, IterationAnimation, how-to-connect).

### ~~15. Missing Security Headers~~ FIXED
Added `public/_headers` with X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, X-XSS-Protection.

### 16. No IndexNow Support
No IndexNow protocol for real-time Bing content change notifications.

---

## Low Priority Issues

### ~~17. Video Loading Competition~~ FIXED
Below-fold videos now use `preload="none"` with Intersection Observer for lazy autoplay/pause on scroll.

### ~~18. Font Preloading Missing~~ FIXED
Added `<link rel="preload">` for Larken and Hellix woff2 fonts.

### 19. Meta Description Could Be Stronger
Current: "CreativeClaw -- The creative studio inside Claude. Generate images, video, audio, 3D with every top AI model." (110 chars) -- could include more specific differentiators.

---

## Category Deep Dives

### AI Citability (27/100)

The FAQ section is the most citable content, with the "What is an MCP?" answer scoring 62/100 for quotability. However, systemic issues drag the score down:

- **Zero statistical density** across the entire site (only "1,000+" models mentioned)
- **No structured data** making FAQ answers invisible to structured data parsers
- **Marketing copy tone** rather than factual/educational content AI models prefer to cite
- **No definition-style patterns** (bold term + "is/are" + definition) that AI models extract aggressively

**Best passage for citation:**
> "MCP (Model Context Protocol) is a standard that lets AI assistants like Claude connect to external tools and services. CreativeClaw is a remote MCP server -- you add one URL to Claude, and it gains access to all our creative tools."

### Brand Authority (5/100)

| Platform | Status |
|---|---|
| Wikipedia | Absent |
| Reddit | Absent |
| YouTube | Absent |
| LinkedIn | Absent |
| Product Hunt | Absent |
| G2/Capterra | Absent |
| GitHub | 1 public repo (CreativeClawCo) |
| X/Twitter | Present (@CreativeClawCo) |

The brand exists only on its own domain, a single-repo GitHub org, and an X/Twitter account. AI models have no third-party corroboration to establish entity recognition.

### Content E-E-A-T (34/100)

| Dimension | Score | Key Gap |
|---|---|---|
| Experience | 6/25 | No case studies, no original data, no real user accounts |
| Expertise | 8/25 | No author bylines, no team page, no credentials |
| Authoritativeness | 5/25 | No about page, no external citations, single social channel |
| Trustworthiness | 11/25 | Has HTTPS and contact email, but no privacy policy, no terms, no business entity disclosure |

The content reads as polished marketing copy with a consistent brand voice, but lacks the specificity, data, and personal narrative that would establish it as an authoritative source. The FAQ section is the strongest content — it addresses real user questions with useful answers.

### Technical GEO (52/100)

**Strengths:**
- Astro SSG generates fully static HTML — all content visible to crawlers without JS
- Clean heading hierarchy (single H1, logical H2/H3 structure)
- Good semantic HTML (`<section>`, `<nav>`, `<footer>`, `<details>/<summary>`)
- Clean URL structure (`/` and `/how-to-connect`)
- Responsive design with proper viewport meta
- Font display swap configured correctly

**Weaknesses:**
- No robots.txt, no canonical tags, no meta robots
- Missing OG/Twitter meta tags
- No structured data of any kind
- No sitemap being served (despite @astrojs/sitemap being configured)
- No security headers file
- Hero text invisible to crawlers (JS-injected)

### Schema & Structured Data (3/100)

Both pages contain zero structured data. Missing schemas by priority:

1. **Organization** (Critical) — establishes entity identity
2. **SoftwareApplication** (Critical) — defines the product
3. **FAQPage** (High) — 9 Q&A pairs ready for markup
4. **WebSite** (Medium) — establishes site identity
5. **BreadcrumbList** (Medium) — navigation context for subpages
6. **WebPage + speakable** (Medium) — AI assistant readiness

Also missing: Open Graph tags, Twitter Card tags, canonical URLs, sameAs entity linking.

### Platform Optimization (24/100)

| Platform | Score | Biggest Gap |
|---|---|---|
| Google AI Overviews | 30 | No FAQ schema, no answer-target content patterns |
| Bing Copilot | 22 | No LinkedIn, no IndexNow, no OG tags |
| ChatGPT Web Search | 18 | No entity recognition signals (Wikipedia, Wikidata, LinkedIn) |
| Perplexity AI | 16 | Zero community validation (no Reddit, no Product Hunt) |
| Google Gemini | 15 | Zero Google ecosystem presence (no YouTube, no Knowledge Graph) |

---

## Quick Wins (Implement This Week)

1. ~~**Add robots.txt**~~ DONE
2. ~~**Add Organization + SoftwareApplication JSON-LD**~~ DONE
3. ~~**Add Open Graph + Twitter Card meta tags**~~ DONE
4. ~~**Add canonical tags**~~ DONE
5. ~~**Add llms.txt**~~ DONE

## 30-Day Action Plan

### Week 1: Technical Foundation
- [x] Add `public/robots.txt` with AI crawler allowances and sitemap reference
- [x] Add canonical tags to `Layout.astro`
- [x] Add Open Graph and Twitter Card meta tags to `Layout.astro`
- [x] Add Organization, SoftwareApplication, WebSite JSON-LD to homepage
- [x] Add FAQPage JSON-LD to FAQ component
- [x] Add BreadcrumbList + WebPage JSON-LD to how-to-connect page
- [x] Create `public/llms.txt`
- [x] Verify sitemap.xml is accessible at live URL (with lastmod dates)
- [x] Add `public/_headers` file with security headers

### Week 2: Trust & Authority Foundation
- [x] Create Privacy Policy page (`/privacy`)
- [x] Create Terms of Service page (`/terms`)
- [ ] Create About page (`/about`) with team info, backgrounds, and credentials
- [ ] Create LinkedIn company page with complete profile
- [ ] Create a Wikidata entity for CreativeClaw
- [x] Add visible publication/update dates to all pages

### Week 3: External Presence & Content
- [ ] Launch on Product Hunt
- [ ] Post to r/ClaudeAI, r/MCP, r/AItools on Reddit
- [ ] Create YouTube channel with 2-3 demo videos
- [ ] Publish first blog post: "What is CreativeClaw? The AI Creative Studio Inside Claude"
- [ ] Add real case study or showcase with process documentation

### Week 4: Content Depth & Optimization
- [ ] Enrich FAQ answers with statistics and specific examples
- [ ] Publish comparison content: "CreativeClaw vs. Using Individual AI Tools"
- [ ] Add definition-style content patterns for key terms
- [x] Fix hero text to be visible without JavaScript
- [x] Add mobile navigation (hamburger menu)
- [x] Add image width/height attributes for CLS prevention

---

## Appendix: Pages Analyzed

| URL | Title | GEO Issues |
|---|---|---|
| https://creativeclaw.co | CreativeClaw -- The Creative Studio Inside Claude | 15 (no schema, no OG, no canonical, no robots.txt, no dates, no about, no privacy) |
| https://creativeclaw.co/how-to-connect | How to Connect -- CreativeClaw | 8 (no schema, no OG, no canonical, no breadcrumbs, thin content) |
