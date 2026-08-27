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
        <div className="section-head">
          <p className="eyebrow">Blogs</p>
          <h2>Notes &amp; write-ups.</h2>
          <p>Longer-form thoughts on what I'm building and what I'm learning.</p>
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
                  <span className="blog-date">{post.date}</span>
                  <h3>{post.title}</h3>
                </a>
              ))}
            </div>
            <a href="#" className="all-blogs-link">View all posts &rarr;</a>
          </>
        ) : (
          <div className="blog-placeholder">
            <span className="blog-placeholder-title">First post is in the works</span>
            <span className="blog-placeholder-sub">
              Check back soon — write-ups on my projects and what I'm learning will land here.
            </span>
          </div>
        )}
      </div>
    </section>
  )
}
