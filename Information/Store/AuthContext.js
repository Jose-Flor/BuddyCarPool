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
            // Fetch user data from Firebase Authentication
            const authResponse = await axios.post(
                `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${API_KEY}`,
                { idToken: user.idToken }
            );
            const userId = authResponse.data.users[0].localId;
            
            // Fetch additional user data from Firebase Realtime Database
            const dbResponse = await axios.get(`${DATABASE_URL}/users/${userId}.json`);
            const userData = dbResponse.data;
    
            return userData;
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
    const uploadImage = async (imageUri, userId) => {
        const imageFileName = imageUri.substring(imageUri.lastIndexOf('/') + 1);
        const imageRef = `profile_images/${userId}/${imageFileName}`;
    
        try {
            const response = await fetch(imageUri);
            const blob = await response.blob();
    
            // Replace 'YOUR_FIREBASE_STORAGE_BUCKET' with your Firebase Storage bucket
            const storageUrl = `https://firebasestorage.googleapis.com/v0/b/YOUR_FIREBASE_STORAGE_BUCKET/o/${encodeURIComponent(imageRef)}?uploadType=media`;
    
            const uploadResponse = await fetch(storageUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'image/jpeg', // or the appropriate image MIME type
                    'Authorization': 'Bearer ' + accessToken // if needed
                },
                body: blob
            });
    
            const uploadResult = await uploadResponse.json();
    
            // Get the download URL
            const downloadUrl = `https://firebasestorage.googleapis.com/v0/b/YOUR_FIREBASE_STORAGE_BUCKET/o/${encodeURIComponent(imageRef)}?alt=media`;
    
            // Save the download URL in Firebase Realtime Database
            const userDataUrl = `https://carpoolbuddy-d054e-default-rtdb.firebaseio.com/users/${userId}/profileImage.json`;
            await axios.put(userDataUrl, JSON.stringify(downloadUrl));
    
            return downloadUrl;
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