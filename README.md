# WSET Level 3 Interactive Wine Atlas

Interactive study atlas with 24 cartographic maps, 150+ village markers, sparkling & fortified wine sections, and exam prep quizzes.

## Quick Setup (15 minutes)

### Step 1: Install Prerequisites

You need **Node.js** (v18+) and **Git** installed.

- **Node.js**: Download from https://nodejs.org (choose LTS version)
- **Git**: Download from https://git-scm.com

To verify they're installed, open Terminal (Mac) or Command Prompt (Windows):
```bash
node --version    # should show v18 or higher
git --version     # should show a version number
```

### Step 2: Create a GitHub Account & Repository

1. Go to https://github.com and sign up (or log in)
2. Click the **+** button (top right) → **New repository**
3. Name it `wset-atlas`
4. Keep it **Public** (required for free Vercel hosting)
5. **Don't** check any boxes (no README, no .gitignore — we have them)
6. Click **Create repository**
7. You'll see a page with setup instructions — keep this page open

### Step 3: Upload This Project to GitHub

Open Terminal/Command Prompt and run these commands one by one:

```bash
# Navigate to where you downloaded/unzipped this project
cd path/to/wset-atlas

# Initialize git and push to GitHub
git init
git add .
git commit -m "Initial WSET L3 Atlas"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/wset-atlas.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

> **Tip**: GitHub may ask you to authenticate. Use a Personal Access Token:
> Go to GitHub → Settings → Developer Settings → Personal Access Tokens → Generate New Token

### Step 4: Deploy on Vercel (Free)

1. Go to https://vercel.com and click **Sign Up** → **Continue with GitHub**
2. Click **Add New Project**
3. Find and select your `wset-atlas` repository
4. Vercel auto-detects it's a Vite project — leave all settings as default
5. Click **Deploy**
6. Wait ~60 seconds — you'll get a live URL like `wset-atlas.vercel.app`

**That's it!** Your atlas is now live and accessible from any device.

### Step 5: Future Updates

When I give you updated files in Claude:

```bash
# Copy the updated file(s) into the project folder
# Then:
cd path/to/wset-atlas
git add .
git commit -m "Update description here"
git push
```

Vercel automatically redeploys on every push — your site updates within 60 seconds.

## Local Development (Optional)

To run it locally on your machine:

```bash
cd wset-atlas
npm install
npm run dev
```

Opens at `http://localhost:5173`

## Project Structure

```
wset-atlas/
├── index.html          ← HTML entry point
├── package.json        ← Dependencies
├── vite.config.js      ← Build config
└── src/
    ├── main.jsx        ← React bootstrap
    └── App.jsx         ← The entire atlas (can be split later)
```

## Splitting Into Multiple Files (Future)

Once hosted, we can split App.jsx into separate files with no size limit:
- `src/data/guide.js` — Study guide content
- `src/data/maps.js` — All 24 cartographic sub-maps
- `src/data/sparkling.js` — Sparkling wine data
- `src/data/fortified.js` — Fortified wine data
- `src/components/MapSVG.jsx` — Map renderer
- `src/components/SparklingPage.jsx` — Sparkling section
- etc.
