'use client'
import { Space_Grotesk } from 'next/font/google'

import Act from '@/components/Act/Act'
import CreateAct from '@/components/Act/CreateAct'
import { TAct } from '@/types'
import { getActs } from '@/utils'
import SpotterLogo from './SpotterLogo'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  style: 'normal',
})

export default async function Home() {
  const acts: TAct[] = await getActs()
  const sortedActs = acts.sort((a, b) => (a?.id > b?.id ? 1 : -1))

  return (
    <div className="min-h-screen bg-slate-900">
      <div className="max-w-screen-2xl mx-auto p-6 sm:p-8 lg:p-12">
        <SpotterLogo />
        <h1
          className={`${spaceGrotesk.className} transition-all duration-300 text-2xl lg:text-3xl font-medium text-slate-100 mt-0.5 mb-8`}
        >
          Beat Sheet
        </h1>
        <main>
          {acts.length > 0 ? (
            <>
              <CreateAct />
              {sortedActs.map((act) => (
                <Act act={act} key={act.id} />
              ))}
            </>
          ) : (
            <div className="my-8">
              <p className="text-xl font-normal text-slate-100">
                This story has no acts. Click "Add act" to get started.
              </p>
              <CreateAct />
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
