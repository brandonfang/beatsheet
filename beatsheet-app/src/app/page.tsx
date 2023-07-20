'use client'
import { Space_Grotesk } from 'next/font/google'

import Act from '@/components/Act/Act'
import CreateAct from '@/components/Act/CreateAct'
import { TAct } from '@/types'
import { getActs } from '@/utils'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  style: 'normal',
})

export default async function Home() {
  // Next.js server component data fetch
  const acts: TAct[] = await getActs()

  return (
    <div className="min-h-screen bg-slate-900 p-12">
      <h1
        className={`${spaceGrotesk.className} text-2xl text-center font-medium text-slate-100 mb-8`}
      >
        Welcome to Beat Sheet
      </h1>
      <main>
        {acts.map((act) => (
          <Act act={act} key={act.id} />
        ))}
      </main>
      <CreateAct />
    </div>
  )
}
