// api/chat.js
//
// Vercel Serverless Function. Anything in /api at the project root is
// automatically deployed as its own server-side endpoint — this code never
// ships to the browser, which is what keeps GEMINI_API_KEY safe.
//
// Flow: browser POSTs { messages: [...] } -> this function adds the system
// prompt + knowledge base -> calls Gemini -> returns just the reply text.

const KNOWLEDGE_BASE = `
ANIRBAN BAIRAGYA — Portfolio Knowledge Base

SUMMARY
Computer Science & Engineering student (B.Tech, Dr. B. C. Roy Engineering
College, Durgapur, Oct 2024–present) based in Burdwan, West Bengal, India.
Background in Python, Java, and Machine Learning, with full-stack backend
experience using MySQL and Agile/SDLC practices. Currently looking for an
Associate Software Engineer or Machine Learning role.

EDUCATION
- B.Tech, Computer Science & Engineering — Dr. B. C. Roy Engineering College,
  Durgapur. Oct 2024–present.
- Diploma, Computer Science & Technology — Dr. B. C. Roy Polytechnic,
  Durgapur. Dec 2021–Jul 2024. First Class, 84.7%.
- Secondary (WBBSE). Jan 2018–Jun 2019. 72.5%.

SKILLS
Languages: Python, Java. Databases: MySQL. ML/DL: Machine Learning, Deep
Learning, PyTorch, 3D CNNs (SegResNet-based architectures), Data
Preprocessing, statistical significance testing. Tools: Git, GitHub, Agile
SDLC. Spoken languages: English, Hindi, Bengali.

EXPERIENCE
Python Programming Intern — Ardent Computech Pvt. Ltd. (Dec 2022–Jan 2023).
Wrote custom Python scripts and built data pipelines from scratch; worked as
part of a team following SDLC and Git-based version control.

PROJECT 1 — Reliable AI-Assisted Brain Tumor Segmentation (Major Project,
B.Tech CSE, in progress since Jan 2026)
A deep learning system that segments brain tumors from multi-modal MRI scans
(T1, T1CE, T2, FLAIR) using a SegResNet-based 3D CNN, trained and
cross-validated on the public TCGA-GBM dataset. Goes beyond standard
segmentation by also estimating the reliability of its own predictions
(without needing ground truth), so a limited radiologist review budget can
be prioritized toward the cases that need it most. Includes a self-refinement
step that improves weak spots without extra manual annotation, and is
evaluated with a locked test set, paired statistical significance testing,
and comparison against the nnU-Net baseline. Stack: Python, PyTorch, 3D CNN
(SegResNet), NiBabel, NumPy/SciPy, scikit-learn, Matplotlib.

PROJECT 2 — Pocket Heritage: AR Cultural Heritage Platform (Team project,
Smart India Hackathon 2025, work in progress)
An open-source AR app for visualizing high-fidelity 3D cultural heritage
sites in the real world, built with enterprise-level full-stack principles
rather than a typical single-purpose Unity prototype. Uses Unity Addressables
to stream 3D models on demand from a Netlify-hosted CDN (keeping install size
small), Firebase Firestore for cloud-driven metadata so site info can update
without a new app release, a centralized event bus to decouple UI/data/AR
layers, and a stack-based (LIFO) state machine for navigation. Stack: C#,
Unity, AR Foundation (ARCore/ARKit), Firebase Firestore, Unity Addressables,
Netlify, Git & Git LFS.

BLOG TOPICS (outlines written, articles not yet published)
1. Demystifying 3D Medical Image Segmentation — a deep dive into brain MRI
   analysis, BraTS preprocessing, and the U-Net to SE-attention evolution.
2. The Future of Frontend — practical React 19 features: the compiler,
   Actions, and the new 'use' hook.
3. Beyond the Hype — using Generative AI (RAG + LLMs) to improve customer
   experience.
4. The Final Year Grind — balancing major projects and DSA prep for campus
   placements.

INTERESTS
Active on LeetCode and GeeksforGeeks. Participated in Smart India Hackathon
(SIH) 2025. Enjoys travelling between builds.

CONTACT
Don't recite the phone number or email directly in your reply. Instead,
point people to the Contact section of the site (or say they can use the
"Get in touch" button in the navigation) to reach Anirban directly.
`.trim()

const SYSTEM_PROMPT = `You are the AI assistant embedded in Anirban Bairagya's portfolio website. You answer visitors' questions about Anirban — his skills, education, projects, and experience — using ONLY the knowledge base below.

Rules:
- Speak about Anirban in the third person (he/his), like a knowledgeable assistant introducing him — not as if you are Anirban.
- Base every factual claim on the knowledge base. If something isn't in it, say you don't have that detail and suggest reaching out via the Contact section — never invent details.
- Keep answers short: 2-4 sentences for most questions. Only go longer if the visitor explicitly asks for more depth on something.
- This widget exists to help recruiters and visitors learn about Anirban. If asked something unrelated (general homework help, unrelated coding questions, requests to write essays, etc.), politely decline and steer back to what you can help with — his background and projects.
- Do not recite the phone number or email address directly; point to the Contact section instead.

KNOWLEDGE BASE:
${KNOWLEDGE_BASE}`

// Very lightweight per-instance rate limit. This resets whenever the
// serverless function cold-starts (i.e. it is NOT a durable, cross-instance
// limit) — it's a first line of defense against casual abuse, not a
// production-grade guarantee. For stronger guarantees, back this with
// Vercel KV or Upstash Redis instead of an in-memory Map.
const RATE_LIMIT_WINDOW_MS = 60_000
const RATE_LIMIT_MAX = 8
const rateLimitStore = globalThis.__chatRateLimit || new Map()
globalThis.__chatRateLimit = rateLimitStore

function isRateLimited(ip) {
  const now = Date.now()
  const entry = rateLimitStore.get(ip) || { count: 0, windowStart: now }
  if (now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
    entry.count = 0
    entry.windowStart = now
  }
  entry.count += 1
  rateLimitStore.set(ip, entry)
  return entry.count > RATE_LIMIT_MAX
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const ip = (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'unknown'
  if (isRateLimited(ip)) {
    return res.status(429).json({
      error: "You're sending messages a bit fast — please wait a minute and try again.",
    })
  }

  const { messages } = req.body || {}
  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'messages array is required' })
  }
  if (messages.length > 20) {
    return res.status(400).json({ error: 'Conversation is too long for this demo widget.' })
  }

  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    console.error('GEMINI_API_KEY is not set in the environment')
    return res.status(500).json({
      error: 'The chat widget is not configured yet — missing API key on the server.',
    })
  }

  // Gemini's API expects "model" instead of "assistant" for the AI turn.
  const contents = messages
    .filter((m) => m && typeof m.content === 'string' && m.content.trim())
    .map((m) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content.slice(0, 2000) }], // guard against extreme-length input
    }))

  try {
    const upstream = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
          contents,
          generationConfig: {
            maxOutputTokens: 350,
            temperature: 0.4,
          },
        }),
      }
    )

    if (!upstream.ok) {
      const errText = await upstream.text()
      console.error('Gemini API error:', upstream.status, errText)
      return res.status(502).json({ error: 'The AI service had a problem — please try again.' })
    }

    const data = await upstream.json()
    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim()

    if (!reply) {
      return res.status(502).json({ error: "Didn't get a response back — please try again." })
    }

    return res.status(200).json({ reply })
  } catch (err) {
    console.error('Chat handler error:', err)
    return res.status(500).json({ error: 'Something went wrong on the server.' })
  }
}
