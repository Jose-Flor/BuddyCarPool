
import{View,Text,StyleSheet, ScrollView,Button,Image,Alert,Modal}from 'react-native'
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MapView, { Marker } from 'react-native-maps';



function DriverOverView({route,navigation}){

const [isMapVisible, setIsMapVisible] = useState(false);
const driver = route.params?.driver;

const toggleMapVisibility = () => {
    setIsMapVisible(!isMapVisible);
};
const csunCoordinates = {
    latitude: 34.238125,
    longitude: -118.530123,
};

useEffect(() => {
    const fetchDriver = async () => {
      try {
        const storedDrivers = await AsyncStorage.getItem('drivers');
        if (storedDrivers !== null) {
          const drivers = JSON.parse(storedDrivers);
          // Find the driver by ID or other unique property
          const foundDriver = drivers.find((d) => d.id === driver);
          setDriver(foundDriver);
        }
      } catch (error) {
        Alert.alert('Error', 'Failed to load driver details');
      }
    };

    fetchDriver();
  }, [driver]);

  console.log(driver)
if (!driver) {
    return <View style={styles.container}><Text>Loading...</Text></View>;
}
    
return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: driver?.imageUri }} style={styles.driverImage} />
        <Text style={styles.name}>
          {driver.firstName} {driver.lastName}
        </Text>
        <Text style={styles.detail}>{driver.email}</Text>
        <Text style={styles.detail}>
          Available Days: {driver.selectedDays ? driver.selectedDays.join(', ') : 'N/A'}
        </Text>
        {driver.isDriver && (
          <>
            <Text style={styles.detail}>Car Model: {driver.driverInfo.carModel}</Text>
            <Text style={styles.detail}>Car Type: {driver.driverInfo.carType || 'N/A'}</Text>
            <Text style={styles.detail}>License Plate: {driver.driverInfo.licensePlate}</Text>
            <Text style={styles.detail}>Passenger Capacity: {driver.driverInfo.passengerLimit}</Text>
          </>
        )}
        <Text style={styles.detail}>Schedule: {new Date(driver.scheduleDate).toLocaleString()}</Text>
        <Text style={styles.detail}>Zip Code: {driver.zipCode}</Text>
        <Text style={styles.detail}>Bio: {driver.bio}</Text>
        <Button title="View Location" onPress={toggleMapVisibility} />
        <Modal visible={isMapVisible} transparent={false}>
          <View style={styles.mapContainer}>
            <MapView
              style={styles.map}
              initialRegion={{
                ...csunCoordinates,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
              }}>
              <Marker coordinate={csunCoordinates} />
            </MapView>
            <Button title="Close" onPress={toggleMapVisibility} />
          </View>
        </Modal>
      </View>
    </ScrollView>
  );

};
export default DriverOverView;
const styles = StyleSheet.create({
    DriverOverView:{
        flex: 1,
        backgroundColor: 'balck'
    },
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    header: {
        alignItems: 'center',
        padding: 20,
        borderBottomColor: '#333',
        borderBottomWidth: 1,
        backgroundColor: 'black',
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 10,
    },

    detail: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: 'white',
    },
    driverImage: {
        width: 150,
        height: 150,
        borderRadius: 75,
        marginBottom: 10,
    },
    heartButton: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
    content: {
        padding: 20,
    },
    bio: {
        marginBottom: 20,
    },
    scheduleTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    carDetails: {
        marginBottom: 10,
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 75,
        marginBottom: 20,
    },
    imagePlaceholder: {
        width: 150,
        height: 150,
        borderRadius: 75,
        marginBottom: 20,
        backgroundColor: '#cccccc',
        justifyContent: 'center',
        alignItems: 'center',
    },
    mapContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    map: {
        width: '100%',
        height: '100%',
    },


});
