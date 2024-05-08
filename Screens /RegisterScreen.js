import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Image, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '../Information/Store/AuthContext';
import { ActivityIndicator, Button } from 'react-native-paper';



const RegisterScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const{signIn,fetchUserData}=useAuth();
    const [isLoading, setLoading] = useState(false); 
     // Loading state
 
     


     const handleSignIn = async () => {
        setLoading(true);
        try {
          const userData = await signIn(email, password);
          if (userData && userData.localId) {  // Check for localId instead of idToken
            Alert.alert('Success', 'You are signed in');
            // Directly use userData or fetch additional profile data as needed
            navigation.navigate('Home');
          } else {
            throw new Error('Authentication failed');
          }
        } catch (error) {
          Alert.alert("Login Failed", error.message);
          console.error("Error during sign in:", error);
        }
        setLoading(false);
    };
    
      

    const handleRegister = () => {
        navigation.navigate('RegisterForm');
    };

    return (
        <LinearGradient
            colors={['white', 'white']}
            style={styles.gradientContainer}
            start={[0, 0]}
            end={[1, 1]}
        >
            <View style={styles.container}>
                <View  >
                    <Image source={require('../assets/logo.jpg')} style={{ width: 250, height: 200 }} />
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
                {isLoading ? (
                    <ActivityIndicator animating={true} color="#6200ee" />
                ) : (
                    <Button mode="contained" onPress={handleSignIn} style={styles.button}>
                        Log In
                    </Button>
                )}
                <Text style={styles.additionalText}>Don't have an account?</Text>
                <Button onPress={handleRegister} style={styles.registerButton}>
                    Register
                </Button>
                <Image source={require('../assets/CSUNlogo.jpg')} style={{ width: 100, height: 100, marginTop: 60 }} />
            </View>
        </LinearGradient>
    );
};

export default RegisterScreen;

const styles = StyleSheet.create({
    gradientContainer: {
        flex: 1,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 50,
    },
    dummyText: {
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
        height: 40,
    },
    customButton: {
        backgroundColor: 'black',
        padding: 10,
        borderRadius: 10,
        marginTop: 'none',
    },
    buttonText: {
        color: 'white',
        fontSize: 15,
        textAlign: 'center',
    },
    buttonText2: {
        color: '#de0a26',
        fontSize: 15,
        textAlign: 'center',
    },
    buttonscontainer: {
        marginTop: 50,
        padding: 10,
        width: '90%',
        borderRadius: 55,
    },
    inputContainer: {
        alignItems: 'center',
        width: '100%',
        padding: 5,
    },
    TextInput: {
        borderRadius: 10,
        padding: 15,
        marginVertical: 10,
        width: '100%',
        backgroundColor: '#ECECEC',
    },
    titleText: {
        fontStyle: 'italic',
        fontSize: 60,
        color: 'red',
        textAlign: 'center',
    },
    subtitleText: {
        color: 'black',
        textAlign: 'center',
    },
    image2: {
        height: 85,
        width: 85,
        marginTop: 30,
    },
    button: {
        width: '90%',
        paddingVertical: 8,
        
    },
    registerButton: {
        marginTop: 15,
        color: '#de0a26',
    },
    additionalText: {
        marginTop: 20,
    },

});
