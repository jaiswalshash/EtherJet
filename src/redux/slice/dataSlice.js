import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    data : null,
    cities: null
}

const dataSlice = createSlice({
    name: "data",
    initialState,
    reducers: {
        setData : (state, action) => {
            state.data = action.payload;
        },
        setCities : (state, action) => {
            state.cities = action.payload
        }
    }
})

export default dataSlice.reducer;
export const {setData, setCities} = dataSlice.actions; 