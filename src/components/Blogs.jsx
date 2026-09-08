import { useEffect, useState } from 'react'
import BlogIcon from './BlogIcon.jsx'
import BlogModal from './BlogModal.jsx'
import { supabase } from '../lib/supabaseClient.js'

function rowToPost(row) {
  return {
    id: row.slug,
    icon: row.icon,
    status: row.status,
    title: row.title,
    summary: row.summary,
    outline: row.outline || [],
    audience: row.audience,
    tags: row.tags || [],
    image: row.image,
    link: row.link,
  }
}

export default function Blogs() {
  const [posts, setPosts] = useState([])
  const [status, setStatus] = useState('loading') // loading | ready | error
  const [active, setActive] = useState(null)

  useEffect(() => {
    let cancelled = false
    supabase
      .from('blog_posts')
      .select('*')
      .order('sort_order', { ascending: true })
      .then(({ data, error }) => {
        if (cancelled) return
        if (error) {
          console.error('Failed to load blog posts:', error)
          setStatus('error')
          return
        }
        setPosts((data || []).map(rowToPost))
        setStatus('ready')
      })
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <section id="blogs">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">Blogs</p>
          <h2>Notes &amp; write-ups.</h2>
          <p>Longer-form thoughts on what I'm building and what I'm learning.</p>
        </div>

        {status === 'loading' && <p className="modal-body-text">Loading posts…</p>}
        {status === 'error' && (
          <p className="modal-body-text">
            Couldn't load posts right now — please try refreshing the page.
          </p>
        )}

        {status === 'ready' && posts.length > 0 && (
          <div className="blogs-grid">
            {posts.map((post) => (
              <button key={post.id} className="blog-card" onClick={() => setActive(post)}>
                <BlogIcon type={post.icon} />
                <span className="blog-card-status">{post.status}</span>
                <h3>{post.title}</h3>
                <p className="blog-card-excerpt">{post.summary}</p>
                <span className="view-more">Read outline &rarr;</span>
              </button>
            ))}
          </div>
        )}

        {status === 'ready' && posts.length === 0 && (
          <div className="blog-placeholder">
            <span className="blog-placeholder-title">First post is in the works</span>
            <span className="blog-placeholder-sub">
              Check back soon — write-ups on my projects and what I'm learning will land here.
            </span>
          </div>
        )}
      </div>

      <BlogModal post={active} onClose={() => setActive(null)} />
    </section>
  )
}
