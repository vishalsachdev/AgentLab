# AgentLab

Static website for AgentLab — student-led multi-agent AI for education at Gies College of Business.

## Deploy

```bash
npx wrangler pages deploy . --project-name agentlab --commit-dirty=true
```

`CF_API_TOKEN` in `~/.env` was rolled 2026-06-02 with the right scopes (Account→Pages:Edit + Account Settings:Read, User→User Details:Read, Zone→DNS:Edit + Cache Purge), so wrangler now uses it directly — no more `env -u CF_API_TOKEN` workaround. (Wrangler still prints a deprecation warning preferring `CLOUDFLARE_API_TOKEN`; harmless. Rename the var in `~/.env` if you want it gone.) To purge the CDN after a deploy: `curl -X POST "https://api.cloudflare.com/client/v4/zones/3d671dada34cb589cc78de7e9153408a/purge_cache" -H "Authorization: Bearer $CF_API_TOKEN" -H "Content-Type: application/json" -d '{"purge_everything":true}'`.

Live at: https://agentlab.illinihunt.org/ (Pages production alias: https://agentlab-8ot.pages.dev/)

**Domain wiring (fixed 2026-06-01):** `agentlab.illinihunt.org` is a **Pages custom domain** on the `agentlab` project, via a proxied `CNAME → agentlab-8ot.pages.dev` (same pattern as `canvas-mcp.illinihunt.org`) plus a null worker route to bypass `illinihunt-reverse-proxy`. `wrangler pages deploy` + this CNAME is the whole serving path.

Why deploys looked "broken" Apr 28–Jun 1: the custom domain used to be attached to a **separate Worker** named `agentlab` (last deployed 2026-04-28), which created a read-only `AAAA 100::` record and *owned the hostname*. Meanwhile the workflow had switched to `wrangler pages deploy` (this repo has no `wrangler.toml`). So every Pages deploy succeeded but went to a project nothing pointed at, while the domain kept serving the frozen Apr-28 Worker copy. Fix was: detach the worker custom domain → replace the `AAAA 100::` with `CNAME → agentlab-8ot.pages.dev` → the Pages custom domain serves current production. The orphaned `agentlab` **worker script** was left in place as a dormant fallback (no domain attached); safe to delete later.

**If a deploy ever stops showing on the live domain again:** confirm `agentlab.illinihunt.org` still resolves via `CNAME → agentlab-8ot.pages.dev` and isn't re-attached to a worker — `curl -s "https://api.cloudflare.com/client/v4/accounts/<acct>/workers/domains?hostname=agentlab.illinihunt.org" -H "Authorization: Bearer $OAUTH"` should return an empty result.

## Hosting

Cloudflare Pages via wrangler (not GitHub Pages — Actions is disabled on this account). Custom domain requires null worker route on `illinihunt.org` zone. See `~/.claude/projects/-Users-vishal-code-AgentLab/memory/cloudflare-illinihunt.md` for full setup.

## Structure

- `index.html` — Homepage with project showcase and latest news
- `projects.html` — All 14 projects with stats and tech tags
- Project detail pages: `venturebot.html`, `uniquick.html`, `pathshaper.html`, `canvas-mcp.html`, `illiniclaw.html`, `programos.html`, `giesclaw.html`, `inquiring-agents.html`, `cognitive-swarm.html`, `mindforum.html`, `hackclaw.html`, `text-2-sql.html`, `gieschat.html`, `project-claw.html`
- `team.html` — Current team (Spring 2026) + semester timeline
- `news.html` — News grid with filter buttons
- `news-posts/` — Individual news article pages
- `css/main.css` — Design system (navy `#13294B` + orange `#ff6900`)
- `js/main.js` — Mobile nav, back-to-top, news filters
- `assets/` — IlliniClaw logo SVG

## Adding or significantly updating a project

When a project is **added** (or changes significantly enough to announce — a launch, major feature, going live), update the whole surface, not just one file. Checklist:

1. **Detail page** — `<project>.html` (copy an existing one like `canvas-mcp.html` as the template).
2. **Cards** — add a card on `index.html` (homepage showcase) AND `projects.html`. The `projects.html` card's primary button links to the detail page ("Project Details" / "Learn More").
3. **News post** — `news-posts/YYYY-MM-<slug>-launch.html` (copy a recent post as the template). Always file a news item for a new project or a significant update.
4. **News listing** — add a `news-card` to the top of the grid in `news.html` (newest first).
5. **Homepage "Latest from AgentLab"** — feature the new post; keep it to 3 cards (drop the oldest).
6. **Footer "Projects" list** — add the project to the footer on **every** page (the list must stay in sync across all `*.html`, including `news-posts/*`).
7. **Deploy** — `npx wrangler pages deploy` + purge CDN cache (see Deploy section), then commit + push.

## Design System

Navy (`--navy: #13294B`) + orange (`--orange: #ff6900`). Hero sections use navy background with `radial-gradient` orange accent. Cards use borders, not heavy shadows. Buttons are rounded-rect (8px), not pill-shaped.

## Session Log

### 2026-07-03
- Completed: Added two new projects from `gies-ai-experiments` — **GiesChat** (self-hosted multi-model AI chat platform on LibreChat) and **ProjectClaw** (Slack project assistant with GitHub + Granola integration). Created `gieschat.html` and `project-claw.html` detail pages, added cards to `index.html` and `projects.html`, featured both launches in the homepage "Latest from AgentLab" section, wrote individual launch news posts (`news-posts/2026-07-gieschat-launch.html` and `news-posts/2026-07-projectclaw-launch.html`), added them to the top of `news.html`, and synced the project footer list across all 31 HTML pages. Deployed to Cloudflare Pages via `npx wrangler pages deploy` and committed + pushed to GitHub (`67ff159`, +917 lines across 31 files). Updated CLAUDE.md structure list to 14 projects and archived prior session log. Closed and deleted stale PR #4 (`claude/ai-scaling-proposal-jSa6o`).
- Next: None pending.

*Older entries archived to `docs/session-archive.md`.*
