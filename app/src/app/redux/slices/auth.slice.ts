import { createSlice } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'


export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    session: Cookies.get('session')
  },
  reducers: {
    loginAction: (state, action) => {
        state.session = action.payload
        Cookies.set('session', action.payload, {secure: true, expires: new Date(Date.now() + 10*1000)})
    }
  },
  
})

export const {loginAction} = authSlice.actions

export default authSlice