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
- `projects.html` — All 6 projects with stats and tech tags
- `venturebot.html`, `pathshaper.html`, `canvas-mcp.html`, `illiniclaw.html`, `inquiring-agents.html`, `cognitive-swarm.html` — Project detail pages
- `team.html` — Current team (Spring 2026) + semester timeline
- `news.html` — News grid with filter buttons
- `news-posts/` — Individual news article pages
- `css/main.css` — Design system (navy `#13294B` + orange `#ff6900`)
- `js/main.js` — Mobile nav, back-to-top, news filters
- `assets/` — IlliniClaw logo SVG

## Design System

Navy (`--navy: #13294B`) + orange (`--orange: #ff6900`). Hero sections use navy background with `radial-gradient` orange accent. Cards use borders, not heavy shadows. Buttons are rounded-rect (8px), not pill-shaped.

## Session Log

### 2026-04-25
- Completed: Reviewed the April 21 AgentLab project expansion commit and drafted a LinkedIn announcement for the new MindForum, HackClaw, and Text-2-SQL Agent pages. Set up Codex-facing `AGENTS.md` guidance across local work folders so agents know to look up relevant Claude memories at runtime instead of duplicating them. Updated global memory and local agent instructions with a stricter approval rule: external actions such as posting, sending, deleting, deploying, submitting, scheduling, or purchasing require explicit approval for the exact action.
- Next: Decide whether to keep, revert, or commit the cross-project `AGENTS.md` rollout. For LinkedIn, leave future posts as composed drafts unless explicitly told to post.

### 2026-04-21
- Completed: Added 3 new projects (MindForum, HackClaw, Text-2-SQL Agent) with full detail pages, cards on index.html + projects.html, individual launch news posts, and top-of-grid cards in news.html. Swapped homepage "Latest from AgentLab" to feature the new releases. Surfaced project leads in hero sections: Ash Castelino on HackClaw + Text-2-SQL, Keshav Dalmia on Cognitive Swarm, Vishal Sachdev on Inquiring Agents. Synced footer project lists across all 14 pages. Deployed to Cloudflare Pages twice; committed + pushed to GitHub (commit 4a517d8, +1538 lines across 23 files).
- Next: None pending.

*Older entries archived to `docs/session-archive.md`.*
