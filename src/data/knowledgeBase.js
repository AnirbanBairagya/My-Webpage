// Knowledge base for the portfolio chat widget.
// Kept as a single template string, separate from api/chat.js, so it's easy
// to update as projects/skills change without touching the request logic.
// Keep this concise: it's sent as context on every single request, so its
// length directly affects both response latency and (if you ever move off a
// free tier) cost.

export const KNOWLEDGE_BASE = `
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
