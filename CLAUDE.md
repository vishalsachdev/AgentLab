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
- `projects.html` — All 4 projects with stats and tech tags
- `venturebot.html`, `pathshaper.html`, `canvas-mcp.html`, `illiniclaw.html` — Project detail pages
- `team.html` — Current team (Spring 2026) + semester timeline
- `news.html` — News grid with filter buttons
- `news-posts/` — Individual news article pages
- `css/main.css` — Design system (navy `#13294B` + orange `#ff6900`)
- `js/main.js` — Mobile nav, back-to-top, news filters
- `assets/` — IlliniClaw logo SVG

## Design System

Navy (`--navy: #13294B`) + orange (`--orange: #ff6900`). Hero sections use navy background with `radial-gradient` orange accent. Cards use borders, not heavy shadows. Buttons are rounded-rect (8px), not pill-shaped.

## Session Log

### 2026-03-08
- Completed: Added Cloudflare Web Analytics beacon to all 12 HTML pages. Updated IlliniClaw logo to new lobster mascot from /code/illiniclaw. Reframed BADM 554 as ongoing experiment (present-tense language across illiniclaw.html, projects.html, index.html). Created project CLAUDE.md with deploy command and site structure.
- Next: None pending.

### 2026-03-07
- Completed: Full site overhaul — added PathShaper, Canvas MCP, IlliniClaw pages. Redesigned UI. Restructured team page with semester timeline. Added 4 news items. Renamed BADM 554 Bot → IlliniClaw. Migrated to Cloudflare Pages.
