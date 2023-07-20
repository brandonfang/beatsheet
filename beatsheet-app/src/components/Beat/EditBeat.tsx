'use client'

import * as Dialog from '@radix-ui/react-dialog'
import * as Tooltip from '@radix-ui/react-tooltip'
import { isEqual } from 'lodash'
import { FC, FormEvent, useState } from 'react'
import { FiEdit3, FiX } from 'react-icons/fi'

import { TAct, TBeat } from '@/types'
// import { editBeat } from '@/utils'

type TProps = {
  act: TAct
  beat: TBeat
}

const EditBeat: FC<TProps> = ({ act, beat }) => {
  const [open, setOpen] = useState<boolean>(false)
  const [saving, setSaving] = useState(false)
  const [newBeat, setNewBeat] = useState<TBeat>({
    id: beat.id,
    name: beat.name,
    time: beat.time,
    cameraAngle: beat.cameraAngle,
    content: beat.content,
    notes: beat.notes,
  })
  const { name, time, cameraAngle, content, notes } = newBeat
  const isDisabled =
    isEqual(beat, newBeat) ||
    name.trim().length === 0 ||
    time.trim().length === 0 ||
    cameraAngle.trim().length === 0

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSaving(true)
    // editBeat(beat)
    fetch(`http://localhost:8080/acts/beats/${beat.id}`, {
      method: 'PUT',
      mode: 'cors',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(beat),
    }).then((res) => {
      console.log(res)
      console.log(res.headers.forEach(console.log))
    })
    setOpen(false)
  }

  return (
    <Dialog.Root>
      <Tooltip.Root delayDuration={0}>
        <Tooltip.Trigger
          asChild
          className="rounded-lg px-2.5 py-2 flex justify-center items-center hover:bg-slate-700"
        >
          <Dialog.Trigger>
            <FiEdit3 size={16} className=" text-slate-100" />
          </Dialog.Trigger>
        </Tooltip.Trigger>
        <Tooltip.Content
          sideOffset={4}
          className="bg-slate-600 rounded text-sm px-3 py-2 text-slate-100"
        >
          Edit beat
          <Tooltip.Arrow className="fill-slate-600" />
        </Tooltip.Content>
      </Tooltip.Root>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white p-6 text-gray-900 shadow rounded-lg">
          <div className="flex justify-between items-center mb-1">
            <Dialog.Title className="text-xl font-semibold text-indigo-500">
              Edit beat
            </Dialog.Title>
            <Dialog.Close asChild className="text-gray-400 hover:text-gray-600">
              <button aria-label="Close">
                <FiX size={20} />
              </button>
            </Dialog.Close>
          </div>
          <Dialog.Description className="text-sm text-slate-500 mb-4">
            Make changes to&nbsp;
            <span className="font-semibold text-indigo-400">{beat.name}</span>
            &nbsp;of&nbsp;
            <span className="font-semibold text-indigo-400">
              Act {act.id}: {act.name}
            </span>
            &nbsp;here.
          </Dialog.Description>

          <form
            className="flex flex-col space-between-4"
            onSubmit={handleSubmit}
          >
            <fieldset className="w-full">
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
                  setNewBeat({ ...newBeat, name: e.target.value })
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
                  setNewBeat({ ...newBeat, time: e.target.value })
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
                  setNewBeat({ ...newBeat, cameraAngle: e.target.value })
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
                  setNewBeat({ ...newBeat, content: e.target.value })
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
                  setNewBeat({ ...newBeat, notes: e.target.value })
                }}
              />
            </fieldset>
            <div className="flex justify-end items-center space-x-2 mb-1">
              <Dialog.Close className="px-4 py-2 text-gray-400 hover:text-gray-600 font-normal">
                Cancel
              </Dialog.Close>
              <button
                type="submit"
                disabled={isDisabled}
                className="px-4 py-2 rounded bg-indigo-500 hover:bg-indigo-700 text-slate-100 font-medium disabled:bg-indigo-400 disabled:cursor-not-allowed group-disabled:cursor-not-allowed"
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

export default EditBeat
