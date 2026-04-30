# AgentLab

Static website for AgentLab — student-led multi-agent AI for education at Gies College of Business.

## Deploy

```bash
npx wrangler pages deploy . --project-name agentlab --commit-dirty=true
```

Live at: https://agentlab.illinihunt.org/

## Hosting

Cloudflare Pages via wrangler (not GitHub Pages — Actions is disabled on this account). Custom domain requires null worker route on `illinihunt.org` zone. See `~/.claude/projects/-Users-vishal-code-AgentLab/memory/cloudflare-illinihunt.md` for full setup.

## Structure

- `index.html` — Homepage with project showcase and latest news
- `projects.html` — All 11 projects with stats and tech tags
- Project detail pages: `venturebot.html`, `pathshaper.html`, `canvas-mcp.html`, `illiniclaw.html`, `programos.html`, `giesclaw.html`, `inquiring-agents.html`, `cognitive-swarm.html`, `mindforum.html`, `hackclaw.html`, `text-2-sql.html`
- `team.html` — Current team (Spring 2026) + semester timeline
- `news.html` — News grid with filter buttons
- `news-posts/` — Individual news article pages
- `css/main.css` — Design system (navy `#13294B` + orange `#ff6900`)
- `js/main.js` — Mobile nav, back-to-top, news filters
- `assets/` — IlliniClaw logo SVG

## Design System

Navy (`--navy: #13294B`) + orange (`--orange: #ff6900`). Hero sections use navy background with `radial-gradient` orange accent. Cards use borders, not heavy shadows. Buttons are rounded-rect (8px), not pill-shaped.

## Session Log

### 2026-04-30
- Completed: Replaced footer "Contact Us" mailto with a "Submit an Issue" link to the AgentLab GitHub issue chooser across all 25 HTML pages; team-page CTA now points to the same chooser as "Get in Touch". Added `.github/ISSUE_TEMPLATE/` with `config.yml` (blank issues disabled, link to site), `contact.yml` (general contact form: name, affiliation, topic dropdown, message, optional reply email), and `join-team.yml` (recruiting form: name, school, role multi-select, background, interest, email). Closed Cloudflare autoconfig PR #3 (Workers Static Assets migration) — would orphan the existing Pages project + custom-domain binding for no immediate gain. Also committed pending MindForum copy edits (dropped "2–6 participants" cap → "group workspace") that were sitting uncommitted from an earlier edit.
- Next: **Cloudflare deploy is pending** — `wrangler pages deploy` failed today with auth error "Cannot use the access token from location: 130.126.255.202" (campus IP not on the API token's IP allowlist). Issue templates went live on push, but the contact-link change and MindForum copy edits are NOT yet on agentlab.illinihunt.org. Fix from a permitted network or update the token's Client IP Address Filtering at https://dash.cloudflare.com/profile/api-tokens, then run `npx wrangler pages deploy . --project-name agentlab --commit-dirty=true`.

*Older entries archived to `docs/session-archive.md`.*
