# Getting Started — Novena, with Claude Code (Desktop App)

Welcome! This guide gets you from zero to **changing the Novena website by just typing what you want**. You don't need to know how to code. You'll use the **Claude Code desktop app**, and your whole job is to describe what you want — Claude does the rest.

Read this top to bottom once. It takes about 15 minutes to set up, and then you're prompting.

---

## 🚀 Just want to start? Paste this.

Once the Claude Code desktop app is installed and you've opened the `~/projects/novena` folder (see "One-time setup" below if you haven't), **copy the whole block below and paste it as your first message to Claude.** It will take it from there — start the site, give you a link, and walk you through the rest.

```
I'm new here and I'm going to work on this Novena website by describing what I
want in plain language — I don't code. Please be my guide.

Do this now, in order:
1. Make sure we're on Node 24.0.0 (run `nvm use 24.0.0`), then start the dev
   server and give me a clickable URL to open in my browser.
2. If the site looks broken or unstyled, reinstall clean on Node 24.0.0 and
   restart before handing me the URL.
3. Once it's running, give me a 3-bullet tour of what pages this site has.
4. Then tell me — in one short paragraph — how to work with you: that I just
   describe what I want, look at my browser, and describe again; that I can
   paste screenshots when something looks off; and that I can't break the real
   site because everything is local until we publish.

Keep your answers short. Act first, explain in one line. Don't ask me for
approval on small stuff — just do it and tell me what you did.
```

That's genuinely all you need to get moving. The rest of this doc is reference for when you want to go deeper.

---

## What you're working on

**Novena** is the website for Estudio Novena, a recording studio in Mexico City. It's live at https://novena-pied.vercel.app. Your changes happen on a copy running **on your own computer** first (nobody sees them until we decide to publish), so you can experiment freely — you can't break the real site.

The site is bilingual (Spanish + English) and design is what matters most here. This project is built for people who describe design in words.

---

## One-time setup

You only do this section **once**. After that, skip straight to "Your daily routine."

### 1. Install the tools (ask someone technical to help with this part if you get stuck — it's ~10 min)

You need three things installed on your Mac:

1. **The Claude Code desktop app** — download it from the link your team shares with you, and sign in with your Claude account.
2. **Git** — this is what copied the project onto the computer. It's usually already installed on a Mac. (Type `git --version` in the Terminal app; if it prints a version, you're fine.)
3. **Node 24** — this runs the website locally. See the note below.

> **The one rule that saves headaches: always Node 24.0.0.**
> If the site won't start or the styling looks broken, 90% of the time it's the wrong Node version. The fix is one command (Claude can run it for you): `nvm use 24.0.0`. You don't need to memorize this — just know that "Node 24.0.0" is the magic version, and if anything looks off, tell Claude *"make sure we're on Node 24.0.0."*

### 2. Get the project onto your computer

The project already lives at:

```
~/projects/novena
```

