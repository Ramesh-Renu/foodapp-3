import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Client from '../../ApolloClient';
import { GET_USER_CARDS, DELETE_USER_CARD } from '../query/DisplayCardQuery';

export const fetchUserCards = createAsyncThunk(
  'card/fetchUserCards',
  async (userId, { rejectWithValue }) => {
    try {
      const { data } = await Client.query({
        query: GET_USER_CARDS,
        variables: { id: userId },
      });
      return data.userDetails?.userCards || [];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteUserCard = createAsyncThunk(
  'card/deleteUserCard',
  async (cardId, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await Client.mutate({
        mutation: DELETE_USER_CARD,
        variables: { cardId },
      });
      
      if (data.deleteUserCard.success) {
        return cardId;
      }
      throw new Error(data.deleteUserCard.message || 'Failed to delete card');
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const cardSlice = createSlice({
  name: 'card',
  initialState: {
    cards: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserCards.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserCards.fulfilled, (state, action) => {
        state.loading = false;
        state.cards = action.payload;
        state.error = null;
      })
      .addCase(fetchUserCards.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteUserCard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUserCard.fulfilled, (state, action) => {
        state.loading = false;
        state.cards = state.cards.filter(card => card.cardId !== action.payload);
        state.error = null;
      })
      .addCase(deleteUserCard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default cardSlice.reducer;