import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: [],
  chats: [],
  socket: null,
  showNewModal: false,
  pendingMessage: null,
  toogleSidebar: false,
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
      },
      setSocket: ( state, action ) => {
        state.socket = action.payload
      }
      ,
      setShowNewModal: (state, action) => {
        state.showNewModal = action.payload
      },
      setPendingMessage: (state, action) => {
        state.pendingMessage = action.payload
      },
      clearPendingMessage: (state) => {
        state.pendingMessage = null
      },
      
     setToogleSidebar: (state) => {
      state.toogleSidebar = !state.toogleSidebar
     }
  },
})

export const { setUser, setChats, addChat, setSocket, setShowNewModal, setPendingMessage, clearPendingMessage, setToogleSidebar } = userSlice.actions

export default userSlice.reducer