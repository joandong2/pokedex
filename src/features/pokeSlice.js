import { 
    createAsyncThunk, 
    createSlice, 
} from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllPokemon = createAsyncThunk(
    "pokemon/fetchAllPokemon", async (URL, thunkAPI) => {
       try {
          const response = await axios.get(URL);//where you want to fetch data
          return response.data;
        } catch (error) {
           return thunkAPI.rejectWithValue({ error: error.message });
        }
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
        limit: 5
    },
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchAllPokemon.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchAllPokemon.fulfilled, (state, action) => {
                if (!localStorage.getItem('jl_pokemon')) {
                    localStorage.setItem('jl_pokemon', JSON.stringify(action.payload.results))
                }
                state.status = 'success'
            })
            .addCase(fetchAllPokemon.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(fetchPokemon.fulfilled, (state, action) => {
                //console.log('action1', action.payload)
                //state.pokemon = [...state.pokemon, action.payload]
                if (state.pokemon.length !== state.limit) {
                    state.pokemon.push(action.payload)
                } 
                state.status = 'success'
            })
    }
})

export const getState = (state) => state.pokemon
export const selectAllPokemon = (state) => state.pokemon.pokemon

export default pokeSlice.reducer