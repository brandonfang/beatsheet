'use client'

import * as Tooltip from '@radix-ui/react-tooltip'
import { Space_Grotesk } from 'next/font/google'
import { FC } from 'react'
import { FiCamera, FiClock, FiFileText, FiFilm } from 'react-icons/fi'

import { TAct, TBeat } from '@/types'
import DeleteBeat from './DeleteBeat'
import EditBeat from './EditBeat'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  style: 'normal',
})

type TProps = {
  act: TAct
  beat: TBeat
}

const Beat: FC<TProps> = ({ act, beat }) => {
  const { name, time, content, cameraAngle, notes } = beat

  return (
    <Tooltip.Provider>
      <div className="w-full p-6 rounded-lg border border-black/5 bg-slate-800/40 text-slate-400">
        <div className="flex flex-row justify-between items-start space-x-1 mb-2">
          <h3
            title={name}
            className={`${spaceGrotesk.className} text-xl text-indigo-400 line-clamp-3`}
          >
            {name}
          </h3>

          <div className="flex flex-row">
            <EditBeat act={act} beat={beat} />
            <DeleteBeat act={act} beat={beat} />
          </div>
        </div>

        <div className="flex flex-row items-start space-x-3 mb-3">
          <Tooltip.Root delayDuration={0}>
            <Tooltip.Trigger className="cursor-default p-0 mt-1 shrink-0 text-green-400">
              <FiClock size={16} />
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Content
                side="left"
                sideOffset={4}
                className="bg-green-200 rounded text-sm px-3 py-2 font-medium text-green-700"
              >
                Time
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>
          <p className="font-medium text-slate-100">
            {time.split('-').join(' – ')}
          </p>
        </div>

        <div className="flex flex-row items-start space-x-3 mb-3">
          <Tooltip.Root delayDuration={0}>
            <Tooltip.Trigger className="cursor-default p-0 mt-1 shrink-0 text-orange-400">
              <FiCamera size={16} />
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Content
                side="left"
                sideOffset={4}
                className="bg-orange-200 rounded text-sm px-2.5 py-2 font-medium text-orange-700"
              >
                Camera angle
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>
          <p className="font-medium text-slate-100">{cameraAngle}</p>
        </div>

        {content.length > 0 && (
          <div className="flex flex-row items-start space-x-3 mb-3">
            <Tooltip.Root delayDuration={0}>
              <Tooltip.Trigger className="cursor-default p-0 mt-1 shrink-0 text-purple-400">
                <FiFilm size={16} />
              </Tooltip.Trigger>
              <Tooltip.Portal>
                <Tooltip.Content
                  side="left"
                  sideOffset={4}
                  className="bg-purple-200 rounded text-sm px-3 py-2 font-medium text-purple-700"
                >
                  Content
                </Tooltip.Content>
              </Tooltip.Portal>
            </Tooltip.Root>
            <p className="font-medium text-slate-100">{content}</p>
          </div>
        )}

        {notes.length > 0 && (
          <div className="flex flex-row items-start space-x-3 mb-3">
            <Tooltip.Root delayDuration={0}>
              <Tooltip.Trigger className="cursor-default p-0 mt-1 shrink-0 text-blue-400">
                <FiFileText size={16} />
              </Tooltip.Trigger>
              <Tooltip.Portal>
                <Tooltip.Content
                  side="left"
                  sideOffset={4}
                  className="bg-blue-200 rounded text-sm px-3 py-2 font-medium text-blue-700"
                >
                  Notes
                </Tooltip.Content>
              </Tooltip.Portal>
            </Tooltip.Root>
            <p className="font-medium text-slate-100">{notes}</p>
          </div>
        )}
      </div>
    </Tooltip.Provider>
  )
}

export default Beat
