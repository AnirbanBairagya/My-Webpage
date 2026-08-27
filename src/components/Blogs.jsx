import { useState } from 'react'
import BlogIcon from './BlogIcon.jsx'
import BlogModal from './BlogModal.jsx'

const BLOGS = [
  {
    id: 'medical-segmentation',
    icon: 'medical',
    status: 'Outline Ready',
    title: 'Demystifying 3D Medical Image Segmentation: A Deep Dive into Brain MRI Analysis',
    summary:
      'Handling complex volumetric data presents unique challenges in computer vision. This post explores the end-to-end pipeline of preprocessing 3D NIfTI formats, focusing on the BraTS dataset, and breaks down the architectural evolution from traditional U-Nets to SE-Dual-Attention and transformer-based models.',
    outline: [
      'Introduction — the critical role of automated tumor detection in modern healthcare, and the challenges of 3D volumetric data.',
      'Data Preprocessing — a walkthrough of handling the BraTS dataset: extracting and normalizing NIfTI files, and handling multiple modalities (T1, T1ce, T2, FLAIR).',
      'Architectural Deep Dive — why standard U-Net is the baseline, integrating Squeeze-and-Excitation (SE) blocks for channel-wise feature recalibration, and the shift toward transformer-based architectures for global context.',
      'Conclusion — real-world implications for radiologists and future scope of the project.',
    ],
    audience:
      'AI/ML researchers, computer vision engineers, and healthcare technology enthusiasts looking for technical depth in medical imaging.',
    tags: ['Deep Learning', 'Computer Vision', 'Python', 'Healthcare AI'],
    link: '',
  },
  {
    id: 'react-19',
    icon: 'code',
    status: 'Outline Ready',
    title: 'The Future of Frontend: Practical Implementations in React 19',
    summary:
      'The frontend ecosystem evolves rapidly, and staying ahead means understanding the practical impact of new framework updates. This article dissects the most impactful features in React 19 — new hooks, compiler optimizations, and performance improvements — bridging theory and production-ready strategy.',
    outline: [
      'Introduction — a brief history of React\u2019s evolution and why version 19 is a significant milestone.',
      'The React Compiler — how it eliminates the need for manual memoization (useMemo, useCallback) and optimizes re-renders automatically.',
      'Actions and Form Handling — new simplified ways to handle data mutations, pending states, and optimistic UI updates natively.',
      'New Hooks in Action — practical code snippets demonstrating the new \u2018use\u2019 hook for promises and context.',
      'Conclusion — migration strategies and why developers should adopt these features in their next project.',
    ],
    audience:
      'Frontend web developers, full-stack engineers, and open-source contributors looking to update their skill set.',
    tags: ['Frontend', 'ReactJS', 'Web Development', 'Performance'],
    link: '',
  },
  {
    id: 'genai-cx',
    icon: 'ai',
    status: 'Outline Ready',
    title: 'Beyond the Hype: Leveraging Generative AI to Revolutionize Customer Experience',
    summary:
      'AI is moving from abstract research to tangible business solutions. This post analyzes the strategic integration of GenAI in modern business workflows — how it can transform customer interactions, personalize user journeys, and streamline support systems, from a product-focused perspective.',
    outline: [
      'Introduction — defining the current landscape of AI-driven business solutions and moving past the \u201chype phase.\u201d',
      'The Paradigm Shift — comparing traditional rule-based chatbots with context-aware Large Language Models (LLMs).',
      'Architecting the Solution — designing a system that uses Retrieval-Augmented Generation (RAG) to ground AI responses in company-specific data.',
      'Pitching the Idea — structuring the business case, projected ROI, and scalability.',
      'Conclusion — ethical considerations, data privacy, and the future of human-AI collaboration in customer service.',
    ],
    audience:
      'Product managers, tech consultants, AI strategists, and participants in innovation hackathons or pitch competitions.',
    tags: ['Generative AI', 'Product Strategy', 'Business Tech', 'Innovation'],
    link: '',
  },
  {
    id: 'final-year-grind',
    icon: 'career',
    status: 'Outline Ready',
    title: 'The Final Year Grind: Balancing Major Projects and DSA for Placements',
    summary:
      'Navigating the final year of a computer science degree requires strategic time management. This reflective guide shares actionable strategies for balancing research-heavy major projects with the rigorous algorithm practice required for technical interviews, and a roadmap for campus placements.',
    outline: [
      'Introduction — the universal struggle of the final-year B.Tech student: managing academics, projects, and placement prep simultaneously.',
      'Time-Blocking Strategy — how to divide the week between building deep technical projects (like AI models) and grinding Data Structures and Algorithms.',
      'Leveraging Projects in Interviews — techniques for explaining complex architectures (e.g., U-Net models) clearly to recruiters at top IT service firms.',
      'The Power of Consistency — establishing a daily routine, tracking progress, and managing stress during placement season.',
      'Conclusion — final words of motivation and the importance of a well-rounded engineering portfolio.',
    ],
    audience:
      'Computer science engineering students, fresh graduates, and junior developers navigating the campus placement process.',
    tags: ['Career Advice', 'DSA', 'Placements', 'Engineering'],
    link: '',
  },
]

export default function Blogs() {
  const [active, setActive] = useState(null)

  return (
    <section id="blogs">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">Blogs</p>
          <h2>Notes &amp; write-ups.</h2>
          <p>Longer-form thoughts on what I'm building and what I'm learning.</p>
        </div>

        <div className="blogs-grid">
          {BLOGS.map((post) => (
            <button key={post.id} className="blog-card" onClick={() => setActive(post)}>
              <BlogIcon type={post.icon} />
              <span className="blog-card-status">{post.status}</span>
              <h3>{post.title}</h3>
              <p className="blog-card-excerpt">{post.summary}</p>
              <span className="view-more">Read outline &rarr;</span>
            </button>
          ))}
        </div>
      </div>

      <BlogModal post={active} onClose={() => setActive(null)} />
    </section>
  )
}
