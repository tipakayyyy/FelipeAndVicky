import { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'
import AdminLogin from './AdminLogin.jsx'
import AdminDashboard from './AdminDashboard.jsx'

export default function AdminApp() {
  const [session, setSession] = useState(undefined) // undefined = cargando

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session))

    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession)
    })

    return () => listener.subscription.unsubscribe()
  }, [])

  if (session === undefined) {
    return <div className="admin-loading">Cargando…</div>
  }

  return session ? <AdminDashboard session={session} /> : <AdminLogin />
}
