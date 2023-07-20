'use client'

import * as Dialog from '@radix-ui/react-dialog'
import { FC, useState } from 'react'
import { FiX } from 'react-icons/fi'

import { TAct, TBeat } from '@/types'
import { createBeat } from '@/utils'

type TProps = {
  act: TAct
}

const CreateBeat: FC<TProps> = ({ act }) => {
  const [open, setOpen] = useState<boolean>(false)
  const [saving, setSaving] = useState(false)
  const [beat, setBeat] = useState<TBeat>({
    name: '',
    time: '',
    cameraAngle: '',
    content: '',
    notes: '',
  })
  const { name, time, cameraAngle, content, notes } = beat
  const isDisabled =
    name.trim().length === 0 ||
    time.trim().length === 0 ||
    cameraAngle.trim().length === 0

  async function handleSubmit(e: any) {
    e.preventDefault()
    setSaving(true)
    await createBeat(act, beat)
    setOpen(false)
  }

  // TODO: validate time (mins and seconds)
  // Ask user to input duration of beat instead of time
  // Calculate time (xx:xx - xx:xx)
  // Batch edit subsequent beats and delay their times by duration

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger className="px-4 py-3 rounded bg-indigo-500 hover:bg-indigo-700 text-indigo-100 font-medium">
        Add beat
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white p-6 text-gray-900 shadow rounded-lg data-[state=open]:animate-[show-dialog_300ms] data-[state=closed]:animate-[hide-dialog_300ms]">
          <div className="flex justify-between items-center mb-1">
            <Dialog.Title className="text-xl font-semibold text-indigo-500">
              Add beat
            </Dialog.Title>
            <Dialog.Close asChild className="text-gray-400 hover:text-gray-600">
              <button aria-label="Close">
                <FiX size={20} />
              </button>
            </Dialog.Close>
          </div>
          <Dialog.Description className="text-sm text-slate-500 mb-4">
            Add a new beat to&nbsp;
            <span className="font-semibold text-indigo-400">
              Act {act.id}: {act.name}
            </span>
            .
          </Dialog.Description>

          <form className="flex flex-col space-between-4">
            <fieldset disabled={saving} className="w-full">
              <label
                htmlFor="name"
                className="mb-0.5 text-sm font-medium text-gray-700"
              >
                Name<span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="name"
                className="mb-2 block w-full rounded border border-gray-300 px-2 py-1.5 text-sm text-gray-700 shadow-sm"
                placeholder="Give this beat a name"
                value={name}
                onChange={(e) => {
                  setBeat({ ...beat, name: e.target.value })
                }}
              />
              <label
                htmlFor="time"
                className="mb-0.5 text-sm font-medium text-gray-700"
              >
                Time<span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="time"
                className="mb-2 block w-full rounded border border-gray-300 px-2 py-1.5 text-sm text-gray-700 shadow-sm"
                placeholder="Example: 2:00-3:30"
                value={time}
                onChange={(e) => {
                  setBeat({ ...beat, time: e.target.value })
                }}
              />
              <label
                htmlFor="cameraAngle"
                className="mb-0.5 text-sm font-medium text-gray-700"
              >
                Camera angle<span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="cameraAngle"
                className="mb-2 block w-full rounded border border-gray-300 px-2 py-1.5 text-sm text-gray-700 shadow-sm"
                placeholder="How will it be shot?"
                value={cameraAngle}
                onChange={(e) => {
                  setBeat({ ...beat, cameraAngle: e.target.value })
                }}
              />
              <label
                htmlFor="content"
                className="mb-0.5 text-sm font-medium text-gray-700"
              >
                Content
              </label>
              <textarea
                name="content"
                className="w-full mb-2 resize-y rounded border border-gray-300 px-2 py-1.5 text-sm text-gray-700 shadow-sm"
                placeholder="What is it about?"
                value={content}
                onChange={(e) => {
                  setBeat({ ...beat, content: e.target.value })
                }}
              />
              <label
                htmlFor="notes"
                className="mb-0.5 text-sm font-medium text-gray-700"
              >
                Notes
              </label>
              <textarea
                name="notes"
                className="w-full mb-4 resize-y rounded border border-gray-300 px-2 py-1.5 text-sm text-gray-700 shadow-sm"
                placeholder="Optional notes"
                value={notes}
                onChange={(e) => {
                  setBeat({ ...beat, notes: e.target.value })
                }}
              />
            </fieldset>
            <div className="flex justify-end items-center space-x-2">
              <Dialog.Close className="px-4 py-2 text-gray-400 hover:text-gray-600 font-normal">
                Cancel
              </Dialog.Close>
              <button
                type="submit"
                disabled={isDisabled}
                className="px-4 py-2 rounded inline-flex justify-center items-center bg-indigo-500 hover:bg-indigo-700 text-slate-100 font-medium disabled:bg-indigo-400 disabled:cursor-not-allowed group-disabled:cursor-not-allowed"
                onClick={handleSubmit}
              >
                {/* TODO: make a spinner component */}
                {saving ? 'Saving...' : 'Save'}
              </button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default CreateBeat
