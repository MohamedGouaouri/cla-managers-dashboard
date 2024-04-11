import { createSlice } from '@reduxjs/toolkit'

export const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        fontSize: 16,
        language: 'js',
        alert: null
    },
    reducers: {
        changeFontSizeAction: (state, action) => {
            state.fontSize = action.payload && action.payload.fontSize ? action.payload.fontSize : 16
        },
        changeLanguageAction: (state, action) => {
            state.language = action.payload && action.payload.language && ['py', 'js'].includes(action.payload.language) ? action.payload.language : 'js'
        },
        alertAction: (state, action) => {
            state.alert = action.payload
        },
        dismissAlertAction: (state, action) => {
            state.alert = null
        }
    }
  
})

export const {changeFontSizeAction, changeLanguageAction, alertAction, dismissAlertAction} = uiSlice.actions

export default uiSlice