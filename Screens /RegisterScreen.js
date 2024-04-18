import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Image, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '../Information/Store/AuthContext';


const RegisterScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const{signIn}=useAuth();


    const handleSignIn = () => {
        navigation.navigate('Home')
    }
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
                <View style={styles.buttonscontainer}>
                    <TouchableOpacity style={styles.customButton} onPress={handleSignIn}>
                        <Text style={styles.buttonText}>Log In</Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.additionalText}>Don't have an account?</Text>
                <TouchableOpacity style={styles.customButton2} onPress={handleRegister}>
                    <Text style={styles.buttonText2}>Register</Text>
                </TouchableOpacity>
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
});
