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
    },
    logoutAction: (state) => {
      state.session = '',
      Cookies.remove('session')
      console.log(state.session)
    }
  },
  
})

export const {loginAction, logoutAction} = authSlice.actions

export default authSlice