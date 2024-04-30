import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, ScrollView, Switch, TouchableOpacity, Alert, KeyboardAvoidingView, Platform } from 'react-native';

function RegisterForm({ navigation }) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [enteredEmail, setEnteredEmail] = useState('');
    const [enteredPassword, setEnteredPassword] = useState('');
    const [isDriver, setIsDriver] = useState(false);

    async function submitHandler() {
        // Validate input
        if (!firstName || !lastName || !enteredEmail || !enteredPassword) {
            Alert.alert('Missing Information', 'Please fill in all required fields.');
            return;
        }

        const isCSUNEmail = enteredEmail.endsWith('@my.csun.edu');
        if (!isCSUNEmail) {
            Alert.alert('Invalid Email', 'You must use a CSUN email to register.');
            return;
        }

        // Prepare data to send to backend
        const userData = {
            firstName,
            lastName,
            email: enteredEmail,
            password: enteredPassword,
            isDriver
        };

        try {
            // Send data to Django backend using fetch
            const response = await fetch('http://localhost:8000/register/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                Alert.alert('Registration Successful', 'Please sign in with your new account.');
                navigation.navigate('Login'); // Navigate to the login screen
            } else {
                const errorMessage = await response.text();
                Alert.alert('Registration Failed', errorMessage || 'Failed to register. Please try again.');
            }
        } catch (error) {
            console.error('Registration failed:', error);
            Alert.alert('Registration Failed', 'Failed to register. Please try again.');
        }
    }

    return (
        <KeyboardAvoidingView 
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <ScrollView style={styles.container}>
                <Text style={styles.Header}>Create Account</Text>

                <TextInput 
                    autoCapitalize='none'
                    placeholder="First Name"
                    placeholderTextColor="#bcbcbc"  
                    onChangeText={(text) => setFirstName(text)}
                    value={firstName}
                    style={{
                        ...styles.inputContainer,
                        backgroundColor: 'white', 
                        color: 'black',
                    }}
                />
                <TextInput
                    autoCapitalize='none'
                    placeholder="Last Name"
                    placeholderTextColor="#bcbcbc"  
                    onChangeText={(text) => setLastName(text)}
                    value={lastName}
                    style={{
                        ...styles.inputContainer,
                        backgroundColor: 'white', 
                        color: 'black',
                    }}
                />
                <View style={styles.switchContainer}>
                    <Text>Are you a driver?</Text>
                    <Switch
                        value={isDriver}
                        onValueChange={(newValue) => setIsDriver(newValue)}
                    />
                </View>
                {/* Other input fields for driver information */}
                {/* Input field for email */}
                {/* Input field for password */}
                <TouchableOpacity onPress={submitHandler} style={styles.button}>
                    <Text style={{ color: 'white' }}>Register</Text>
                </TouchableOpacity>
                <Text style={{ marginTop: 10, textAlign: 'center', color: '#666666' }}>
                    By clicking the Register button, you agree to our <Text style={{ color: '#E50025' }}>Terms & Conditions</Text>.
                </Text>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: 'lightgrey',
    },
    Header: {
        fontSize: 26,
        marginBottom: 10,
        fontWeight: 'bold',
        alignItems: 'center'
    },
    inputContainer: {
        borderWidth: 1,
        borderColor: '#FFF',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        color: '#FFF',
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10,
    },
    button: {
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 8,
    },
});

export default RegisterForm;
