import React, { createContext, useState, useContext, useCallback } from 'react';

import axios from "axios";
const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

const API_KEY ='AIzaSyBpC3rN7lB0UtI-pWfN69kOsA4qEhoVI7E'

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const signIn=async(email, password)=>{
        try{
            const response =await axios.post(
                `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
                {email, password,returnSecureToken: true }

            )
            setUser(response.data);
            return response.data;


        }catch (error) {
            console.error('SignIn failed:', error);
            throw error;
        }
    };
    const signUp=async(email,password)=>{
        try{
           const response = await axios.post(
            `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
            { email, password, returnSecureToken: true }
            );
            setUser(response.data);
            return response.data;

        }catch (error) {
            console.error('SignUp failed:', error);
            throw error;
        }
    };
    const postUserData=async(data)=>{
        try{
            const response=await axios.post(
                `https://carpoolbuddy-d054e-default-rtdb.firebaseio.com/users/${user.localId}.json?auth=${user.idToken}`,
                data

            );
            return response.data
        }catch (error) {
            console.error('Posting user data failed:', error);
            throw error;
        }

    };
    const updateUserData = async (data) => {
        try {
            const response = await axios.patch(
                `https://carpoolbuddy-d054e-default-rtdb.firebaseio.com/users/${user.localId}.json?auth=${user.idToken}`,
                data
            );
            return response.data;
        } catch (error) {
            console.error('Updating user data failed:', error);
            throw error;
        }
    };
    const deleteUserData = async () => {
        try {
            const response = await axios.delete(
                `https://carpoolbuddy-d054e-default-rtdb.firebaseio.com/users/${user.localId}.json?auth=${user.idToken}`
            );
            return response.data;
        } catch (error) {
            console.error('Deleting user data failed:', error);
            throw error;
        }
    };
    const fetchUserData = async () => {
        try {
            const response = await axios.post(
                `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=YOUR_API_KEY`,
                { idToken: user.idToken }
            );
            return response.data.users[0];
        } catch (error) {
            console.error('Fetching user data failed:', error);
            throw error;
        }
    };
    const sendMessage = async (chatId, message, recipientId) => {
        try {
            const response = await axios.post(
                `https://carpoolbuddy-d054e-default-rtdb.firebaseio.com/chats/${chatId}.json?auth=${user.idToken}`,
                { senderId: user.localId, recipientId, message, timestamp: Date.now() }
            );
            return response.data;
        } catch (error) {
            console.error('Sending message failed:', error);
            throw error;
        }
    };
    const fetchMessages = async (chatId) => {
        try {
            const response = await axios.get(
                `https://carpoolbuddy-d054e-default-rtdb.firebaseio.com/chats/${chatId}.json?auth=${user.idToken}`
            );
            return response.data;
        } catch (error) {
            console.error('Fetching messages failed:', error);
            throw error;
        }
    };
    const uploadImage = async (imageFile, userId) => {
        const formData = new FormData();
        formData.append('file', imageFile);
        // Assume getSignedUrl function/endpoint exists
        const signedUrl = await axios.get(`https://your-server.com/getSignedUrl?userId=${userId}&path=profile_images`);
        try {
            const uploadResponse = await axios.put(signedUrl.data.url, formData, {
                headers: { 'Content-Type': imageFile.type },
            });
            return uploadResponse.data;
        } catch (error) {
            console.error('Uploading image failed:', error);
            throw error;
        }
    };
    const DATABASE_URL = 'https://carpoolbuddy-d054e-default-rtdb.firebaseio.com/';
     const saveUserData = async (userId, userData) => {
        try {
            const response = await axios.put(`${DATABASE_URL}/users/${userId}.json`, userData);
            return response.data; // Contains the saved user data
        } catch (error) {
            console.error('Save user data failed:', error);
            throw error;
        }
    };









return (
    <AuthContext.Provider value={{
        user,
        setUser,
        signIn,
        signUp,
        fetchUserData,
        postUserData,
        updateUserData,
        deleteUserData,
        sendMessage,
        fetchMessages,
        uploadImage,
        saveUserData
    }}>
        {children}
    </AuthContext.Provider>
);
}