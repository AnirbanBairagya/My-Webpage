import { useState } from 'react'

// Array fields (capabilities, impact, stack, tags, etc.) are edited as
// one item per line in a plain textarea rather than a dynamic add/remove
// list widget — far less code, and perfectly usable for a single-admin
// internal tool where you're comfortable typing.
function arrayToLines(arr) {
  return Array.isArray(arr) ? arr.join('\n') : ''
}
function linesToArray(text) {
  return text
    .split('\n')
    .map((s) => s.trim())
    .filter(Boolean)
}

function jsonToText(obj) {
  if (!obj) return ''
  try {
    return JSON.stringify(obj, null, 2)
  } catch {
    return ''
  }
}

const emptyForm = {
  slug: '',
  sort_order: 0,
  status: '',
  title: '',
  tagline: '',
  problem: '',
  approach: '',
  recruiter_problem: '',
  recruiter_approach: '',
  reasoning: '',
  capabilities: '',
  impact: '',
  stack: '',
  dataset: '',
  link: '',
  visual: '',
  relevance: '',
  model_card: '',
  system_card: '',
}

export function projectRowToForm(row) {
  if (!row) return emptyForm
  return {
    slug: row.slug || '',
    sort_order: row.sort_order ?? 0,
    status: row.status || '',
    title: row.title || '',
    tagline: row.tagline || '',
    problem: row.problem || '',
    approach: row.approach || '',
    recruiter_problem: row.recruiter_problem || '',
    recruiter_approach: row.recruiter_approach || '',
    reasoning: row.reasoning || '',
    capabilities: arrayToLines(row.capabilities),
    impact: arrayToLines(row.impact),
    stack: arrayToLines(row.stack),
    dataset: row.dataset || '',
    link: row.link || '',
    visual: row.visual || '',
    relevance: jsonToText(row.relevance),
    model_card: jsonToText(row.model_card),
    system_card: jsonToText(row.system_card),
  }
}

