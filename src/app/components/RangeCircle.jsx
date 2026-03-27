'use client'

import React from 'react'

export default function RangeCircle({ totals }) {

  const totalAllLent = totals?.totalLent || 0
  const totalAllCollection = totals?.totalCollected || 0

  const radius = 70
  const circumference = 2 * Math.PI * radius

  const lentPercent = 100

  const collectedPercent =
    totalAllLent > 0
      ? Math.min((totalAllCollection / totalAllLent) * 100, 100)
      : 0

  const lentOffset =
    circumference - (lentPercent / 100) * circumference

  const collectedOffset =
    circumference - (collectedPercent / 100) * circumference

  return (
    <div className="flex flex-row items-center gap-4 w-100 justify-center">

      <div className="relative w-48 h-48">

        <svg className="w-full h-full -rotate-90 drop-shadow-[-4px_4px_4px_rgba(0,0,0,0.75)] scale-125">

          <circle
            cx="96"
            cy="96"
            r={radius}
            strokeWidth="12"
            className="stroke-gray-200"
            fill="transparent"
          />

          {/* Lent */}
          <circle
            cx="96"
            cy="96"
            r={radius}
            strokeWidth="12"
            className="stroke-(--secondaryColor)"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={lentOffset}
            strokeLinecap="round"
          />

          {/* Collected */}
          <circle
            cx="96"
            cy="96"
            r={radius}
            strokeWidth="12"
            className="stroke-(--tertiaryColor) transition-all duration-700"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={collectedOffset}
            strokeLinecap="round"
          />

        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">

          <p className="text-sm text-black">Remaining Unpaid</p>

          <p className="text-xl font-bold">
            ₱{(totalAllLent - totalAllCollection).toLocaleString()}
          </p>

        </div>

      </div>

      <div className="flex flex-col gap-6 text-sm">

        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-(--secondaryColor) rounded-full"></span>
          Total Lent
        </div>

        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-(--tertiaryColor) rounded-full"></span>
          Total Collection
        </div>

      </div>


    </div>
  )
}