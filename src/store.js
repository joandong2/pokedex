import { configureStore } from "@reduxjs/toolkit";
import pokeReducer from './features/pokeSlice';


export const store = configureStore({
    reducer: {
        pokemon: pokeReducer,
    },
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    //     immutableCheck: false,
    //     serializableCheck: false,
    // })
})