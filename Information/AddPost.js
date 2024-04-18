
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, Alert, ActivityIndicator } from 'react-native';
import React, { useState, useContext } from 'react';
import { Ionicons } from '@expo/vector-icons'; // Correct import statement


import * as ImagePicker from 'expo-image-picker';
import { useAuth } from './Store/AuthContext';
import { Button } from 'react-native-paper';
import { color } from 'react-native-elements/dist/helpers';





function AddPost(){
    const { user, uploadImage, saveUserData } = useAuth();

    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [post, setPost] = useState('');
    const [postMedia, setPostMedia] = useState({ type: null, uri: null });

  
   const takePhotoFromCamera=async()=>{
    let { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
        alert('Sorry, we need camera permissions to make this work!');
        return;
    }
    let result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
    });
    if (!result.canceled) {
        setPostMedia({ type: 'image', uri: result.assets[0].uri });
    }

   }

      
    const submitPost = async () => {
        if ( !post) {
          Alert.alert('Missing fields', 'Please  a post description.');
          return;
        }
        setUploading(true);

    const imageUrl = await uploadImage(postMedia.uri, user.uid);
    if (imageUrl) {
      const postData = {
        userId: user.uid,
        post,
        postImg: imageUrl,
        postTime: new Date().toISOString(),
        likes: [],
        comments: [],
      };
     await saveUserData(user.uid, postData);
      Alert.alert('Post published!', 'Your post has been published Successfully!');
      setPost('');
      setImage({ type: null, uri: null });
    } else {
      Alert.alert('Upload failed', 'Failed to upload image.');
    }
    setUploading(false);
  };


  const choosePhotoFromLibrary = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
    });
    if (!result.canceled) {
        setPostMedia({ type: 'image', uri: result.assets[0].uri });
    }

  };
  
    
    return (
        <View style={style.inputWrapper}>
           {postMedia.uri && <Image source={{ uri: postMedia.uri  }} style={style.image} />}
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
       <Button
       mode='contained'
       
       onPress={submitPost}
       style={style.button}
       loading={uploading}
       disabled={uploading}
       
       >

        Post
       </Button>
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
      image: {
        width: 300, // Adjust as necessary
        height: 300, // Adjust as necessary
        marginBottom: 20,
    },
    button: {
        marginTop: 10,
    },
    input: {
        width: '90%',
        minHeight: 100,
        padding: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 10,
    },

})
