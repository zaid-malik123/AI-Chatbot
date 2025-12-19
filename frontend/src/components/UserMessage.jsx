import React from 'react'

const UserMessage = ({ text }) => {
  return (
    <div className="w-full flex justify-end">
      <div className="max-w-[80%] bg-[#303031] text-white px-4 py-3 rounded-2xl rounded-tr-none shadow-sm my-2 wrap-break-word">
        <div className="whitespace-pre-wrap">{text}</div>
      </div>
    </div>
  )
}

export default UserMessage
