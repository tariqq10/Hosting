import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  title: "",
  description: "",
  categoryName: "",
  amount_needed: "",
  status:"pending",
  categories: [],
  formError: null

}

const donationRequestSlice = createSlice({
  name: 'donationRequest',
  initialState,
  reducers: {
    setField: (state, action) => {
      const {field, value} = action.payload;
      state[field] = value;
    },
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setError: (state, action) => {
      state.formError = action.payload;
    },
    clearForm: (state) => {
      state.title = '';
      state.description = '';
      state.categoryName = '';
      state.amount_needed= '';
      state.status = '';
      state.formError = '';
    }
  },
});

export const { setField, setCategories, clearForm} = donationSlice.actions;
export default donationRequestSlice.reducer;
