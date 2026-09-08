import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient.js'
import AdminLogin from './AdminLogin.jsx'
import AdminDashboard from './AdminDashboard.jsx'

export default function AdminApp() {
  const [session, setSession] = useState(null)
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      setChecking(false)
    })

    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession)
    })

    return () => listener.subscription.unsubscribe()
  }, [])

  if (checking) {
    return <div className="admin-loading">Loading…</div>
  }

  if (!session) {
    return <AdminLogin onLogin={setSession} />
  }

  return (
    <AdminDashboard
      session={session}
      onLogout={() => {
        supabase.auth.signOut()
      }}
    />
  )
}
