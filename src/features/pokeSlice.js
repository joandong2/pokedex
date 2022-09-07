import { 
    createAsyncThunk, 
    createSlice, 
    createSelector, 
    createEntityAdapter 
} from "@reduxjs/toolkit";
import axios from "axios";
const POSTS_URL = 'https://pokeapi.co/api/v2/';

const initialState = {
    pokemon: '',
    status: '',
    error: null
}

export const fetchPosts = createAsyncThunk('pokemon/fetchPosts', async () => {
    const response = await axios.get(POSTS_URL)
    return response.data
})

export const pokeSlice = createSlice({
    name: 'pokemon',
    initialState,
    reducers: {

    },
    extraReducers(builder) {
        builder
            .addCase(fetchPosts.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                console.log('action', action)
                state.status = 'succeeded'
                // Add any fetched posts to the array
                //state.pokemon = state.pokemon.concat(loadedPosts)
                //postsAdapter.upsertMany(state, loadedPosts)
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})

//export const {} = pokeSlice.actions;
export default pokeSlice.reducer