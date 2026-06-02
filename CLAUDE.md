# AgentLab

Static website for AgentLab — student-led multi-agent AI for education at Gies College of Business.

## Deploy

```bash
# IMPORTANT: unset CF_API_TOKEN first. The cfut_… token in ~/.env lacks
# Pages:Edit + Cache-Purge on this account, and wrangler prefers it over the
# working OAuth login — so `wrangler pages deploy` fails with auth error 10000
# whenever CF_API_TOKEN is exported. Unsetting it falls back to `wrangler login`
# OAuth, which has account access. (Confirmed 2026-06-01.)
env -u CF_API_TOKEN -u CF_API_TOKEN_AIREADY npx wrangler pages deploy . --project-name agentlab --commit-dirty=true
```

Live at: https://agentlab.illinihunt.org/ (Pages production alias: https://agentlab-8ot.pages.dev/)

**Cache caveat:** the `illinihunt.org` zone edge-caches HTML aggressively — after a deploy, `agentlab-8ot.pages.dev` is fresh immediately but `agentlab.illinihunt.org` can serve a stale copy (`cf-cache-status: HIT`) until the cache is purged. Neither `CF_API_TOKEN` nor the wrangler OAuth token has Cache-Purge on the zone, so purge from the **Cloudflare dashboard** (illinihunt.org → Caching → Configuration → Purge Everything / by-URL), or add `Zone → Cache Purge` to a token. Permanent fix: recreate the `cf-illinihunt-zone-and-pages` token with Account→Pages:Edit + Zone→Cache Purge + Zone→DNS:Edit, then update `~/.env`.

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

### 2026-05-22
- Completed: Reframed `programos.html` for non-tech readers using the latest spec — applied "curriculum repo" → "program folder" rename throughout, dropped HMAC/Bot Framework/JWT/sandbox jargon from prominent display, added "Start Small, Grow Up" deployment-tier section (Laptop → Small Server → Cloud) matching `docs/08-deployment-tiers.md`, reframed audit-log copy as an accreditor-readable markdown trail, and led each section with what the coordinator does (not how it's wired). Also reframed ProgramOS cards on `index.html` and `projects.html` with the same AI-program-coordinator pitch and new stats ("1 Afternoon to First Bot", "4+ Channels", "3 Deployment Tiers", "Markdown Audit Trail"). User layered in the K-ai architecture diagram (commit 16b063f) and MSBAi program link in the hero. Walked through a Cloudflare token recreation plan for the `cf-illinihunt-zone-and-pages` phantom IP-filter issue documented in `~/admin/agent-infra/cloudflare-tokens.md`.
- Next: **Cloudflare deploy still pending from 2026-04-30** — retried today on home IP (140.177.152.239) but `cf-illinihunt-zone-and-pages` token still returns auth error 10000 on the Pages API (empty `/accounts` list too). Token's Pages:Edit perm appears not to have taken effect. The pending diff against live now includes: MindForum 2–6 copy, issue-form contact links, K-ai/MSBAi additions, and the ProgramOS reframe. Fix options: (a) execute the token-recreation walkthrough from this session (delete + recreate fresh with Pages:Edit + Account Settings:Read + User Details:Read + DNS:Edit, "All accounts" scope, no IP filter), (b) roll the existing token, or (c) use the `msba-online pages deploy` value out of 1Password. See `~/admin/agent-infra/cloudflare-tokens.md`.

*Older entries archived to `docs/session-archive.md`.*
