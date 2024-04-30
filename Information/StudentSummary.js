import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';

const Form = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = () => {
    // Validate input
    if (!name || !email) {
      Alert.alert('Error', 'Please enter both name and email');
      return;
    }

    // Send data to Django backend
    fetch('http://localhost:8000', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Success:', data);
        // Optionally, display a success message
        Alert.alert('Success', 'Data sent successfully');
        // Clear input fields
        setName('');
        setEmail('');
      })
      .catch(error => {
        console.error('Error:', error);
        // Display an error message
        Alert.alert('Error', 'An error occurred, please try again later');
      });
  };

  return (
    <View>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={text => setName(text)}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={text => setEmail(text)}
        keyboardType="email-address"
      />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

export default Form;
