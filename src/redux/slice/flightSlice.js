import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    flights : []
}

const flightSlice = createSlice({
    name: "flights",
    initialState,
    reducers: {
        setFlights : (state, action) => {
            state.flights = action.payload;
        }
    }
})

export default flightSlice.reducer;
export const {setFlights} = flightSlice.actions; 
