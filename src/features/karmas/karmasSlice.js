import {
  createSlice,
  createAsyncThunk,
  createSelector,
  createEntityAdapter,
} from '@reduxjs/toolkit'
import axios from 'axios';

const url = 'http://localhost:8000/api/karmas'

const karmasAdapter = createEntityAdapter({
	selectId: (karma) => karma.id,
})

const initialState = karmasAdapter.getInitialState({
  status: 'idle',
  error: null,
})

export const fetchKarmas = createAsyncThunk('karmas/fetchKarmas', async () => {
  const response = await axios.get('http://localhost:8000/api/karmas');
  console.log("fetched karmas: ", response.data);
  return response.data
})

export const getKarmaCountByUser = createAsyncThunk('karmas/getKarmaCount', async () => {
  const response = await axios.get('http://localhost:8000/api/karmas/user');
  // console.log("fetched karmas: ", response.data);
  return response.data	
})
export const addNewKarma = createAsyncThunk(
  'karmas/addNewKarma',
  async (initialKarmas) => {
    const { comment_id, giver_id} = initialKarmas
    // console.log("initial Karmas in addnewKarmas: ", initialKarmas);
    const response = await axios.post(url, {karma: comment_id, giver_id});
    console.log("response in thunk: ", response);
    return response.post
  }
)

const karmasSlice = createSlice({
  name: 'karmas',
  initialState,
  reducers: {
    reactionAdded(state, action) {
      const { karmaId, reaction } = action.payload
      const existingKarma = state.entities[karmaId]
      if (existingKarma) {
        existingKarma.reactions[reaction]++
      }
    },
  },
  extraReducers: {
    [fetchKarmas.pending]: (state, action) => {
      state.status = 'loading'
    },
    [fetchKarmas.fulfilled]: (state, action) => {
      state.status = 'succeeded'
      // Add any fetched karmas to the array
      karmasAdapter.upsertMany(state, action.payload)
    },
    [fetchKarmas.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    },
    [addNewKarma.fulfilled]: karmasAdapter.addOne,
  },
})

export const { karmaAdded } = karmasSlice.actions

export default karmasSlice.reducer

export const {
  selectAll: selectAllkarmas,
  selectById: selectKarmaById,
  selectIds: selectKarmaIds,
} = karmasAdapter.getSelectors((state) => {
	// console.log("state in karmasadapter selectors", state.karmas, karmasAdapter)
	return state.karmas

}
 )

export const selectKarmasByUserId = createSelector(
  [selectAllkarmas, (state, userId) => userId],
  (karmas, userId) => karmas.filter((karma) => {
		console.log(karma);
		return karma.receiver_id == userId
	})
)
