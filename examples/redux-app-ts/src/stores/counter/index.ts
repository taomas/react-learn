import {
  createSlice,
  createAction,
  createReducer,
  PayloadAction,
} from "@reduxjs/toolkit"
import { incrementAsync } from "../../apis/couter"
import { RootState, AppThunk } from "../types"

// export interface CounterState {
//   value: number
//   status: "idle" | "loading" | "failed"
// }

// const initialState: CounterState = {
//   value: 0,
//   status: "idle",
// }

// const increment = createAction('counter/increment')
// const decrement = createAction('counter/decrement')

export const counterSlice = createSlice({
  name: "counter",
  initialState: {
    value: 0,
    status: "idle",
  },
  reducers: {
    increment: (state) => {
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(incrementAsync.fulfilled, (state, { payload }) => {
      state.value += payload
    })
  },
})

export const { increment, decrement, incrementByAmount } = counterSlice.actions

export const selectCount = (state: RootState) => state.counter.value

export const incrementIfOdd = (amount: number): AppThunk => {
  return (dispatch, getState) => {
    const currentValue = selectCount(getState())
    if (currentValue % 2 === 1) {
      dispatch(incrementByAmount(amount))
    }
  }
}

export default counterSlice.reducer
