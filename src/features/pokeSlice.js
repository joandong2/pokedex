import { 
    createAsyncThunk, 
    createSlice, 
    createSelector, 
    createEntityAdapter 
} from "@reduxjs/toolkit";
import axios from "axios";
const _URL = 'https://pokeapi.co/api/v2/pokemon';

const initialState = {
    pokemon: [],
    status: '',
    error: null
}

export const fetchPokemon = createAsyncThunk('pokemon/fetchPokemon', async () => {
    const response = await axios.get(_URL)
    return response.data
})

export const pokeSlice = createSlice({
    name: 'pokemon',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchPokemon.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchPokemon.fulfilled, (state, action) => {
                console.log('action', action.payload.results)
                state.status = 'succeeded'
                state.pokemon = action.payload.results
                // Add any fetched posts to the array
                //state.pokemon = state.pokemon.concat(loadedPosts)
                //postsAdapter.upsertMany(state, loadedPosts)
            })
            .addCase(fetchPokemon.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})

export const selectAllPokemon = (state) => state.pokemon.pokemon
export default pokeSlice.reducer