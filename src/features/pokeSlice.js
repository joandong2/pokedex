import { 
    createAsyncThunk, 
    createSlice, 
    createSelector, 
    createEntityAdapter 
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

export const fetchPokemon = createAsyncThunk(
    "pokemon/fetchPokemon", async (URL, thunkAPI) => {
       try {
            const response = await axios.get(URL);//where you want to fetch data
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue({ error: error.message });
        }
});   

export const pokeSlice = createSlice({
    name: 'pokemon',
    initialState : {
        pokemon: [],
        pokemonData: [],
        //count: 0,
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
                state.status = 'success'
                //state.count = action.payload.count
                state.pokemon = action.payload.results
                state.pokemonData = []
                state.nextUrl = action.payload.next
                state.prevUrl = action.payload.previous
            })
            .addCase(fetchAllPokemon.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(fetchPokemon.fulfilled, (state, action) => {
                console.log('action', action.payload)
                state.status = 'success'
                state.pokemonData = [...state.pokemonData, action.payload]
            })
    }
})

export const selectAllPokemon = (state) => state.pokemon.pokemon
export const getPokemonData = (state) => state.pokemon.pokemonData
//export const getPokemonCount = (state) => state.pokemon.count
export const getStatus = (state) => state.pokemon.status
export const getNextUrl = (state) => state.pokemon.nextUrl
export const getPrevUrl = (state) => state.pokemon.prevUrl

export default pokeSlice.reducer