import { useState } from 'react'

function arrayToLines(arr) {
  return Array.isArray(arr) ? arr.join('\n') : ''
}
function linesToArray(text) {
  return text
    .split('\n')
    .map((s) => s.trim())
    .filter(Boolean)
}

const emptyForm = {
  slug: '',
  sort_order: 0,
  icon: 'code',
  status: '',
  title: '',
  summary: '',
  outline: '',
  audience: '',
  tags: '',
  image: '',
  link: '',
}

export function blogRowToForm(row) {
  if (!row) return emptyForm
  return {
    slug: row.slug || '',
    sort_order: row.sort_order ?? 0,
    icon: row.icon || 'code',
    status: row.status || '',
    title: row.title || '',
    summary: row.summary || '',
    outline: arrayToLines(row.outline),
    audience: row.audience || '',
    tags: arrayToLines(row.tags),
    image: row.image || '',
    link: row.link || '',
  }
}

export default function BlogForm({ initial, onSave, onCancel, saving }) {
  const [form, setForm] = useState(initial || emptyForm)

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    onSave({
      slug: form.slug.trim(),
      sort_order: Number(form.sort_order) || 0,
      icon: form.icon,
      status: form.status,
      title: form.title,
      summary: form.summary,
      outline: linesToArray(form.outline),
      audience: form.audience,
      tags: linesToArray(form.tags),
      image: form.image,
      link: form.link,
    })
  }

  return (
    <form className="admin-form" onSubmit={handleSubmit}>
      <div className="admin-form-grid">
        <label className="admin-field">
          <span>Slug (unique ID, no spaces) *</span>
          <input
            value={form.slug}
            onChange={(e) => update('slug', e.target.value)}
            placeholder="my-new-post"
            required
          />
        </label>
        <label className="admin-field">
          <span>Sort order (lower = shown first)</span>
          <input
            type="number"
            value={form.sort_order}
            onChange={(e) => update('sort_order', e.target.value)}
          />
        </label>
      </div>

      <label className="admin-field">
        <span>Title *</span>
        <input value={form.title} onChange={(e) => update('title', e.target.value)} required />
      </label>

      <div className="admin-form-grid">
        <label className="admin-field">
          <span>Icon</span>
          <select value={form.icon} onChange={(e) => update('icon', e.target.value)}>
            <option value="medical">Medical</option>
            <option value="code">Code</option>
            <option value="ai">AI / Chat</option>
            <option value="career">Career</option>
          </select>
        </label>
        <label className="admin-field">
          <span>Status</span>
          <input
            value={form.status}
            onChange={(e) => update('status', e.target.value)}
            placeholder="e.g. Outline Ready, Published"
          />
        </label>
      </div>

      <label className="admin-field">
        <span>Summary</span>
        <textarea rows={3} value={form.summary} onChange={(e) => update('summary', e.target.value)} />
      </label>

      <label className="admin-field">
        <span>Structural Outline — one point per line</span>
        <textarea rows={5} value={form.outline} onChange={(e) => update('outline', e.target.value)} />
      </label>

      <label className="admin-field">
        <span>Target Audience</span>
        <textarea rows={2} value={form.audience} onChange={(e) => update('audience', e.target.value)} />
      </label>

      <label className="admin-field">
        <span>Tags — one per line</span>
        <textarea rows={3} value={form.tags} onChange={(e) => update('tags', e.target.value)} />
      </label>

      <div className="admin-form-grid">
        <label className="admin-field">
          <span>Image path (optional)</span>
          <input
            value={form.image}
            onChange={(e) => update('image', e.target.value)}
            placeholder="/blog-images/my-post.png"
          />
        </label>
        <label className="admin-field">
          <span>Link (optional, once published)</span>
          <input value={form.link} onChange={(e) => update('link', e.target.value)} />
        </label>
      </div>

      <div className="admin-form-actions">
        <button type="submit" className="btn btn-primary" disabled={saving}>
          {saving ? 'Saving…' : 'Save post'}
        </button>
        <button type="button" className="btn btn-ghost" onClick={onCancel} disabled={saving}>
          Cancel
        </button>
      </div>
    </form>
  )
}
