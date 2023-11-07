// MapScreen.js

import React from 'react';
import { View } from 'react-native';
import MapView, { PROVIDER_GOOGLE ,Marker} from 'react-native-maps';

function MapScreen() {
    const Studentlocation={
        latitude:34.2507,
        longitude:-118.5190
    };
  return (
    <View style={{ flex: 1 }}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 34.2397,
          longitude: -118.5291,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
        coordinate={Studentlocation}
        title={"Student location"}
        description={"student address"}
        />
      </MapView>
    </View>
  );
}

export default MapScreen;
