import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    airline: ["Air India", "Jet Airways", "Indigo"],
    values : null
}

const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        setAir: (state, action) => {
            state.airline = action.payload;
        },
        setValues : (state, action) => {
            state.values = action.payload;
        }
    }
})

export default filterSlice.reducer;
export const {setAir, setValues} = filterSlice.actions; 
