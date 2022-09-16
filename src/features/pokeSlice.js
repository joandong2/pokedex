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
        limit: 12,
        pokemonURL: [],
        nextURL: '',
        prevURL: '',
    },
    reducers: {
        resetPokemon: (state, action) => {
            //console.log('action', action);
            state.pokemon = []
            state.status = 'success'
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchAllPokemon.fulfilled, (state, action) => {
                //console.log(action.payload.results)
                state.pokemonURL = action.payload.results
                state.status = 'fetchAll-success'

            })
            .addCase(fetchPokemon.fulfilled, (state, action) => {
                if(state.pokemon.length < state.limit) {
                    state.pokemon = [...state.pokemon, action.payload]
                } else {
                    state.status = 'success'
                }
            })
    }
})

export const getState = (state) => state.pokemon
export const getStateStatus = (state) => state.pokemon.status
export const getStateLimit = (state) => state.pokemon.limit
export const getPokemonUrl = (state) => state.pokemon.pokemonURL
export const getPokemon = (state) => state.pokemon.pokemon

export const { resetPokemon } = pokeSlice.actions;
export default pokeSlice.reducer

