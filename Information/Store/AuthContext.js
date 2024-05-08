import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import firebase from 'firebase/app';
import 'firebase/storage';  // Import this if you're using Firebase Storage



import axios from "axios";
const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

const API_KEY = "AIzaSyBpC3rN7lB0UtI-pWfN69kOsA4qEhoVI7E";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [drivers, setDrivers] = useState([]); // State to hold driver data
  const signIn = async (email, password) => {
    try {
      const response = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
        { email, password, returnSecureToken: true }
      );
      await AsyncStorage.setItem('authToken', response.data.idToken);
      setUser(response.data);

      // Update user status to online
      const userStatusDataBaseRef = `${DATABASE_URL}/status/${response.data.localId}.json`;
      await axios.put(userStatusDataBaseRef, { isOnline: true });

      return response.data;
    } catch (error) {
      console.error("SignIn failed:", error);
      throw error;
    }
};
  
const signUp = async (email, password) => {
    try {
      const response = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
        { email, password, returnSecureToken: true }
      );
      await AsyncStorage.setItem('authToken', response.data.idToken); // Store the token in AsyncStorage
      setUser(response.data);
      return response.data;
    } catch (error) {
      console.error("SignUp failed:", error);
      throw error;
    }
  };

  const fetchDrivers = async () => {
    if (user && user.idToken) {
      try {
        const response = await axios.get(
          `${DATABASE_URL}drivers.json?auth=${user.idToken}`
        );
        const fetchedDrivers = response.data
          ? Object.keys(response.data).map((key) => ({
              id: key,
              ...response.data[key],
            }))
          : [];
        setDrivers(fetchedDrivers);
      } catch (error) {
        console.error("Failed to fetch drivers:", error);
      }
    }
  };

  useEffect(() => {
    if (user) {
      fetchDrivers();
    }
  }, [user]);

  const postUserData = async (data) => {
    try {
      const response = await axios.post(
        `https://carpoolbuddy-d054e-default-rtdb.firebaseio.com/users/${user.localId}.json?auth=${user.idToken}`,
        data
      );
      return response.data;
    } catch (error) {
      console.error("Posting user data failed:", error);
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
      console.error("Updating user data failed:", error);
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
      console.error("Deleting user data failed:", error);
      throw error;
    }
  };
  const fetchUserData = async () => {
    // Ensure there is a user and the user has a valid local ID
    if (!user || !user.localId) {
        alert("Invalid user. Please login again.");
        return null;  // Ensure no further execution if there is no user or local ID
    }

    try {
        // Fetch user data using only the localId
        const response = await axios.get(
            `${DATABASE_URL}/users/${user.localId}.json`
        );

        // Check if the response contains data
        if (response.data) {
            return response.data;  // Return the user data successfully fetched
        } else {
            alert("No user data found.");
            return null;  // Handle cases where no data is returned
        }
    } catch (error) {
        console.error("Fetching user data failed:", error);
        alert("Error fetching data. Please check your network and try again.");
        return null;  // Return null in case of an error
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
      console.error("Sending message failed:", error);
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
      console.error("Fetching messages failed:", error);
      throw error;
    }
  };
  const uploadImage = async (imageUri, userId) => {
    const response = await fetch(imageUri);
    const blob = await response.blob();
  
    // Set up the Firebase Storage URL
    const firebaseStorageUrl = `https://firebasestorage.googleapis.com/v0/b/YOUR_STORAGE_BUCKET/o/${userId}%2F${Date.now()}?alt=media`;
  
    // Make the PUT request to upload the image
    try {
      const uploadResponse = await fetch(firebaseStorageUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'image/jpeg', // Adjust content type as needed
          // Include any authentication token if required
          // 'Authorization': 'Bearer YOUR_AUTH_TOKEN',
        },
        body: blob, // Image data
      });
  
      if (uploadResponse.ok) {
        // Image uploaded successfully
        console.log('Image uploaded successfully!');
        // Return the download URL for future use
        return firebaseStorageUrl;
      } else {
        // Handle error
        console.error('Failed to upload image:', uploadResponse.statusText);
        throw new Error('Failed to upload image');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  };
  
  

  const DATABASE_URL =
    "https://carpoolbuddy-d054e-default-rtdb.firebaseio.com/";
  const saveUserData = async (userId, userData) => {
    try {
      const response = await axios.put(
        `${DATABASE_URL}/users/${userId}.json`,
        userData
      );
      return response.data; // Contains the saved user data
    } catch (error) {
      console.error("Save user data failed:", error);
      throw error;
    }
  };
  const fetchAllUsers = async () => {
    if (!user || !user.idToken) {
      console.error("No user logged in or missing ID token");
      return [];
    }

    try {
      // Fetch all users' data, assuming they are stored under the "users" node
      const response = await axios.get(
        `${DATABASE_URL}users.json?auth=${user.idToken}`
      );
      const usersData = response.data
        ? Object.keys(response.data).map((key) => ({
            id: key,
            ...response.data[key],
          }))
        : [];
      return usersData; // This will be an array of user objects
    } catch (error) {
      console.error("Fetching all users failed:", error);
      throw error;
    }
  };
  const fetchUserImage = async (userId) => {
    try {
      const response = await axios.get(
        `https://firebasestorage.googleapis.com/v0/b/carpoolbuddy-d054e.appspot.com/o/profile_images%2F${userId}`
      );
      return response.data;
    } catch (error) {
      console.error("Fetching user image failed:", error);
      throw error;
    }
  };
  const fetchUserProfile = async (userId) => {
    try {
      const response = await axios.get(
        `https://carpoolbuddy-d054e-default-rtdb.firebaseio.com/users/${userId}.json`
      );
      return response.data;
    } catch (error) {
      console.error("Fetching user profile failed:", error);
      throw error;
    }
  };
 const signOut = async () => {
    try {
        // Retrieve the authToken from AsyncStorage
        const authToken = await AsyncStorage.getItem('authToken');

        // Update user status to offline if needed
        if (user && user.localId) {
            const userStatusDataBaseRef = `${DATABASE_URL}/status/${user.localId}.json`;
            await axios.put(userStatusDataBaseRef, { isOnline: false });
        }

        // Clear the authToken from AsyncStorage
        await AsyncStorage.removeItem('authToken');

        // Reset user state
        setUser(null);

        // Navigate to login or appropriate screen (optional, based on your navigation setup)
        // navigation.navigate('Login');

        // Log for successful sign out
        console.log("SignOut successful.");
    } catch (error) {
        console.error("SignOut failed:", error);
        // You may want to display a user-friendly message or handle errors differently
    }
};