(That's shorthand for a folder called `projects` in your home folder, with `novena` inside it.) If it's not there, tell Claude:

> Clone git@github.com:Sons-of-Designarchy/novena.git into my projects folder.

### 3. Point the desktop app at the project

In the Claude Code desktop app, **open the folder** `~/projects/novena`. There's usually an "Open folder" or "Open project" button on the welcome screen. This is important — it's how Claude knows *which* project you're talking about. From now on, everything you type is in the context of Novena.

---

## Your daily routine

Every time you sit down to work, it's the same three moves.

### Step 1 — Open the project

Open the Claude Code desktop app and open the `~/projects/novena` folder (it may remember it from last time).

### Step 2 — Start the website

Type this to Claude, exactly:

> Start the Novena dev server on Node 24.0.0 and tell me the URL.

Claude will start it and give you a link like **http://localhost:3001/en**. Open that link in your browser (Chrome or Safari). That's the live copy of the site running on your machine. Leave that browser tab open — it updates automatically as you make changes.

> If the site opens but looks unstyled/broken, tell Claude: *"reinstall clean on Node 24.0.0 and restart."* That fixes the most common setup issue.

### Step 3 — Prompt your changes

Now just **describe what you want**, in plain language. Claude edits the site, and your browser tab updates within a second or two. Look at the result, and prompt again.

That's the whole loop: **describe → look at the browser → describe again.**

When you're done for the day, you can just close the app. To publish changes for real, hand off to someone technical (or ask Claude to walk you through it) — you don't publish by accident.

---

## How to prompt well

This is the actual skill. Claude is good, but it's not a mind reader — the clearer you are about *intent*, the better the result.

### Say what you want, not how to build it

You're the designer, not the engineer. Talk about the **result you want to see**, not the code.

- ✅ "Make the studio name in the header bigger and bolder — it should feel like the main event."
- ❌ "Change the font-size to 48px and font-weight to 700." *(You can do this too, but you don't have to.)*

### Point at things

Say **where** on the page. "The header," "the contact form," "the big photo at the top," "the footer links." If you can, describe it the way a visitor would see it.

### Show, don't just tell

If something looks wrong, **take a screenshot and paste it into the chat.** A picture of the problem is worth ten sentences. Claude will look at it and fix it — you don't even need to explain what's wrong, just paste it and say "fix this" or "this spacing looks off."

*(To screenshot on Mac: `Cmd + Shift + 4`, then drag over the area. It saves to your Desktop; drag it into the chat.)*

### One change at a time (at first)

Until you're comfortable, ask for **one thing**, look at it, then ask for the next. It's easier to see what changed and undo if you don't like it.

### If you don't like a change

Just say so: *"undo that,"* or *"no, go back — I liked it before,"* or *"that's too much, make it subtler."* You can always reverse course. Nothing is permanent until it's published.

---

## Special power: design skills

This project has built-in **design skills** — think of them as expert modes you can invoke by name. You trigger one by typing a slash-command or just naming it. The most useful ones:

| Say this | What it does |
|---|---|
| `/polish` (or "polish this") | Final cleanup pass — fixes alignment, spacing, little inconsistencies. Use before you consider something done. |
| "make it bolder" | Amplifies a bland/safe design — more visual impact and personality. |
| "add some delight" | Adds tasteful micro-interactions and personality. |
| "fix the layout" | Improves spacing, hierarchy, and composition when something feels crowded or off. |
| "critique this page" | Claude reviews the design like a UX expert and tells you what's weak. Great when you're not sure what's wrong. |
| "fix the typography" | Improves fonts, sizing, and text hierarchy. |

You don't have to use these — plain English works fine. But when you want a focused, expert-level pass on one dimension (spacing, type, boldness), naming the skill gets you a sharper result.

Not sure which to use? Just describe the feeling you're after ("this section feels boring," "the text is hard to read," "something's off but I can't tell what") and Claude will pick the right approach.

---

## Good starter prompts to try

Copy these to get a feel for it:

- *"Give me a quick tour of what pages this site has."*
- *"Show me the homepage in my browser and walk me through what's on it."*
- *"The hero section feels flat — make it bolder and more striking."*
- *"Critique the contact page and tell me the three biggest problems."*
- *"Polish the whole homepage — spacing, alignment, all the small stuff."*
- *"The English and Spanish versions should match — check that nothing's out of sync."*

---

## When something goes wrong

Don't panic and don't try to fix it manually. Tell Claude what you see. Copy-paste these if they fit:

| What happened | Say this to Claude |
|---|---|
| Site won't start | "Start the dev server on Node 24.0.0 and show me any errors." |
| Site looks unstyled / broken CSS | "Reinstall clean on Node 24.0.0 and restart the dev server." |
| A change made it worse | "Undo the last change." |
| You're lost | "Where are we? Summarize what we've done and what's running." |
| Anything you don't understand | Just paste the error or a screenshot and say "what's this / fix this." |

**You cannot break the real website from here.** Everything you do is on your local copy until someone deliberately publishes it. Experiment freely.

---

## The 30-second version

1. Open the **Claude Code desktop app**, open the `~/projects/novena` folder.
2. Type: *"Start the Novena dev server on Node 24.0.0 and give me the URL."* Open that URL in your browser.
3. **Describe what you want** → look at the browser → describe again.
4. Paste screenshots when something looks off.
5. Say *"polish this"* before calling anything done.
6. Stuck? Paste the error, say "fix this."

That's it. Welcome aboard.
