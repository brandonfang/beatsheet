'use client'

import * as Dialog from '@radix-ui/react-dialog'
import * as Tooltip from '@radix-ui/react-tooltip'
import { FC, FormEvent, useState } from 'react'
import { FiTrash2, FiX } from 'react-icons/fi'

import { TAct, TBeat } from '@/types'
import { deleteAct } from '@/utils'

type TProps = {
  act: TAct
  beats: TBeat[]
}

const DeleteAct: FC<TProps> = ({ act, beats }) => {
  const [open, setOpen] = useState<boolean>(false)
  const [saving, setSaving] = useState(false)
  const [confirmation, setConfirmation] = useState<string>('')
  const { name } = act
  const isDisabled = confirmation !== name

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSaving(true)
    deleteAct(act.id)
    setOpen(false)
  }

  return (
    <Tooltip.Provider>
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Trigger className="flex justify-center items-center space-x-1.5 pl-3 pr-4 py-2 rounded bg-slate-300 hover:bg-slate-400 text-indigo-500 hover:text-indigo-600 font-medium">
          <FiTrash2 size={16} />
          <span>Delete act</span>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/40" />
          <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white p-6 text-gray-900 shadow rounded-lg data-[state=open]:animate-[show-dialog_300ms] data-[state=closed]:animate-[hide-dialog_300ms]">
            <div className="flex justify-between items-center">
              <Dialog.Title className="text-xl font-semibold text-indigo-500">
                Delete act
              </Dialog.Title>
              <Dialog.Close
                asChild
                className="text-gray-400 hover:text-gray-600"
              >
                <button aria-label="Close">
                  <FiX size={20} />
                </button>
              </Dialog.Close>
            </div>
            <div className="my-4 flex justify-center ">
              <div className="w-20 h-20 rounded-full bg-red-100 flex justify-center items-center">
                <FiTrash2 size={40} className="text-red-500" />
              </div>
            </div>
            <Dialog.Description className="text-center text-gray-700 mb-4">
              Delete&nbsp;
              <span className="font-semibold text-indigo-400">{act.name}</span>
              ?&nbsp;
              {beats.length > 0 ? (
                <span>
                  Deleting this act will also delete its&nbsp;
                  <Tooltip.Root delayDuration={0}>
                    <Tooltip.Trigger className="cursor-default p-0 mt-1 shrink-0">
                      <span className="text-indigo-400 font-semibold underline underline-offset-2">
                        {beats.length} beats
                      </span>
                    </Tooltip.Trigger>
                    <Tooltip.Portal>
                      <Tooltip.Content
                        side="right"
                        sideOffset={4}
                        className="bg-slate-800 rounded text-sm px-3 py-2 text-slate-100"
                      >
                        <div className="font-semibold text-red-400">
                          To be deleted:
                        </div>
                        <ul>
                          {beats.map((beat) => (
                            <li key={beat.id}>{beat.name}</li>
                          ))}
                        </ul>
                        <Tooltip.Arrow className="fill-slate-800" />
                      </Tooltip.Content>
                    </Tooltip.Portal>
                  </Tooltip.Root>
                  .&nbsp;
                </span>
              ) : null}
              This action cannot be undone.
            </Dialog.Description>
            <form
              className="flex flex-col space-between-4"
              onSubmit={handleSubmit}
            >
              <fieldset disabled={saving} className="w-full">
                <label
                  htmlFor="confirmation"
                  className="mb-0.5 text-sm font-medium text-gray-700"
                >
                  To confirm, type "{act.name}" in the box below
                </label>
                <input
                  type="text"
                  name="confirmation"
                  className="mb-4 block w-full rounded border border-gray-300 px-2 py-1.5 text-sm text-gray-700 shadow-sm"
                  placeholder=""
                  value={confirmation}
                  onChange={(e) => {
                    setConfirmation(e.target.value)
                  }}
                />
              </fieldset>
              <button
                type="submit"
                disabled={isDisabled}
                className="w-full px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-slate-100 font-medium
                  disabled:bg-red-400 disabled:cursor-not-allowed group-disabled:cursor-not-allowed"
              >
                {/* TODO: make a spinner component */}
                {saving ? 'Deleting' : 'Delete'} act
                {beats.length > 0 ? ` and ${beats.length} beats` : ''}
                {saving ? '...' : ''}
              </button>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </Tooltip.Provider>
  )
}

export default DeleteAct
