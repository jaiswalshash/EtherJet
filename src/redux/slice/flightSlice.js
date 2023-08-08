import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    flights : null,
    filtered : null,
    max: null,
    min: null
}

const flightSlice = createSlice({
    name: "flights",
    initialState,
    reducers: {
        setFlights : (state, action) => {
            state.flights = action.payload;
        },
        setMaxP : (state, action) => {
            state.max = action.payload;
        },
        setMinP : (state, action) => {
            state.min = action.payload;
        },
        setFilterd : (state, action) => {
            state.filtered = action.payload;
        }

    }
})

export default flightSlice.reducer;
export const {setFlights, setMaxP, setMinP, setFilterd} = flightSlice.actions; 
