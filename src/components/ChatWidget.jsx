import { useEffect, useRef, useState } from 'react'

const GREETING = {
  role: 'assistant',
  content:
    "Hi! I'm an AI assistant trained on Anirban's resume and projects. Ask me anything — like his experience with PyTorch, or what the MRI project does.",
}

const SUGGESTIONS = [
  'What are his key skills?',
  'Tell me about the MRI project',
  'Is he open to full-time roles?',
]

// Client-side message cap. This is a courtesy limit for the demo experience
// (and a second line of defense alongside the server-side rate limit in
// api/chat.js) — not a substitute for it, since anyone calling the API
// endpoint directly bypasses anything enforced only in the browser.
const MAX_USER_MESSAGES = 12

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([GREETING])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const scrollRef = useRef(null)

  const userMessageCount = messages.filter((m) => m.role === 'user').length
  const limitReached = userMessageCount >= MAX_USER_MESSAGES

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, loading, open])

  async function sendMessage(text) {
    const trimmed = text.trim()
    if (!trimmed || loading || limitReached) return

    const nextMessages = [...messages, { role: 'user', content: trimmed }]
    setMessages(nextMessages)
    setInput('')
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: nextMessages.filter((m) => m !== GREETING) }),
      })
      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Something went wrong — please try again.')
        setLoading(false)
        return
      }

      setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }])
    } catch (err) {
      setError('Could not reach the chat service — check your connection and try again.')
    } finally {
      setLoading(false)
    }
  }

  function handleSubmit(e) {
    e.preventDefault()
    sendMessage(input)
  }

  return (
    <>
      <button
        className="chat-fab"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Close chat' : 'Open chat about Anirban'}
        aria-expanded={open}
      >
        {open ? (
          <span className="chat-fab-icon">&times;</span>
        ) : (
          <span className="chat-fab-icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M4 12c0-4.4 3.6-8 8-8s8 3.6 8 8-3.6 8-8 8c-1.1 0-2.1-.2-3-.6L4 20l1.1-4.4C4.4 14.5 4 13.3 4 12z"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        )}
      </button>

      {open && (
        <div className="chat-panel" role="dialog" aria-label="Chat about Anirban">
          <div className="chat-panel-header">
            <div>
              <div className="chat-panel-title">Ask about Anirban</div>
              <div className="chat-panel-subtitle">AI-powered · answers from his real resume</div>
            </div>
            <button className="chat-panel-close" onClick={() => setOpen(false)} aria-label="Close chat">
              &times;
            </button>
          </div>

          <div className="chat-messages" ref={scrollRef}>
            {messages.map((m, i) => (
              <div key={i} className={`chat-bubble chat-bubble-${m.role}`}>
                {m.content}
              </div>
            ))}
            {loading && (
              <div className="chat-bubble chat-bubble-assistant chat-typing">
                <span></span>
                <span></span>
                <span></span>
              </div>
            )}
            {error && <div className="chat-error">{error}</div>}
            {limitReached && (
              <div className="chat-error">
                You've reached the demo limit for this session. Refresh to start a new one, or
                use the Contact section to reach Anirban directly.
              </div>
            )}
          </div>

          {messages.length === 1 && (
            <div className="chat-suggestions">
              {SUGGESTIONS.map((s) => (
                <button key={s} className="chat-suggestion-chip" onClick={() => sendMessage(s)}>
                  {s}
                </button>
              ))}
            </div>
          )}

          <form className="chat-input-row" onSubmit={handleSubmit}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={limitReached ? 'Session limit reached' : 'Ask a question…'}
              disabled={loading || limitReached}
              aria-label="Type your question"
            />
            <button type="submit" disabled={loading || limitReached || !input.trim()}>
              Send
            </button>
          </form>
        </div>
      )}
    </>
  )
}
