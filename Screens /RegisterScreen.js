import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, Image, Alert, Modal, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '../Information/Store/AuthContext';
import { ActivityIndicator, Button } from 'react-native-paper';

const RegisterScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { signIn, fetchUserData } = useAuth();
    const [isLoading, setLoading] = useState(false);
    const [passcode, setPasscode] = useState('');
    const [showPasscodeModal, setShowPasscodeModal] = useState(false);

    const handleSignIn = async () => {
        setLoading(true);
        try {
            const userData = await signIn(email, password);
            if (userData && userData.localId) {
                Alert.alert('Success', 'You are signed in', [
                    {
                        text: 'OK',
                        onPress: () => {
                            // Close the alert and navigate to the Home screen
                            navigation.navigate('Home');
                        },
                    },
                ]);
            } else {
                throw new Error('Authentication failed');
            }
        } catch (error) {
            Alert.alert('Login Failed', error.message);
            console.error('Error during sign in:', error);
        } finally {
            setLoading(false);
        }
    };
    

    const verifyPasscode = () => {
        if (passcode === '2765') {
            // Correct passcode, proceed with sign-in
            signIn(email, password)
                .then(userData => {
                    if (userData && userData.localId) {
                        Alert.alert('Success', 'You are signed in');
                        navigation.navigate('Home');
                    } else {
                        throw new Error('Authentication failed');
                    }
                })
                .catch(error => {
                    Alert.alert('Login Failed', error.message);
                    console.error('Error during sign in:', error);
                })
                .finally(() => setLoading(false));
        } else {
            // Incorrect passcode
            Alert.alert('Incorrect Passcode', 'Please enter the correct passcode.');
        }
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
                <View>
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
            {/* Passcode Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={showPasscodeModal}
                onRequestClose={() => setShowPasscodeModal(false)}
            >
                <View style={styles.passcodeModalContainer}>
                    <View style={styles.passcodeModal}>
                        <Text>Please enter the passcode:</Text>
                        <TextInput
                            style={styles.passcodeInput}
                            value={passcode}
                            onChangeText={text => setPasscode(text)}
                            placeholder="Passcode"
                            keyboardType="numeric"
                            secureTextEntry={true}
                        />
                        <Button onPress={verifyPasscode}>Verify</Button>
                    </View>
                </View>
            </Modal>
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
    button: {
        width: '90%',
        paddingVertical: 8,
        marginTop: 10,
    },
    registerButton: {
        marginTop: 15,
        color: '#de0a26',
    },
    additionalText: {
        marginTop: 20,
    },
    passcodeModalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    passcodeModal: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        elevation: 5,
    },
    passcodeInput: {
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'black',
        padding: 10,
        marginVertical: 10,
    },
});
