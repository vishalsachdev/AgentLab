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

### 2026-06-02
- Completed: **Fixed the months-long "deploy blocked" bug — root cause was a domain/serving mismatch, not the token.** `agentlab.illinihunt.org` was attached as a custom domain to a **separate Worker** named `agentlab` (last deployed 2026-04-28, read-only `AAAA 100::` record) that *owned the hostname*, while the workflow had switched to `wrangler pages deploy` (Pages project `agentlab` → `agentlab-8ot.pages.dev`). So every Pages deploy succeeded but went nowhere visible. Fix: detached the worker custom domain → replaced `AAAA 100::` with proxied `CNAME → agentlab-8ot.pages.dev` (mirrors canvas-mcp) → Pages now serves the domain. Orphan `agentlab` worker script left as dormant fallback. Also updated `programos.html` (marked Teams + Copilot Studio dormant in the K-ai diagram; "five channels" → "five channels wired (three active today)") and `news-posts/2026-04-programos-launch.html` (curriculum→program repo rename, broken skeleton path, Six→Ten docs, CURRICULUM.md→CONCEPT.md). User rolled `CF_API_TOKEN` with correct scopes (Pages:Edit + Account Settings:Read + User Details:Read + DNS:Edit + Cache Purge) — `wrangler pages deploy` now works directly, no `env -u` workaround. Live site verified fresh; cache purged.
- Next: Optional cleanup — Pages custom-domain status API may still read `pending` (cosmetic; CNAME serves correctly, will flip to active or clear via dashboard "Retry"); orphan `agentlab` worker script can be deleted once fallback no longer wanted; rename `CF_API_TOKEN`→`CLOUDFLARE_API_TOKEN` in `~/.env` to silence wrangler's deprecation warning.

*Older entries archived to `docs/session-archive.md`.*
