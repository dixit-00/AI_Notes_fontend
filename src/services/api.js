import axios from "axios";
import { serverUrl } from "../App";

export const getCurrentUser = async (dispatch) => {
    try {
        const result  = await axios.get(`${serverUrl}/api/user/CurrentUser`, {
            withCredentials: true
        });

        // Dispatch the user data to Redux store
        dispatch({ type: 'user/setCurrentUser', payload: result.data.user });

        return result.data.user; // Return the user data from the response

    } catch (error) {
        console.error("Error fetching current user:", error);
        // Dispatch null to indicate no user is logged in
        dispatch({ type: 'user/setCurrentUser', payload: null });
        throw new Error("Failed to fetch current user");
    }
};
