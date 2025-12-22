import React from 'react'

const AIMessage = ({ text, pending }) => {
  return (
    <div className="w-full flex justify-start">
      <div className="max-w-[80%] bg-[#262626] text-white px-4 py-3 rounded-2xl rounded-tl-none shadow-sm my-2 break-words">
        {pending ? (
          // loader animation
          <div className="flex items-center gap-1">
            <span className="animate-bounce">.</span>
            <span className="animate-bounce delay-200">.</span>
            <span className="animate-bounce delay-400">.</span>
          </div>
        ) : (
          <div className="whitespace-pre-wrap">{text}</div>
        )}
      </div>
    </div>
  )
}

export default AIMessage