const validateToken = async () => {
    try {
      const authToken = await AsyncStorage.getItem('authToken');
      if (authToken) {
        const response = await axios.post(
          `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${API_KEY}`,
          { idToken: authToken }
        );
        if (response.data && response.data.users) {
          setUser(response.data.users[0]);
          return true;
        }
      }
      setUser(null);
      return false;
    } catch (error) {
      console.error("Token validation failed:", error);
      setUser(null);
      return false;
    }
  };

  useEffect(() => {
    validateToken(); // Validate token on initial load
  }, []);

  const restructureProfileImage = async () => {
    try {
      const userId = user.localId; // Ensure you have the user's ID
      const databaseUrl =
        "https://carpoolbuddy-d054e-default-rtdb.firebaseio.com/";

      // 1. Get the existing profileImage URL
      const response = await axios.get(
        `${databaseUrl}users/${userId}/availability/profileImage.json?auth=${user.idToken}`
      );
      const profileImageUrl = response.data;

      if (!profileImageUrl) {
        console.log("Profile image not found.");
        return;
      }

      // 2. Delete the old profileImage
      await axios.delete(
        `${databaseUrl}users/${userId}/availability/profileImage.json?auth=${user.idToken}`
      );

      // 3. Set the profileImage at the root
      await axios.patch(
        `${databaseUrl}users/${userId}.json?auth=${user.idToken}`,
        {
          profileImage: profileImageUrl,
        }
      );

      console.log("Profile image restructure successful!");
    } catch (error) {
      console.error("Error restructuring profile image:", error);
    }
  };

  // Call the restructureProfileImage function when needed (e.g., after a successful image upload)
  useEffect(() => {
    if (user) {
      restructureProfileImage();
    }
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
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
        saveUserData,
        fetchAllUsers,
        fetchUserImage,
        fetchUserProfile,
        signOut,
        fetchDrivers,
        validateToken

      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
