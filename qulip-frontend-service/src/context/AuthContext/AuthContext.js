import { createContext, useState, useEffect } from "react";
import axios from 'axios';
import { GET_USER_BY_ID, LOGIN_URL, SIGNUP_URL, UPDATE_USER_BY_ID } from '../../api/ApiService';
import toast from "react-hot-toast";
import swal from 'sweetalert2';

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [userInfo, setUserInfo] = useState(
        localStorage.getItem("userInfo")
            ? JSON.parse(localStorage.getItem("userInfo"))
            : null
    );

    // Effect to sync localStorage with the state on page reload
    useEffect(() => {
        // Sync state with localStorage when token changes
        if (token) {
            localStorage.setItem("token", token);
        } else {
            localStorage.removeItem("token");
        }

        if (userInfo) {
            localStorage.setItem("userInfo", JSON.stringify(userInfo));
        } else {
            localStorage.removeItem("userInfo");
        }
    }, [token, userInfo]);

    // Login Handler
    const loginHandler = async (data) => {
        try {
            const response = await axios.post(LOGIN_URL, data);
            if (response?.status === 200 || response?.status === 201) {
                const { userToken, user, message } = response.data;

                // Save token and user info in localStorage
                localStorage.setItem("token", userToken);
                localStorage.setItem("userInfo", JSON.stringify(user));

                // Update the state
                setToken(userToken);
                setUserInfo(user);

                toast.success(message);
            }
            console.log(response);
            return response?.data;
        } catch (error) {
            // Generic error handling
            console.error("Login error", error);
            toast.error(error?.response?.data?.message || "Something went wrong.");
            return null;
        }
    };

    // Signup Handler
    const signupHandler = async (data) => {
        try {
            const response = await axios.post(SIGNUP_URL, data);
            if (response?.status === 200 || response?.status === 201) {
                toast.success(response?.data?.message);
            }
            console.log(response);
            return response;
        } catch (error) {
            console.error("Signup error", error);
            // Handle signup-specific errors
            toast.error(error?.response?.data?.message || "Something went wrong.");
        }
    };

    // Logout Handler
    const logoutHandler = () => {
        swal.fire({
            title: 'Are you sure?',
            text: 'You will be logged out of your account!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, log me out!',
            cancelButtonText: 'No, keep me logged in',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem("token");
                localStorage.removeItem("userInfo");
    
                setToken(null); // Clear token state
                setUserInfo(null); // Clear user info state
    
                toast.success('You have been logged out!');
            } else {
                toast.info('You are still logged in!');
            }
        }).catch((error) => {
            console.error("Error with SweetAlert2", error);
            toast.error('Something went wrong!');
        });
    };
    const getUserById = async(id) => {
        try {
            const result  = await axios.get(`${GET_USER_BY_ID}/${id}`)
            return result;
        } catch (error) {
            console.error("error", error);
        }
    }
    const updateUsers = async(id, data) => {
        try {
            const result  = await axios.put(`${UPDATE_USER_BY_ID}/${id}`, data)
            console.log(result);
        } catch (error) {
            console.error("error", error);

        }
    }
    // Provide the context to children
    return (
        <AuthContext.Provider value={{ loginHandler, signupHandler, token, userInfo,getUserById, logoutHandler, updateUsers }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;
