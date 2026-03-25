# CreativeClaw -- Product Definition

## What Is CreativeClaw?

CreativeClaw is a remote MCP (Model Context Protocol) server that gives AI agents -- primarily Claude and OpenClaw -- full access to media generation, editing, and management tools. Instead of bouncing between ChatGPT, Canva, Runway, and a dozen browser tabs, users do everything inside their AI assistant.

**Internal frame:** "Adobe for AI agents" (not public-facing).

**External positioning:** TBD -- needs to be developed. Candidates to explore:
- _"The creative studio inside Claude"_
- _"Every creative tool, one conversation"_
- _"Give your AI creative superpowers"_
- _"Your AI's creative toolkit"_

---

## How It Works

1. User adds the CreativeClaw remote MCP URL to Claude Desktop / Claude Code / OpenClaw
2. User logs in and adds a payment method
3. That's it -- Claude can now generate images, video, audio, 3D objects, remove backgrounds, and more
4. All generated files are stored in the user's space on CreativeClaw's CDN, named and reusable anywhere

Future: a companion plugin/skill pack that teaches the AI sophisticated workflows (multi-variant generation, on-brand iteration, Remotion video creation, etc.)

---

## Capabilities (MVP -- Live Today)

| Category | What It Does | Models (via Fal.ai) |
|---|---|---|
| **Image Generation** | Text-to-image, multiple styles & models | Flux, DALL-E, Midjourney, others on Fal.ai |
| **Video Generation** | Text/image-to-video | Runway, others on Fal.ai |
| **Text-to-Speech** | Generate voiceovers and audio | ElevenLabs |
| **3D Object Generation** | Create 3D assets from text/image | Models on Fal.ai |
| **Background Removal** | Remove/replace backgrounds | Fal.ai |
| **Basic Operations** | Image stitching, composition, file management | Built-in |
| **CDN Storage** | All media stored, named, and accessible via URL | CreativeClaw CDN |

> **Note:** Fal.ai is the infrastructure provider -- not public-facing. The user sees CreativeClaw and the model names (Flux, Midjourney, Runway, ElevenLabs, etc.).

---

## Core Value Propositions

### 1. Close the Loop Inside Claude
**The problem:** Today, creative work with AI is fragmented. You ask Claude for a prompt, switch to ChatGPT or Midjourney for the image, come back to Claude, switch to Runway for video, switch to another tool for background removal. Every switch breaks flow and loses context.

**The solution:** CreativeClaw makes Claude a complete creative studio. Generate images, iterate, remove backgrounds, create video, add voiceover, compose -- all in one conversation. Claude remembers the context, understands the brief, and executes end-to-end.

### 2. Better Media, On Brand
**The problem:** Single-model generation is hit-or-miss. You get one output and hope it works. Staying on-brand requires manual effort and expertise.

**The solution:** CreativeClaw gives Claude access to *every* top AI model. Generate multiple variants with different models, let Claude analyze them, pick the best, and iterate. Combined with skills that teach Claude your brand guidelines, the output is better and on-brand from the start.

### 3. Access to Every Top AI Model in One Place
**The problem:** Each AI model has its own API, pricing, UI, and quirks. Keeping up is exhausting.

**The solution:** One MCP, one account, one payment method -- access to Flux, DALL-E, Midjourney, Runway, ElevenLabs, and every model on Fal.ai. CreativeClaw handles the complexity.

---

## Target Audience

### Primary (Landing Page Focus)
**Marketers who use Claude** -- product marketers, brand marketers, content creators, ad marketers. People who already live in Claude for writing and strategy, and now want to close the loop on creative production without leaving.

### Broader (Full Vision)
Anyone using Claude or OpenClaw for creative work: developers making app assets, founders creating pitch decks, designers prototyping, content creators producing social media. The tool is horizontal but the landing page speaks to marketers first.

### NOT For
- Enterprise procurement (PLG motion, not sales-led)
- People who don't use AI assistants (requires Claude or OpenClaw)

---

## Competitive Landscape

### What People Do Today (Without CreativeClaw)

| User Type | Current Workflow | Pain |
|---|---|---|
| **Basic** | Ask Claude for a prompt -> go to ChatGPT/Gemini -> generate image -> come back | Context-switching, slow, loses flow |
| **Intermediate** | Use Canva/Adobe Express for editing, multiple AI tools for generation | Too many tools, nothing connected |
| **Advanced** | Connect Gemini CLI or direct Fal.ai MCP to Claude Code | Only one model, no skills, hard to set up |
| **Power User** | Custom MCP setups (e.g., Claudeflare) | Complex, no polish, no brand features |

### Key Competitors / Alternatives
- **ChatGPT** (built-in DALL-E) -- one model, no MCP, limited creative workflow
- **Canva AI** -- visual editor with some AI, but not inside Claude
- **Adobe Firefly / Express** -- powerful but separate tool, not agent-native
- **Direct API access** (Fal.ai, Replicate) -- technical, no skills, no brand layer
- **Gemini CLI** -- only Gemini models, limited to image gen

### CreativeClaw's Edge
- Lives where the user already works (inside Claude)
- Multi-model access (not locked to one provider)
- AI-native workflow (Claude orchestrates, not the user)
- On-brand generation with skills (future moat)

---

## Product Status & Go-to-Market

- **Status:** MVP is live and working. Framing publicly as **beta with waitlist**.
- **GTM motion:** PLG -- product-led growth. No sales team. Users sign up, get access, try it.
- **Waitlist strategy:** Page should feel like the product is live (not "coming soon"). Users sign up, provide brief info (what they do, what tools they use). Access is manually granted.
- **Referral codes:** Possible mechanism -- users with a code get instant access. Nobody has codes yet (creates exclusivity).
- **Pricing:** Usage-based (not subscription). Details TBD. Options under consideration:
  - Credits system (buy credits, each generation costs X credits)
  - Transparent per-generation pricing (like Fal.ai's model -- show cost per image/video)

---

## Brand & Identity

### Name
**CreativeClaw** -- plays on the "claw" meme in AI culture (Claude's claw, OpenClaw) and adds "Creative" to signal the domain.

### Logo Concept
A claw (open crab/lobster claw) holding a paintbrush. The claw connects to AI culture; the brush signals creativity. Not yet designed.

### Brand Colors
TBD -- to be determined during design reference phase.

### Tone & Voice
- **Playful & bold** -- not corporate, not sterile
- **High-energy** -- the landing page itself should feel like a showcase of what you can create
- **Confident** -- "we give your AI creative superpowers" not "we might help you maybe"
- **Marketer-friendly** -- speaks the language of campaigns, content, brand, assets

### Landing Page Vision
- High-end, animated, lots of motion
- Showcase real examples of generated media (images, videos, workflows)
- Visitors should think: "Wow, I'm going to be able to create THIS"
- Feature AI model logos prominently (Flux, Midjourney, Runway, ElevenLabs, DALL-E, etc.)
- Should feel live and polished, not like a beta placeholder

---

## Open Questions

- [ ] External positioning / tagline (what replaces "Adobe for AI agents" publicly?)
- [ ] Pricing model details (credits vs. per-generation transparency)
- [ ] Logo design
- [ ] Brand colors and visual identity
- [ ] Example media to showcase on the landing page
- [ ] Waitlist form fields (what data to collect?)
- [ ] Referral code implementation details
- [ ] Plugin/skill pack scope and timeline
- [ ] "On brand" feature -- how does the user define their brand to CreativeClaw?
