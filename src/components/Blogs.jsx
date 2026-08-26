const BLOGS = [
  // Add posts here as you write them, e.g.:
  // {
  //   date: '25/05/2026',
  //   title: 'Escaping Unity Spaghetti Code: A Guide to Event-Driven Architecture',
  //   link: 'https://your-blog-url.com/post-slug',
  // },
]

export default function Blogs() {
  return (
    <section id="blogs">
      <div className="container">
        <div className="blogs-head">
          <span className="blogs-label">
            <span className="chev">&gt;</span> blogs: <span className="count">[{BLOGS.length}]</span>
          </span>
        </div>

        {BLOGS.length > 0 ? (
          <>
            <div className="blogs-grid">
              {BLOGS.map((post, i) => (
                <a
                  key={i}
                  href={post.link || '#'}
                  target={post.link ? '_blank' : undefined}
                  rel={post.link ? 'noopener noreferrer' : undefined}
                  className="blog-card"
                >
                  <span className="blog-date"><span className="chev">&gt;</span> {post.date}</span>
                  <h3>{post.title}</h3>
                </a>
              ))}
            </div>
            <a href="#" className="all-blogs-link">ALL_BLOGS &gt;</a>
          </>
        ) : (
          <div className="blog-placeholder">
            <span>+ Comming soon</span>
            <span style={{ color: 'var(--text-dim)', fontSize: '0.78rem' }}>
              Blogs will be update soon. Hurry up!
            </span>
          </div>
        )}
      </div>
    </section>
  )
}
