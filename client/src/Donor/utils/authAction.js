import axiosInstance from "./axios";
import {logout} from '../redux/authSlice';

export const logoutUser = () => async (dispatch) => {
    try {
        const response = await axiosInstance.post('/logout');

        if (response.status === 200 && response.data.message === 'Logged out successfully') {
            dispatch(logout())
        }
    } catch (error) {
        console.error('Logout error:', error);
    }
}