import {configureStore} from '@reduxjs/toolkit';
import donationReducer from './slices/donationSlice';
import authReducer from './redux/authSlice'

export const store = configureStore({
    reducer: {
        donations: donationReducer,
        auth: authReducer,
    }
})