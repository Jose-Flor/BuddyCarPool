import MapScreen from './MapScreen';

function Maps(){
    return (
        <View style={{ flex: 1 }}>
          <MapView
            style={{ flex: 1 }}
            initialRegion={{
              latitude:  34.2397,
              longitude: -118.5291,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          />
        </View>
      );
    }
    
    export default MapScreen;