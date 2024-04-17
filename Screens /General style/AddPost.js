
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, Alert, ActivityIndicator } from 'react-native';
import React, { useState, useContext } from 'react';
import { Ionicons } from '@expo/vector-icons'; // Correct import statement


import * as ImagePicker from 'expo-image-picker';
import { useAuth } from '../../Information/Store/AuthContext';





function AddPost(){
    const { user, uploadImage, saveUserData } = useAuth();

    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [post, setPost] = useState('');
  
    const takePhotoFromCamera = async () => {
        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
          });
          
          // Check if the action was cancelled by the user
          if (!result.cancelled && result.assets) {
            setImage(result.assets[0].uri);  // Updated to use the assets array
          }}
      
    const submitPost = async () => {
        if (!image || !post) {
          Alert.alert('Missing fields', 'Please add an image and a post description.');
          return;
        }
        setUploading(true);
    const imageUrl = await uploadImage(image, user.uid);
    if (imageUrl) {
      const postData = {
        userId: user.uid,
        post,
        postImg: imageUrl,
        postTime: new Date().toISOString(),
        likes: [],
        comments: [],
      };
      saveUserData(user.uid, postData);
      Alert.alert('Post published!', 'Your post has been published Successfully!');
      setPost(null);
      setImage(null);
    } else {
      Alert.alert('Upload failed', 'Failed to upload image.');
    }
    setUploading(false);
  };


  const choosePhotoFromLibrary = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  
    if (!result.canceled) {
      setImage(result.uri);
    }
  };
  
    
    return (
        <View style={style.inputWrapper}>
           {image && <Image source={{ uri: image }} style={style.image} />}
      <TextInput
        style={style.input}
        onChangeText={setPost}
        value={post}
        multiline
        numberOfLines={4}
        placeholder="What's on your mind?"
        placeholderTextColor="#666"
      />
          
          {uploading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <TouchableOpacity style={style.button} onPress={submitPost}>
          <Text style={style.buttonText}>Post</Text>
        </TouchableOpacity>
      )}
      <View style={style.iconRow}>
        <TouchableOpacity onPress={takePhotoFromCamera}>
          <Ionicons name="camera-outline" size={30} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={choosePhotoFromLibrary}>
          <Ionicons name="image-outline" size={30} color="black" />
        </TouchableOpacity>
      </View>
        </View>
      );
    
}
export default AddPost;

const style= StyleSheet.create({
    inputWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        backgroundColor: '#2e64e515',
      },
      inputField: {
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 24,
        textAlign: 'center',
        width: '90%',
        marginBottom: 15,
      },
      addImage: {
        width: '100%',
        height: 250,
        marginBottom: 15,
      },
      statusWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
      },
      submitBtn: {
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#2e64e515',
        borderRadius: 5,
        padding: 10,
        width: '50%', // Define width or use paddingHorizontal for better control
      },
      submitBtnText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2e64e5',
      },
})
