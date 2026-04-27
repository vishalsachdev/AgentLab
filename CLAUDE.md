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

### 2026-04-27
- Completed: Built ProgramOS as a public spec-only repo at github.com/vishalsachdev/programos (originally ProgramClaw, renamed to better convey the operating-system framing). Added the 11th project (programos.html) to AgentLab with launch news post and full footer sync. Audited every project hero against the benchmark "business value before tech" — rewrote 7 hero blocks (PathShaper, Canvas MCP, IlliniClaw, Inquiring Agents, Text-2-SQL, GiesClaw, ProgramOS) so each leads with the audience/problem and only then names the AgentLab solution + Gies proof point. Refreshed cognitive-swarm.html using the up-to-date keshavdalmia10 README — restructured around the actual three-phase model (Explore/Vote/Forge) with named background agents (Synthesizer, Devil's Advocate, Direction Suggester), added Production Infrastructure card covering GCP/Terraform/GitHub Actions stack. Composed and posted a LinkedIn announcement for The Cognitive Swarm. Captured two LinkedIn-posting preferences in global auto memory (no body links — algorithm suppression, link goes in first comment; no Hybrid Builder cross-promotion unless an edition exists).
- Next: Yellow heroes (Cognitive Swarm, MindForum) and green heroes (VentureBots, HackClaw) were left as-is — revisit if they need similar tightening. ProgramOS spec repo is v0.1; no follow-up needed unless adopters file issues.

*Older entries archived to `docs/session-archive.md`.*
