'use client'


import React from 'react'
import LogIn from './LogIn'

export default function LandingPage() {
  return (
    <main className='px-6 pt-12 pb-32 md:px-8 lg:px-12 w-full flex flex-col gap-24'>
      <h1 className="text-(--primaryColor) text-5xl w-full text-center drop-shadow-[2px_2px_0.5px_rgba(0,0,0,0.75)]">
        Welcome! Please login or sign up
      </h1>
      <LogIn/>
    </main>
  )
}
