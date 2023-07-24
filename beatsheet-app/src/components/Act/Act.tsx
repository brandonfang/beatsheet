'use client'

import { Space_Grotesk } from 'next/font/google'
import { FC } from 'react'
import { FiSearch } from 'react-icons/fi'

import { TAct, TBeat } from '../../types'
import { getBeats } from '../../utils'
import Beat from '../Beat/Beat'
import CreateBeat from '../Beat/CreateBeat'
import DeleteAct from './DeleteAct'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  style: 'normal',
})

type TProps = {
  act: TAct
}

const Act: FC<TProps> = async ({ act }) => {
  const beats: TBeat[] = await getBeats(act.id)
  const sortedBeats = beats.sort((a, b) => (a?.id > b?.id ? 1 : -1))

  return (
    <div className="mb-8">
      <div className="flex flex-row space-between space-x-4 mb-8">
        <div className="grow px-6 py-2 rounded bg-sky-50">
          <div className="flex justify-between items-center">
            <h2 className="text-slate-900 font-bold">
              Act {act.id}: {act.name}
            </h2>
            <DeleteAct act={act} beats={beats} />
          </div>
        </div>
        <CreateBeat act={act} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
        {beats.length > 0 ? (
          sortedBeats.map((beat) => (
            <Beat act={act} beat={beat} key={beat.id} />
          ))
        ) : (
          <div className="p-10 pt-8 rounded-lg border border-black/5 bg-slate-800/25 text-slate-400">
            <div className="flex flex-col justify-center items-center">
              <div className="mb-4 w-20 h-20 rounded-full bg-indigo-200 flex justify-center items-center">
                <FiSearch size={40} className="text-indigo-500" />
              </div>
              <h3
                className={`${spaceGrotesk.className} text-center text-2xl text-slate-100 mb-2`}
              >
                This act has no beats
              </h3>
              <p className="text-slate-100 font-medium text-center">
                Click "Add beat" to get started
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Act
