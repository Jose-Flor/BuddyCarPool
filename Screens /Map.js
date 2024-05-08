import React, { useState, useEffect, useLayoutEffect,useCallback } from 'react';
import { View, StyleSheet, Text, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

import { useNavigation } from '@react-navigation/native'; // Import useNavigation
import IconButton from './General style/IconButton';
import { Icon } from 'react-native-elements';


const Maps = () => {
    const navigation = useNavigation(); // Use the hook to get navigation object
    const [region, setRegion] = useState({
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });
    const [location, setLocation] = useState(null);
    const [hasPermission, setHasPermission] = useState(null);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setHasPermission(false);
                Alert.alert('Permission Denied', 'Permission to access location was denied');
                return;
            }
            let currentLocation = await Location.getCurrentPositionAsync({});
            setLocation(currentLocation.coords);
            setRegion({
                ...region,
                latitude: currentLocation.coords.latitude,
                longitude: currentLocation.coords.longitude,
            });
            setHasPermission(true);
        })();
    }, []);

    function selectLocationHandler(event) {
        const { latitude, longitude } = event.nativeEvent.coordinate;
        setLocation({
            latitude: latitude,
            longitude: longitude
        });
        setRegion(prev => ({
            ...prev,
            latitude: latitude,
            longitude: longitude,
        }));
    }

    if (hasPermission === false) {
        return (
            <View style={styles.centered}>
                <Text>No permission to access location</Text>
            </View>
        );
    }

    const savePickedLocation = useCallback(() => {
      if (!location) {
          Alert.alert('No picked location!', 'You have to pick a location first.');
          return;
      }
      navigation.navigate('CarMapplace', { pickedLocation: { lat: location.latitude, lng: location.longitude } });
    }, [navigation, location]);
    

    useEffect(() => {
      navigation.setOptions({
          headerRight: ({tintColor}) => (
              <IconButton icon="save" size={20} color={tintColor} onPress={savePickedLocation}/>
          ),
      });
  }, [navigation, savePickedLocation]);
const goToCurrentLocation = async () => {
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Permission to access location was denied');
      return;
  }
  let currentLocation = await Location.getCurrentPositionAsync({});
  setLocation(currentLocation.coords);
  setRegion({
      ...region,
      latitude: currentLocation.coords.latitude,
      longitude: currentLocation.coords.longitude,
  });
};

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={region}
                region={region}
                onPress={selectLocationHandler}
            >
                {location && (
                    <Marker
                        coordinate={location}
                        title={"Selected Location"}
                    />
                )}
            </MapView>
            <Icon
            reverse
            name='my-location'
            type='material'
            color='#517fa4'
            onPress={goToCurrentLocation}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        flex: 1,
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default Maps;
