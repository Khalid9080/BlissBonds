import axios from 'axios';
import React, { useContext } from 'react';
import { use } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Providers/AuthProvider';

export const axiosSecure = axios.create({
    baseURL: 'https://blissful-bonds-server-site.vercel.app',
    //  baseURL: 'http://localhost:5000',
    
})
const useAxiosSecure = () => {
    const navigate = useNavigate();
    const {logOut } = useContext(AuthContext);
    //  Add a request interceptor to add the token to the header for every secure call to the api
    axiosSecure.interceptors.request.use(function (config) {
        const token = localStorage.getItem('Access-token');
        if (token) {
            config.headers.authorization = `Bearer ${token}`;
        } else {
            console.warn("No token found in localStorage.");
        }
        return config;
    }, function (error) {
        return Promise.reject(error);
    });

    // intercepts 401 and 403 status
    axiosSecure.interceptors.response.use(function (response) {
        return response;
    }, async (error)=> {
        const status = error.response.status;
        console.log('Error Status',status);
        if(status === 401 || status === 403){
            await logOut();
            navigate('/login');
        }
        return Promise.reject(error);
    });

    return axiosSecure
};

export default useAxiosSecure;