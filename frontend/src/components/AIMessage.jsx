import React from 'react'

const AIMessage = ({ text }) => {
  return (
    <div className="w-full flex justify-start">
      <div className="max-w-[80%] bg-[#262626] text-white px-4 py-3 rounded-2xl rounded-tl-none shadow-sm my-2 wrap-break-word">
        <div className="whitespace-pre-wrap">{text}</div>
      </div>
    </div>
  )
}

export default AIMessage
