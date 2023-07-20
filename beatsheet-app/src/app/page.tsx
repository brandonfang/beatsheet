'use client'
import { Space_Grotesk } from 'next/font/google'

import Act from '@/components/Act/Act'
import CreateAct from '@/components/Act/CreateAct'
import { TAct } from '@/types'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  style: 'normal',
})

export default async function Home() {
  // Next.js server component data fetch
  // const acts: TAct[] = await getActs()
  const acts: TAct[] = []

  return (
    <div className="min-h-screen bg-slate-900 p-12">
      <h1
        className={`${spaceGrotesk.className} text-2xl text-center font-medium text-slate-100 mb-8`}
      >
        Welcome to Beat Sheet
      </h1>
      <main>
        {acts.length > 0 ? (
          acts.map((act) => <Act act={act} key={act.id} />)
        ) : (
          <div className="my-8">
            <p className="text-xl font-medium text-slate-100">
              This story has no acts. Click "Add act" to get started.
            </p>
          </div>
        )}
      </main>
      <CreateAct />
    </div>
  )
}
