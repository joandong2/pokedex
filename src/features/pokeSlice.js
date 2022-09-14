import { 
    createAsyncThunk, 
    createSlice, 
} from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllPokemon = createAsyncThunk(
    "pokemon/fetchAllPokemon", async (URL) => {
        const response = await axios.get(URL);//where you want to fetch data
        return response.data;
}); 

export const fetchPokemon = createAsyncThunk('pokemon/fetchPokemon', async (URL) => {
    const response = await axios.get(URL)
    return response.data
})

export const pokeSlice = createSlice({
    name: 'pokemon',
    initialState : {
        pokemon: [],
        status: 'idle',
        error: null,
        limit: 18,
    },
    reducers: {
        resetPokemon: (state, action) => {
            //console.log('action', action);
            state.pokemon = []
            state.status = 'idle'
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchAllPokemon.fulfilled, (state, action) => {
                if (!localStorage.getItem('jl_pokemon')) {
                    localStorage.setItem('jl_pokemon', JSON.stringify(action.payload.results))
                }
                state.status = 'success'
            })
            .addCase(fetchPokemon.fulfilled, (state, action) => {
                if (state.pokemon.length !== state.limit) {
                    state.pokemon.push(action.payload)
                } else {
                    state.status = 'success'
                }
            })
    }
})

export const getState = (state) => state.pokemon
export const selectAllPokemon = (state) => state.pokemon.pokemon

export const { resetPokemon } = pokeSlice.actions;
export default pokeSlice.reducer

