import { 
    createAsyncThunk, 
    createSlice, 
    createSelector, 
    createEntityAdapter 
} from "@reduxjs/toolkit";
import axios from "axios";

const _URL = 'https://pokeapi.co/api/v2/pokemon/?limit=20&offest=20';

export const fetchPokemon = createAsyncThunk(
    "pokemon/fetchPokemon", async (_, thunkAPI) => {
       try {
          const response = await axios.get(_URL);//where you want to fetch data
          return response.data;
        } catch (error) {
           return thunkAPI.rejectWithValue({ error: error.message });
        }
});     

export const pokeSlice = createSlice({
    name: 'pokemon',
    initialState : {
        pokemon: [],
        count: 0,
        status: 'idle',
        error: null
    },
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchPokemon.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchPokemon.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.count = action.payload.count
                state.pokemon = action.payload.results
            })
            .addCase(fetchPokemon.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})

export const selectAllPokemon = (state) => state.pokemon.pokemon
export const getPokemonCount = (state) => state.pokemon.count
export const getStatus = (state) => state.pokemon.status

export default pokeSlice.reducer