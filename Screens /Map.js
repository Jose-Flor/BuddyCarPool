import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';



const Maps = () => {
  // Coordinates for CSUN
  const CSUNCoordinates = { latitude: 34.2419, longitude: -118.5283 };

  // Generate random coordinates within specific ranges
  const generateRandomCoordinate = (latitudeRange, longitudeRange) => {
    const latitude = latitudeRange.min + Math.random() * (latitudeRange.max - latitudeRange.min);
    const longitude = longitudeRange.min + Math.random() * (longitudeRange.max - longitudeRange.min);
    return { latitude, longitude };
  };

  // Ranges for different locations
  const locations = {
    VanNuys: { latitude: { min: 34.1800, max: 34.2000 }, longitude: { min: -118.4700, max: -118.4900 } },
    PorterRanch: { latitude: { min: 34.2800, max: 34.3000 }, longitude: { min: -118.5600, max: -118.5800 } },
    SanFernando: { latitude: { min: 34.2800, max: 34.3000 }, longitude: { min: -118.4400, max: -118.4600 } },
    Burbank: { latitude: { min: 34.1800, max: 34.2000 }, longitude: { min: -118.3200, max: -118.3400 } },
    WestHollywood: { latitude: { min: 34.0800, max: 34.1000 }, longitude: { min: -118.3700, max: -118.3900 } },
    DowntownLA: { latitude: { min: 34.0500, max: 34.0700 }, longitude: { min: -118.2400, max: -118.2600 } },
    Glendale: { latitude: { min: 34.1400, max: 34.1600 }, longitude: { min: -118.2500, max: -118.2700 } },
    Reseda: { latitude: { min: 34.1800, max: 34.2000 }, longitude: { min: -118.5300, max: -118.5500 } },
    AtwaterVillage: { latitude: { min: 34.1180, max: 34.1280 }, longitude: { min: -118.2620, max: -118.2820 } },
    CanogaPark: { latitude: { min: 34.2000, max: 34.2200 }, longitude: { min: -118.6200, max: -118.6400 } },
    NorthHollywood: { latitude: { min: 34.1800, max: 34.2000 }, longitude: { min: -118.3800, max: -118.4000 } },
    StudioCity: { latitude: { min: 34.1400, max: 34.1600 }, longitude: { min: -118.3800, max: -118.4000 } },
    Chatsworth: { latitude: { min: 34.2300, max: 34.2500 }, longitude: { min: -118.6000, max: -118.6200 } },
    SantaMonica: { latitude: { min: 34.0100, max: 34.0300 }, longitude: { min: -118.4900, max: -118.5100 } },
    Pacoima: { latitude: { min: 34.2600, max: 34.2800 }, longitude: { min: -118.4200, max: -118.4400 } },
    SantaClarita: { latitude: { min: 34.3800, max: 34.4000 }, longitude: { min: -118.5200, max: -118.5400 } },
    Inglewood: { latitude: { min: 33.9500, max: 33.9700 }, longitude: { min: -118.3300, max: -118.3500 } },

  };

  // Generate random coordinates for each location
  const randomCoordinates = Object.keys(locations).map((locationName) => ({
    name: locationName,
    coordinate: generateRandomCoordinate(locations[locationName].latitude, locations[locationName].longitude),
  }));

  return (
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={{ ...CSUNCoordinates, latitudeDelta: 0.3, longitudeDelta: 0.3 }}>
        {/* CSUN Marker */}
        <Marker coordinate={CSUNCoordinates} title="California State University, Northridge" pinColor="blue" />

        {/* Random Markers */}
        {randomCoordinates.map(({ name, coordinate }, index) => (
          <Marker key={index} coordinate={coordinate} title={name} pinColor="red" />
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
  },
});

export default Maps;
