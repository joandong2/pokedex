import { 
    createAsyncThunk, 
    createSlice
} from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllPokemon = createAsyncThunk(
    "pokemon/fetchAllPokemon", async (URL) => {
        const response = await axios.get(URL); //where you want to fetch data
        return response.data;
}); 

export const fetchPokemon = createAsyncThunk(
    "pokemon/fetchPokemon", async (URL) => {
        const response = await axios.get(URL);
        return response.data;
});   

export const searchAllPokemon = createAsyncThunk(
    "pokemon/searchAllPokemon", async (URL) => {
        const response = await axios.get(URL);
        return response.data;
});  

export const searchPokemon = createAsyncThunk(
    "pokemon/searchPokemon", async (URL) => {
        const response = await axios.get(URL);
        return response.data;
}); 

export const pokeSlice = createSlice({
    name: 'pokemon',
    initialState : {
        pokemon: [],
        pokemonData: [],
        searchedPokemon: [],
        status: 'idle',
        error: null,
        nextUrl: '',
        prevUrl: ''
    },
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchAllPokemon.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchAllPokemon.fulfilled, (state, action) => {
                //console.log('action', action.payload)
                state.status = 'fetch-success'
                state.pokemonData = []
                state.pokemon = action.payload.results
                state.nextUrl = action.payload.next
                state.prevUrl = action.payload.previous
            })
            .addCase(fetchAllPokemon.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(fetchPokemon.fulfilled, (state, action) => {
                state.pokemonData = [...state.pokemonData, action.payload]
                state.status = 'success'
            })
            .addCase(searchAllPokemon.fulfilled, (state, action) => {
                //const POKEMON = JSON.parse(localStorage.getItem("jl_pokemon"));
                if (!localStorage.getItem('jl_pokemon')) {
                    localStorage.setItem('jl_pokemon', JSON.stringify(action.payload.results))
                }
            })
            .addCase(searchPokemon.fulfilled, (state, action) => {
                state.searchedPokemon = action.payload
                state.status = 'success'
            })
    }
})

export const selectAllPokemon = (state) => state.pokemon.pokemon
export const getPokemonData = (state) => state.pokemon.pokemonData
export const getSearchedPokemon = (state) => state.pokemon.searchedPokemon
export const getStatus = (state) => state.pokemon.status
export const getNextUrl = (state) => state.pokemon.nextUrl
export const getPrevUrl = (state) => state.pokemon.prevUrl

export default pokeSlice.reducer