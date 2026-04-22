'use client'

import React from 'react'
import { calcRangeCircle } from '@/app/utils/calcRangeCircle'

export default function RangeCircle({ totals }) {

  const { totalAllLent, totalAllCollection, radius, circumference, lentPercent, collectedPercent } = calcRangeCircle(totals)

  const lentOffset =
    circumference - (lentPercent / 100) * circumference

  const collectedOffset =
    circumference - (collectedPercent / 100) * circumference

  return (
    <div className="flex flex-col lg:flex-row items-center p-6 gap-x-5 gap-y-8 w-auto justify-center">

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

      <div className="flex flex-row lg:flex-col gap-6 text-sm">

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