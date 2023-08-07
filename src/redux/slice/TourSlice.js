import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    to : null,
    from : null,
    pax: 1
}

const tourSlice = createSlice({
    name: "tour", 
    initialState,
    reducers: {
        setTourTo : (state, action) => {
            state.to = action.payload;
        },
        setTourFrom : (state, action) => {
            state.from = action.payload;
        },
        setTourPax : (state, action) => {
            state.pax = action.payload;
        }
    }
})

export default tourSlice.reducer;
export const {setTourTo, setTourFrom, setTourPax} = tourSlice.actions; 

