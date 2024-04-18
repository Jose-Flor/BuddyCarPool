import React from 'react';
import { Image, View, StyleSheet } from 'react-native';

function LocationPicker({ lat, lng }) {
    const apiKey = 'AIzaSyCajkhPCLKG3hl0qcRQHZC35qpK-Nix3mw';
    const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=400x200&maptype=roadmap
    &markers=color:red%7Clabel:S%7C${lat},${lng}&key=${apiKey}`;

    return (
        <View style={styles.container}>
            <Image source={{ uri: imagePreviewUrl }} style={styles.mapImage} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
    },
    mapImage: {
        width: '100%',
        height: '100%',
    }
});

export default LocationPicker;