export default function ProjectForm({ initial, onSave, onCancel, saving }) {
  const [form, setForm] = useState(initial || emptyForm)
  const [jsonErrors, setJsonErrors] = useState({})

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  function parseJsonField(name, text) {
    if (!text.trim()) return { value: null, error: null }
    try {
      return { value: JSON.parse(text), error: null }
    } catch (e) {
      return { value: null, error: `${name}: invalid JSON — ${e.message}` }
    }
  }

  function handleSubmit(e) {
    e.preventDefault()

    const relevanceParsed = parseJsonField('Relevance', form.relevance)
    const modelCardParsed = parseJsonField('Model Card', form.model_card)
    const systemCardParsed = parseJsonField('System Card', form.system_card)

    const errors = {}
    if (relevanceParsed.error) errors.relevance = relevanceParsed.error
    if (modelCardParsed.error) errors.model_card = modelCardParsed.error
    if (systemCardParsed.error) errors.system_card = systemCardParsed.error

    if (Object.keys(errors).length > 0) {
      setJsonErrors(errors)
      return
    }
    setJsonErrors({})

    onSave({
      slug: form.slug.trim(),
      sort_order: Number(form.sort_order) || 0,
      status: form.status,
      title: form.title,
      tagline: form.tagline,
      problem: form.problem,
      approach: form.approach,
      recruiter_problem: form.recruiter_problem,
      recruiter_approach: form.recruiter_approach,
      reasoning: form.reasoning,
      capabilities: linesToArray(form.capabilities),
      impact: linesToArray(form.impact),
      stack: linesToArray(form.stack),
      dataset: form.dataset,
      link: form.link,
      visual: form.visual || null,
      relevance: relevanceParsed.value || {},
      model_card: modelCardParsed.value,
      system_card: systemCardParsed.value,
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
            placeholder="my-new-project"
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

      <label className="admin-field">
        <span>Status pill text</span>
        <input
          value={form.status}
          onChange={(e) => update('status', e.target.value)}
          placeholder="e.g. Major Project · B.Tech CSE"
        />
      </label>

      <label className="admin-field">
        <span>Tagline (one line, shown under the title)</span>
        <input value={form.tagline} onChange={(e) => update('tagline', e.target.value)} />
      </label>

      <label className="admin-field">
        <span>Problem (engineer view)</span>
        <textarea rows={3} value={form.problem} onChange={(e) => update('problem', e.target.value)} />
      </label>
      <label className="admin-field">
        <span>Approach / What I Built (engineer view)</span>
        <textarea rows={3} value={form.approach} onChange={(e) => update('approach', e.target.value)} />
      </label>

      <label className="admin-field">
        <span>Problem (recruiter view — optional; leave blank to hide the toggle)</span>
        <textarea
          rows={3}
          value={form.recruiter_problem}
          onChange={(e) => update('recruiter_problem', e.target.value)}
        />
      </label>
      <label className="admin-field">
        <span>Approach (recruiter view)</span>
        <textarea
          rows={3}
          value={form.recruiter_approach}
          onChange={(e) => update('recruiter_approach', e.target.value)}
        />
      </label>

      <label className="admin-field">
        <span>Reasoning ("why this approach" callout)</span>
        <textarea rows={2} value={form.reasoning} onChange={(e) => update('reasoning', e.target.value)} />
      </label>

      <label className="admin-field">
        <span>Key Capabilities — one per line</span>
        <textarea
          rows={5}
          value={form.capabilities}
          onChange={(e) => update('capabilities', e.target.value)}
        />
      </label>

      <label className="admin-field">
        <span>Why It Matters — one per line</span>
        <textarea rows={4} value={form.impact} onChange={(e) => update('impact', e.target.value)} />
      </label>

      <label className="admin-field">
        <span>Tech Stack — one per line</span>
        <textarea rows={4} value={form.stack} onChange={(e) => update('stack', e.target.value)} />
      </label>

      <label className="admin-field">
        <span>Dataset (optional)</span>
        <textarea rows={2} value={form.dataset} onChange={(e) => update('dataset', e.target.value)} />
      </label>

      <div className="admin-form-grid">
        <label className="admin-field">
          <span>GitHub link (optional)</span>
          <input value={form.link} onChange={(e) => update('link', e.target.value)} />
        </label>
        <label className="admin-field">
          <span>Visual style</span>
          <select value={form.visual} onChange={(e) => update('visual', e.target.value)}>
            <option value="">Default (scan visual)</option>
            <option value="ar">AR visual</option>
          </select>
        </label>
      </div>

      <label className="admin-field">
        <span>
          Relevance JSON (optional — for the role-based sort toggle), e.g.{' '}
          <code>{'{"ml-engineer": 3, "backend": 1}'}</code>
        </span>
        <textarea
          rows={2}
          value={form.relevance}
          onChange={(e) => update('relevance', e.target.value)}
          className={jsonErrors.relevance ? 'admin-input-error' : ''}
        />
        {jsonErrors.relevance && <div className="admin-error">{jsonErrors.relevance}</div>}
      </label>

      <label className="admin-field">
        <span>Model Card JSON (optional — leave blank for none)</span>
        <textarea
          rows={4}
          value={form.model_card}
          onChange={(e) => update('model_card', e.target.value)}
          className={jsonErrors.model_card ? 'admin-input-error' : ''}
        />
        {jsonErrors.model_card && <div className="admin-error">{jsonErrors.model_card}</div>}
      </label>

      <label className="admin-field">
        <span>System Card JSON (optional — leave blank for none)</span>
        <textarea
          rows={4}
          value={form.system_card}
          onChange={(e) => update('system_card', e.target.value)}
          className={jsonErrors.system_card ? 'admin-input-error' : ''}
        />
        {jsonErrors.system_card && <div className="admin-error">{jsonErrors.system_card}</div>}
      </label>

      <div className="admin-form-actions">
        <button type="submit" className="btn btn-primary" disabled={saving}>
          {saving ? 'Saving…' : 'Save project'}
        </button>
        <button type="button" className="btn btn-ghost" onClick={onCancel} disabled={saving}>
          Cancel
        </button>
      </div>
    </form>
  )
}
