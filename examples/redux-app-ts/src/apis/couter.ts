import { createAsyncThunk } from "@reduxjs/toolkit"

const fetchCount = (amount = 1) => {
  return new Promise<{ data: number }>((resolve) =>
    setTimeout(() => resolve({ data: amount }), 500)
  )
}

export const incrementAsync = createAsyncThunk(
  "fetchCount",
  async (amount: number) => {
    const response = await fetchCount(amount)
    return response.data
  }
) as any
