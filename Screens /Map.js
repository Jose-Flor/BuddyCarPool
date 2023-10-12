import React from 'react';
import { Text, View, TouchableOpacity, Linking } from 'react-native';

function Maps() {
  const handleButtonPress = () => {
    
    console.log('Button Pressed');
    
    // Open Google Maps with a specific location (you can replace the coordinates)
    const latitude = 37.7749; // Replace with the desired latitude
    const longitude = -122.4194; // Replace with the desired longitude
    const label = 'Google Maps Label'; // Replace with a label for the location

    // Construct the Google Maps URL
    const googleMapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}&label=${label}`;

    // Open the Google Maps app or a web browser with the URL
    Linking.openURL(googleMapsUrl).catch((err) => console.error('An error occurred: ', err));
  };

  return (
    <View>
      <Text>
        This is where the map showing where drivers are located
      </Text>
      <TouchableOpacity onPress={handleButtonPress}>
        <View
          style={{
            backgroundColor: 'yellow', // Button background color
            padding: 10, // Adjust the padding as needed
            borderRadius: 5, // Adjust the border radius as needed
          }}
        >
          <Text style={{ color: 'white' }}>Open Google Maps</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default Maps;
