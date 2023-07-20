'use client'

import * as Dialog from '@radix-ui/react-dialog'
import { FC, useState } from 'react'
import { FiX } from 'react-icons/fi'

import { TAct } from '@/types'
import { createAct } from '@/utils'

const CreateAct: FC = () => {
  const [open, setOpen] = useState<boolean>(false)
  const [saving, setSaving] = useState(false)
  const [act, setAct] = useState<TAct>({
    name: '',
  })
  const { name } = act
  const isDisabled = name.trim().length === 0

  async function handleSubmit(e: any) {
    e.preventDefault()
    createAct(act)
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger className="px-4 py-3 rounded bg-indigo-500 hover:bg-indigo-700 text-indigo-100 font-medium">
        Add act
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white p-6 text-gray-900 shadow rounded-lg data-[state=open]:animate-[show-dialog_300ms] data-[state=closed]:animate-[hide-dialog_300ms]">
          <div className="flex justify-between items-center mb-1">
            <Dialog.Title className="text-xl font-semibold text-indigo-500">
              Add act
            </Dialog.Title>
            <Dialog.Close asChild className="text-gray-400 hover:text-gray-600">
              <button aria-label="Close">
                <FiX size={20} />
              </button>
            </Dialog.Close>
          </div>
          <Dialog.Description className="text-sm text-slate-500 mb-4">
            Add a new act to your story.
          </Dialog.Description>

          <form className="mb-4" onSubmit={(e) => handleSubmit}>
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
                placeholder="Give this act a name"
                value={name}
                onChange={(e) => {
                  setAct({ name: e.target.value })
                }}
              />
            </fieldset>
          </form>

          <div className="flex justify-end items-center space-x-2 mb-1">
            <Dialog.Close className="px-4 py-2 text-gray-400 hover:text-gray-600 font-normal">
              Cancel
            </Dialog.Close>
            <button
              type="submit"
              disabled={isDisabled}
              className="px-4 py-2 rounded bg-indigo-500 hover:bg-indigo-700 text-slate-100 font-medium disabled:bg-indigo-400 disabled:cursor-not-allowed group-disabled:cursor-not-allowed"
              onClick={handleSubmit}
            >
              {/* TODO: make a spinner component */}
              {saving ? 'Saving...' : 'Save'}
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default CreateAct
