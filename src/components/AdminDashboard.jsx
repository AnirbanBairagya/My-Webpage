import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient.js'
import ProjectForm, { projectRowToForm } from './ProjectForm.jsx'
import BlogForm, { blogRowToForm } from './BlogForm.jsx'

export default function AdminDashboard({ session, onLogout }) {
  const [tab, setTab] = useState('projects') // 'projects' | 'blogs'

  const [projects, setProjects] = useState([])
  const [blogPosts, setBlogPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [notice, setNotice] = useState('')

  const [editingProject, setEditingProject] = useState(undefined) // undefined = list view, null = new, object = editing
  const [editingBlog, setEditingBlog] = useState(undefined)
  const [saving, setSaving] = useState(false)

  async function loadAll() {
    setLoading(true)
    const [projectsRes, blogsRes] = await Promise.all([
      supabase.from('projects').select('*').order('sort_order', { ascending: true }),
      supabase.from('blog_posts').select('*').order('sort_order', { ascending: true }),
    ])
    if (!projectsRes.error) setProjects(projectsRes.data || [])
    if (!blogsRes.error) setBlogPosts(blogsRes.data || [])
    setLoading(false)
  }

  useEffect(() => {
    loadAll()
  }, [])

  function flashNotice(msg) {
    setNotice(msg)
    setTimeout(() => setNotice(''), 3000)
  }

  // ---------- Projects ----------
  async function saveProject(payload) {
    setSaving(true)
    const isEdit = editingProject && editingProject.id
    const query = isEdit
      ? supabase.from('projects').update(payload).eq('id', editingProject.id)
      : supabase.from('projects').insert(payload)

    const { error } = await query
    setSaving(false)

    if (error) {
      flashNotice(`Error: ${error.message}`)
      return
    }
    flashNotice(isEdit ? 'Project updated.' : 'Project added.')
    setEditingProject(undefined)
    loadAll()
  }

  async function deleteProject(row) {
    if (!confirm(`Delete "${row.title}"? This can't be undone.`)) return
    const { error } = await supabase.from('projects').delete().eq('id', row.id)
    if (error) {
      flashNotice(`Error: ${error.message}`)
      return
    }
    flashNotice('Project deleted.')
    loadAll()
  }

  // ---------- Blog posts ----------
  async function saveBlog(payload) {
    setSaving(true)
    const isEdit = editingBlog && editingBlog.id
    const query = isEdit
      ? supabase.from('blog_posts').update(payload).eq('id', editingBlog.id)
      : supabase.from('blog_posts').insert(payload)

    const { error } = await query
    setSaving(false)

    if (error) {
      flashNotice(`Error: ${error.message}`)
      return
    }
    flashNotice(isEdit ? 'Post updated.' : 'Post added.')
    setEditingBlog(undefined)
    loadAll()
  }

  async function deleteBlog(row) {
    if (!confirm(`Delete "${row.title}"? This can't be undone.`)) return
    const { error } = await supabase.from('blog_posts').delete().eq('id', row.id)
    if (error) {
      flashNotice(`Error: ${error.message}`)
      return
    }
    flashNotice('Post deleted.')
    loadAll()
  }

  return (
    <div className="admin-shell">
      <header className="admin-header">
        <div>
          <p className="eyebrow">Admin</p>
          <h1>Portfolio content</h1>
        </div>
        <div className="admin-header-right">
          <span className="admin-session-email">{session.user.email}</span>
          <button className="btn btn-ghost" onClick={onLogout}>
            Log out
          </button>
        </div>
      </header>

      {notice && <div className="admin-notice">{notice}</div>}

      <div className="view-toggle admin-tabs" role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected={tab === 'projects'}
          className={tab === 'projects' ? 'active' : ''}
          onClick={() => setTab('projects')}
        >
          Projects
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={tab === 'blogs'}
          className={tab === 'blogs' ? 'active' : ''}
          onClick={() => setTab('blogs')}
        >
          Blog Posts
        </button>
      </div>

      {loading ? (
        <p className="modal-body-text">Loading…</p>
      ) : tab === 'projects' ? (
        editingProject !== undefined ? (
          <>
            <h2 className="admin-form-title">
              {editingProject ? `Edit: ${editingProject.title}` : 'New project'}
            </h2>
            <ProjectForm
              initial={projectRowToForm(editingProject)}
              saving={saving}
              onSave={saveProject}
              onCancel={() => setEditingProject(undefined)}
            />
          </>
        ) : (
          <>
            <button className="btn btn-primary admin-add-btn" onClick={() => setEditingProject(null)}>
              + Add new project
            </button>
            <div className="admin-list">
              {projects.length === 0 && <p className="modal-body-text">No projects yet.</p>}
              {projects.map((p) => (
                <div className="admin-list-row" key={p.id}>
                  <div>
                    <strong>{p.title}</strong>
                    <span className="admin-list-meta">{p.status}</span>
                  </div>
                  <div className="admin-list-actions">
                    <button className="btn btn-ghost" onClick={() => setEditingProject(p)}>
                      Edit
                    </button>
                    <button className="btn btn-ghost admin-danger" onClick={() => deleteProject(p)}>
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )
      ) : editingBlog !== undefined ? (
        <>
          <h2 className="admin-form-title">{editingBlog ? `Edit: ${editingBlog.title}` : 'New post'}</h2>
          <BlogForm
            initial={blogRowToForm(editingBlog)}
            saving={saving}
            onSave={saveBlog}
            onCancel={() => setEditingBlog(undefined)}
          />
        </>
      ) : (
        <>
          <button className="btn btn-primary admin-add-btn" onClick={() => setEditingBlog(null)}>
            + Add new post
          </button>
          <div className="admin-list">
            {blogPosts.length === 0 && <p className="modal-body-text">No posts yet.</p>}
            {blogPosts.map((b) => (
              <div className="admin-list-row" key={b.id}>
                <div>
                  <strong>{b.title}</strong>
                  <span className="admin-list-meta">{b.status}</span>
                </div>
                <div className="admin-list-actions">
                  <button className="btn btn-ghost" onClick={() => setEditingBlog(b)}>
                    Edit
                  </button>
                  <button className="btn btn-ghost admin-danger" onClick={() => deleteBlog(b)}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
