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

### 2026-05-22
- Completed: Reframed ProgramOS copy on index.html and projects.html — away from "spec / SPEC.md / fork NanoClaw" mechanics and toward the AI-program-coordinator pitch (answers stakeholders on email/Telegram/Teams/web, writes decisions into a shared program folder, K-ai persona at Gies). Updated stats too ("1 Afternoon to First Bot", "4+ Channels", "3 Deployment Tiers", "Markdown Audit Trail"). Committed as b29f4c6 and pushed.
- Next: **Cloudflare deploy still pending from 2026-04-30** — retried today on home IP (140.177.152.239) but `cf-illinihunt-zone-and-pages` token still returns auth error 10000 on the Pages API (empty `/accounts` list too). Token's Pages:Edit perm appears not to have taken effect. The pending diff against live now includes: MindForum 2–6 copy, issue-form contact links, K-ai/MSBAi additions, and the ProgramOS reframe. Fix options: roll the token, recreate fresh local-only Pages token, or use the `msba-online pages deploy` value out of 1Password. See `~/admin/agent-infra/cloudflare-tokens.md`.

*Older entries archived to `docs/session-archive.md`.*
