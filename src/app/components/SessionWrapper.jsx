'use client'

import React, { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { BottomNav, Sidebar } from './SwitchingNavbar'
import LandingPage from './LandingPage'
import { useRouter } from 'next/navigation'

export default function SessionWrapper({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      const currentUser = session?.user ?? null
      setUser(currentUser)
      setLoading(false)

      if (currentUser) {
        router.replace('/dashboard')
      } else {
        router.replace('/')
      }
    })

    return () => subscription.unsubscribe()
  }, [router])

  if (loading) return <p>Loading...</p>

  if (!user) return <LandingPage />

  return (
    <>
      <Sidebar />
      {children}
      <BottomNav />
    </>
  )
}