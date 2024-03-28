import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Image, Alert } from 'react-native';


const RegisterScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const API_URL =  'http://localhost:5000'
    const handleSignIn = async () => {
        try {
            console.log('Sending POST request to login endpoint...');
            const response = await fetch('http://10.40.174.182:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            });
    
            console.log('Response received:', response);
    
            if (!response.ok) {
                // Handle non-2xx responses
                console.log('Request failed with status:', response.status);
                const errorData = await response.json();
                console.log('Error data:', errorData);
                throw new Error(errorData.error || 'Failed to sign in');
            }
    
            const responseData = await response.json();
            console.log('Response data:', responseData);
    
            if (responseData.success) {
                // Login successful, navigate to another screen
                navigation.navigate('main');
            } else {
                Alert.alert('Error', responseData.error || 'Failed to sign in');
            }
        } catch (error) {
            console.error('Sign-in error:', error.message);
            Alert.alert('Error', error.message || 'An unexpected error occurred. Please try again later.');
        }
    };
    
    
    const handleRegister = () => {
        navigation.navigate('RegisterForm');
    };

    return (
        <View style={styles.container}>
            <View style={styles.mainContainer}>
                <Image source={require('../assets/logo.jpg')} style={{ width: 200, height: 200 }}/>
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="CSUN Email"
                    value={email}
                    onChangeText={text => setEmail(text)}
                    placeholderTextColor="darkgrey"
                />
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Password"
                    value={password}
                    onChangeText={text => setPassword(text)}
                    placeholderTextColor="darkgrey"
                    secureTextEntry={true}
                />
            </View>
            <View style={styles.buttonscontainer}>
                <TouchableOpacity style={styles.customButton} onPress={handleSignIn}>
                    <Text style={styles.buttonText}>Log In</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.additionalText}>Don't have an account?</Text>
            <TouchableOpacity style={styles.customButton2} onPress={handleRegister}>
                <Text style={styles.buttonText2}>Register</Text>
            </TouchableOpacity>
            <Image source={require('../assets/CSUNlogo.jpg')} style={{ width: 100, height: 100, marginTop: 60}}/>
        </View>
    );
};

export default RegisterScreen;
const styles=StyleSheet.create({
    container:{
      backgroundColor:'white',
      flex:1,
      justifyContent: 'center',
      alignItems: 'center',
      padding:50,
      
    },
    
    dummyText:{
        textDecorationStyle: 'none',
        color: 'red',
         },

        imageContainer: {
            width: 250,     
            height: 250, 
            paddingLeft: 50, 
         },

        image: {
            flex: 1,        
            width: undefined,
            height: undefined,
        },
    
        
    customButton: {
          backgroundColor: 'black', 
          padding: 10, 
          borderRadius: 10,
          marginTop: 'none',
        },
        
    buttonText:{
        
        color: 'white',
        fontSize: 15,
        textAlign: 'center',
    },

    buttonText2:{
        
        color: 'red',
        fontSize: 15,
        textAlign: 'center',
    },

    buttonscontainer: {
        marginTop: 50,
        padding: 10,
        width: '90%',
        borderRadius: 55,
    },

    inputContainer:{
        alignItems: 'center',
        width:'100%',
        padding:5,
       
    },
    TextInput:{
     
     borderRadius: 10,
     padding:15,
     marginVertical:10,
     width:'100%',
     backgroundColor: '#ECECEC',
    },
    titleText:{
        fontStyle:'italic',
        fontSize:60,
        color: 'red',
        textAlign: 'center'
    },
    subtitleText:{
        color:'black',
        textAlign: 'center'
        


    },

    image2:{
        height: 85,
        width: 85,
        marginTop: 30,
    },

    
}
)    