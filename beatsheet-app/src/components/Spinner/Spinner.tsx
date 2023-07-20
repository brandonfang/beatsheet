'use client'

import { FC } from 'react'

type TProps = {
  size: number
  block?: boolean
  text?: string
}

const Spinner: FC<TProps> = ({ size, block = false, text }) => {
  let borderWidth: number = 4
  // Assuming size is positive
  if (size < 16) {
    borderWidth = 2
  } else if (size > 40) {
    borderWidth = 8
  }

  return (
    <div className={block ? 'block' : 'inline'}>
      <div className="flex flex-col flex-nowrap justify-center items-center">
        <div
          className={`rounded-full shadow-md border-4 border-gray-400 border-t-white border-r-white animate-spin-slow`}
          // Manually style (string interpolation happens at run time, not build time)
          style={{
            width: `${size}px`,
            height: `${size}px`,
            borderWidth: `${borderWidth}px`,
          }}
        ></div>
        {block && !!text && (
          <p className="mt-2 text-center font-medium text-white">{text}</p>
        )}
      </div>
    </div>
  )
}

export default Spinner
