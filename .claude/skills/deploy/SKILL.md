---
name: deploy
description: Ships pending Novena website changes to the live site at www.estudionovena.com. Use when the user mentions deploy, publish, push it live, update the real site, or ship it. Handles build verification, commit, PR, merge, and confirming the change actually reached production.
version: 1.0.0
user-invocable: true
argument-hint: "[what changed]"
---

# Deploy the Novena site

Ben is not a developer. Act first, report in plain language, keep it short. Never
hand him git commands to run. The one exception is a GitHub login — credentials
must never pass through Claude.

| | |
|---|---|
| App | `web/` — Next.js 16, Tailwind v4 |
| Live | https://www.estudionovena.com — Vercel project `novena-soda-wip`, team `daniel-pliegos-projects`, account `hola@casasoda.com` (`hola-8635`) |
| Node | 24.0.0 via nvm — **required** |

Every shell touching node or npm needs this first, because nvm does not
auto-load in non-interactive shells:

```bash
export PATH="$HOME/.nvm/versions/node/v24.0.0/bin:$PATH"
```

## Steps

**1. Confirm what is shipping.** `git status --short` and
`git log --oneline origin/main..HEAD`. Describe it to Ben in plain language.
If nothing is pending, say so and stop.

**2. Verify the build before anything leaves the machine.**

```bash
export PATH="$HOME/.nvm/versions/node/v24.0.0/bin:$PATH"
cd web && npm run build
```

Success prints the route table with all six pages under `/en` and `/es`. If it
fails, stop and fix. Never push a red build.

**3. Commit on a branch.** Never commit straight to `main`. Write the message
around the user-visible symptom, not the code change.

**4. Push, PR, merge.**

```bash
git push -u origin <branch>
gh pr create --base main --title "..." --body "..."
gh pr merge <n> --squash --delete-branch
```

Merging to `main` is what makes it public. Confirm with Ben before merging
unless he has already said to go live in this session.

**5. Verify it reached production — do not skip.** A successful merge does not
mean the change is live. Diff the served stylesheet against something unique to
the change:

```bash
CSS=$(curl -s https://www.estudionovena.com/es | grep -o '/_next/static/[^"]*\.css' | head -1)
curl -s "https://www.estudionovena.com$CSS" | grep -c '<string unique to the change>'
```

Poll every 30s for a few minutes, then report honestly whether it landed.

## Known traps

**There are two dead Vercel projects — never use them.** `novena-pied.vercel.app`
(org `srshadids-projects`) and `novena-soda.vercel.app` are old, abandoned
projects. The only real production is `novena-soda-wip` serving
https://www.estudionovena.com. Anything that mentions novena-pied is outdated.

**If merging to `main` does not trigger a build**, the project's GitHub
connection may be missing (it was disconnected once before — that caused a
month of stale production in July 2026). Check with
`vercel api /v9/projects/prj_gZiHzWSXV3gHM66IyO0qixo0bDeN` — the `link` field
must reference `Sons-of-Designarchy/novena`; reconnect with
`cd web && vercel git connect`. Manual fallback that always works:
`cd web && vercel deploy --prod --yes` (requires `vercel whoami` → `hola-8635`;
if it shows another account, hand over `vercel login` — never handle
credentials).

**GitHub auth.** `gh` is authenticated as `estudionovena`, granted Write on
2026-07-24. If a push 403s, check
`gh api repos/Sons-of-Designarchy/novena --jq '.permissions'`. Never type a
password, token, or 2FA code for him — hand him `gh auth login`.

**The type scale is customised.** `web/app/globals.css` redefines Tailwind's
sizes: `--text-2xl` is 30px and `--text-3xl` is 38px. Never reason about text
widths from stock Tailwind values.

**Stale CSS in the browser.** After a local change a normal reload often keeps
the old stylesheet. Tell Ben to hard-reload with `Cmd + Shift + R` before he
concludes a fix did not work.
