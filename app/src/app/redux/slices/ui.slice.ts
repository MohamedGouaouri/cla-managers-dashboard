import { createSlice } from '@reduxjs/toolkit'

export const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        fontSize: 16,
        language: 'js',
    },
    reducers: {
        changeFontSizeAction: (state, action) => {
            state.fontSize = action.payload && action.payload.fontSize ? action.payload.fontSize : 16
        },
        changeLanguageAction: (state, action) => {
            state.language = action.payload && action.payload.language && ['py', 'js'].includes(action.payload.language) ? action.payload.language : 'js'
        },
    }
  
})

export const {changeFontSizeAction, changeLanguageAction} = uiSlice.actions

export default uiSlice