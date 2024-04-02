import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

// Define a type for the slice state
interface CounterState {
  value: number
}

const getChallenges = createAsyncThunk(
    'challanges/getAll',
    async (userId: number, thunkAPI) => {
      const response = await axios.get('/api/challenges/')
      return response.data
    },
  )

const deleteChallenge = createAsyncThunk(
    'challanges/deleteChallengeById',
    async (userId: number, thunkAPI) => {
      const response = await axios.delete('/api/challenges/')
      return {
        isSuccess: response.status === 200,
        challenge: response.data
      }
    },
)

// Define the initial state using that type
const initialState: CounterState = {
  value: 0,
}

export const challengesSlice = createSlice({
  name: 'counter',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState: {
    challenges: []
  },
  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(getChallenges.fulfilled, (state, action) => {
      state.challenges = action.payload
    }),
    builder.addCase(deleteChallenge.fulfilled, (state, action) => {
        if (action.payload.isSuccess) {
            // Delete from local data
            state.challenges = state.challenges.filter((item: any) => item.id != action.payload.challenge.id)
        }
    })
  },
})

export default challengesSlice