import {
    createSlice,
    createAsyncThunk,
    createEntityAdapter,
  } from '@reduxjs/toolkit';

import axios from 'axios';

const url = `https://freeflow-two-point-o.herokuapp.com/api/conversations`

const conversationsAdapter = createEntityAdapter()

export const fetchUserConversations= createAsyncThunk('conversations/fetchUserConversations', async (userId) => {
    const response = await axios.get(`${url}/${userId}`);
    return response.data;
});

const initialState = conversationsAdapter.getInitialState( {
    status: 'idle',
    error: null,
}

);


const conversationsSlice = createSlice({
    name: 'conversations',
    initialState,
    reducers: {
    },
    extraReducers: {
        [fetchUserConversations.pending]: (state, action) => {
            state.status = 'loading'
        },
        [fetchUserConversations.fulfilled]: (state, action) => {

            state.status = 'succeeded'
            conversationsAdapter.upsertMany(state, action.payload)
        },
        [fetchUserConversations.rejected]: (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        },
    },
});

export default conversationsSlice.reducer;

export const {
    selectAll: selectAllConversations,
    selectById: selectConversationsById,
    selectIds: selectConversationIds,
  } = conversationsAdapter.getSelectors((state) => state.conversations)

