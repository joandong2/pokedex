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
        allPokemon: [],
        pokemon: [],
        status: 'idle',
        error: null,
        limit: 9,
        nextURL: '',
        prevURL: '',
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
                //console.log(action.payload.results)
                for (let i = 0; i < action.payload.results.length; i++) {
                    fetchPokemon(action.payload.results[i].url)
                    //console.log(action.payload.results[i].url)
                }
                state.status = 'success'

            })
            .addCase(fetchPokemon.fulfilled, (state, action) => {
                state.pokemon.push(action.payload)
                state.status = 'success'
            })
    }
})

export const getState = (state) => state.pokemon
export const selectAllPokemon = (state) => state.pokemon.pokemon

export const { resetPokemon } = pokeSlice.actions;
export default pokeSlice.reducer

