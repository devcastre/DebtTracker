'use client'

import React, { useEffect, useState, useRef } from 'react'
import { supabase } from '@/app/lib/supabase'
import { BottomNav, Sidebar } from '@/app/components/SwitchingNavbar'
import LandingPage from '@/app/components/LandingPage'
import { useRouter } from 'next/navigation'

export default function SessionWrapper({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const wasLoggedIn = useRef(false)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      const currentUser = session?.user ?? null
      setUser(currentUser)
      wasLoggedIn.current = !!currentUser
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      const currentUser = session?.user ?? null
      setUser(currentUser)

      if (currentUser && !wasLoggedIn.current) {

        router.replace('/dashboard')
      } else if (!currentUser && wasLoggedIn.current) {

        router.replace('/')
      }

      wasLoggedIn.current = !!currentUser
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