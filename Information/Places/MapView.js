import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

function MapView(){
    const initialRegion = {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      };
    

    return(
        <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={initialRegion}
        >
          {/* Optional: Add a Marker at the initial region */}
          <Marker
            coordinate={initialRegion}
            title="Starting Point"
            description="This is where we start!"
          />
        </MapView>
      </View>
    );

    
}
export default MapView;
const styles = StyleSheet.create({
    container: {
      flex: 1, // Ensure the container fills the whole screen
    },
    map: {
      flex: 1, // Ensure the map fills the container
    },
  });