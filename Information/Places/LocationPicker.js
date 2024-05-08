import React, { useState, useEffect } from "react";

import { Image, View, StyleSheet ,ActivityIndicator} from 'react-native';

function LocationPicker({ lat, lng }) {
    const apiKey = 'AIzaSyCajkhPCLKG3hl0qcRQHZC35qpK-Nix3mw';
    // Updated URL to include a default red marker
    const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7C${lat},${lng}&key=${apiKey}`;
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(true); // Re-trigger loading state when lat or lng changes
    }, [lat, lng]);

    return (
        <View style={styles.container}>
            {loading && <ActivityIndicator size="large" />}
            <Image
                source={{ uri: imagePreviewUrl }}
                style={styles.mapImage}
                onLoad={() => setLoading(false)}
                onError={() => {
                    setLoading(false);
                    // Handle error, e.g., show a fallback UI
                }}
            />
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
        width: 200,
        height: 150,
        borderRadius: 50,
        borderWidth: 5,
        borderColor: "black",
        overflow: "hidden",
        marginBottom: 10,
    }
});

export default LocationPicker;
