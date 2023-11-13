"use client"
import { createSlice } from "@reduxjs/toolkit"

const cartSlice = createSlice({
    name: "Cart Slice",
    initialState: [],
    reducers: {
        add(state, action) {
            const sameProduct = state.some(obj => obj.id == action.payload.id)
            if (sameProduct) {
                console.log("same id detected")
            }
            else {
                state.push(action.payload)
            }

        },
        remove(state, action) {
            return state.filter((item) => item.id !== action.payload)
        }
    }
})

export const { add, remove } = cartSlice.actions;
export default cartSlice.reducer;