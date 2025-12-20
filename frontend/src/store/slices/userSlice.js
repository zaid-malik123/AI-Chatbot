import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user : [],
  chats: [

  ]
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
      setUser: (state, action) => {
         state.user = action.payload
      },
     
      setChats: (state, action) => {
        state.chats = action.payload
      },
      addChat: (state, action) => {
        if (!Array.isArray(state.chats)) state.chats = []
        state.chats.push(action.payload)
      }

  },
})

export const { setUser, setChats, addChat } = userSlice.actions

export default userSlice.reducer