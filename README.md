# Anirban Bairagya — Portfolio

A dark, techy personal portfolio built with React + Vite. Content is based on
your resume: education, skills, the Brain MRI Image Segmentation project, and
your internship at Ardent Computech.

## 1. Run it locally

You need [Node.js](https://nodejs.org) (v18+) installed. Then:

```bash
npm install
npm run dev
```

Open the URL it prints (usually http://localhost:5173).

## 2. Before you deploy — fill in the blanks

Search the code for these and update them with your real links:

- `src/components/Contact.jsx` — the GitHub / LinkedIn / LeetCode / GeeksforGeeks
  links currently point to `#`. Replace with your real profile URLs.
- `src/components/Projects.jsx` — the "Add your next project" card is a
  placeholder. Duplicate the flagship project block for any additional
  projects you want to show (college projects, hackathon builds, etc.).

## 3. Put it on GitHub

```bash
git init
git add .
git commit -m "Initial portfolio"
```

Create a new repo on [github.com/new](https://github.com/new) (e.g. `portfolio`),
then:

```bash
git remote add origin https://github.com/<your-username>/portfolio.git
git branch -M main
git push -u origin main
```

## 4. Deploy on Vercel (free)

1. Go to [vercel.com](https://vercel.com) and sign up / log in with your
   GitHub account.
2. Click **Add New → Project**.
3. Select your `portfolio` repo and click **Import**.
4. Vercel auto-detects Vite — leave the default build settings
   (Build Command: `vite build`, Output Directory: `dist`).
5. Click **Deploy**. In about a minute you'll get a live URL like
   `portfolio-yourname.vercel.app`.

Every time you `git push` to `main` after this, Vercel redeploys
automatically.

### Custom domain (optional)

In your Vercel project → **Settings → Domains**, you can attach a custom
domain like `anirbanbairagya.com` if you buy one later. Not required — the
free `.vercel.app` URL works fine for interviews.

## Project structure

```
src/
  components/   All page sections (Hero, About, Skills, Projects, ...)
  App.jsx        Assembles the sections in order
  index.css      All styling and design tokens (colors, fonts, spacing)
```

To change colors or fonts, edit the `:root` variables at the top of
`src/index.css`.
