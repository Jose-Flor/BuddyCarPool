import React, { useEffect } from 'react';
import { View, Button, Alert } from 'react-native';
import * as Location from 'expo-location';

function Maps() {
  useEffect(() => {
    getLocationPermission();
  }, []);

  const getLocationPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'You need to enable location permissions to use this feature.');
      }
    } catch (error) {
      console.error('Error requesting location permission:', error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Allow Location Access" onPress={getLocationPermission} />
    </View>
  );
}

export default Maps;
