import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    isAuthenticated: !!localStorage.getItem('jwtToken'),
    user: null,
    error: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            localStorage.removeItem('jwtToken')
        },
        loginSuccess: (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload;
        },
        loginFailure: (state, action) => {
            state.error = action.payload;
        },
    },
})

export const {logout, loginSuccess, loginFailure} = authSlice.actions;
export default authSlice.reducer;