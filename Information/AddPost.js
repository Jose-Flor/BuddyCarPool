// AddPost.js
import React, { useState } from 'react';
import { View, TextInput, Button, TouchableOpacity, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';

const suggestions = [
    { label: 'Need a ride 🚗', value: 'Need a ride 🚗' },
    { label: 'Car got crashed 🚗💥', value: 'Car got crashed 🚗💥' },
    { label: 'Need carpool 🚗👥', value: 'Need carpool 🚗👥' },
    { label: 'Tire burst 🚗💥🔧', value: 'Tire burst 🚗💥🔧' },
    { label: 'Traffic jam 🚗🚦', value: 'Traffic jam 🚗🚦' },
    { label: 'Out of gas ⛽️', value: 'Out of gas ⛽️' },
    { label: 'Car service due 🚗🔧', value: 'Car service due 🚗🔧' },
    { label: 'Stuck in a parking lot 🚗🅿️', value: 'Stuck in a parking lot 🚗🅿️' },
    { label: 'Car overheated 🚗🔥', value: 'Car overheated 🚗🔥' },
    { label: 'Got a speeding ticket 🚗💨🎫', value: 'Got a speeding ticket 🚗💨🎫' },
    { label: 'Windshield cracked 🚗🕶️', value: 'Windshield cracked 🚗🕶️' },
    { label: 'Lost car keys 🚗🔑', value: 'Lost car keys 🚗🔑' },
];

function AddPost() {
    const [post, setPost] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [photo, setPhoto] = useState(null);
    const navigation = useNavigation();

    const selectSuggestion = (suggestion) => {
        setPost(post + suggestion.value);
        setShowSuggestions(false);
    };

    const submitPost = () => {
        const newPost = { postText: post, postImg: photo };
        navigation.navigate('StudentSummary', { newPost });
    };

    const takePhotoFromCamera = async () => {
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
        if (!result.cancelled) {
            setPhoto(result.uri);
            console.log('Image captured:', result.uri);
        }
    };

    const choosePhotoFromLibrary = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.cancelled) {
            setPhoto(result.uri);
            console.log('Image selected:', result.uri);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.inputWrapper}>
                <TextInput
                    style={styles.input}
                    onChangeText={setPost}
                    value={post}
                    multiline
                    placeholder="What's on your mind?"
                    placeholderTextColor="#666"
                    autoFocus={true}
                    selectionColor="#2e64e5"
                />
                <TouchableOpacity style={styles.suggestionButton} onPress={() => setShowSuggestions(!showSuggestions)}>
                    <Ionicons name="car-outline" size={24} color="#2e64e5" />
                </TouchableOpacity>
            </View>
            {showSuggestions && (
                <View style={styles.suggestionWrapper}>
                    <ScrollView>
                        {suggestions.map((suggestion, index) => (
                            <TouchableOpacity
                                key={index}
                                style={styles.suggestionItem}
                                onPress={() => selectSuggestion(suggestion)}
                            >
                                <Text style={styles.suggestionText}>{suggestion.label}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
            )}
            <View style={styles.buttonWrapper}>
                <TouchableOpacity style={styles.button} onPress={takePhotoFromCamera}>
                    <View style={styles.iconSquare}>
                        <Ionicons name="camera-outline" size={24} color="#999" />
                    </View>
                    <Text style={styles.buttonText}>Camera</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={choosePhotoFromLibrary}>
                    <View style={styles.iconSquare}>
                        <Ionicons name="image-outline" size={24} color="#999" />
                    </View>
                    <Text style={styles.buttonText}>Gallery</Text>
                </TouchableOpacity>
                <Button onPress={submitPost} title="Post" />
            </View>
            {photo && (
                <View style={styles.imagePreview}>
                    <Text style={styles.imageText}>Selected Image:</Text>
                    <Image source={{ uri: photo }} style={styles.image} />
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        padding: 20,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    input: {
        flex: 1,
        minHeight: 100,
        padding: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        backgroundColor: '#f0f0f0',
        marginRight: 10,
    },
    suggestionButton: {
        backgroundColor: '#f0f0f0',
        padding: 10,
        borderRadius: 5,
    },
    suggestionWrapper: {
        backgroundColor: '#f0f0f0',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        flex: 1,
    },
    suggestionItem: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 5,
        marginBottom: 5,
    },
    suggestionText: {
        fontSize: 16,
        color: '#2e64e5',
    },
    buttonWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    button: {
        alignItems: 'center',
    },
    buttonText: {
        marginTop: 5,
        color: '#999',
    },
    iconSquare: {
        backgroundColor: '#f0f0f0',
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    imagePreview: {
        marginTop: 20,
        alignItems: 'center',
    },
    imageText: {
        fontSize: 18,
        marginBottom: 10,
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 10,
    },
});

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
