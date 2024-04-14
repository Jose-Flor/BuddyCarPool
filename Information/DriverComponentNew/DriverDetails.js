import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

function DriverDetails({ route }) {
    const { driverDetails } = route.params;

    return (
        <View style={styles.container}>
            <Image style={styles.image} source={{ uri: driverDetails.imageUrl }} />
            <View>
                <Text style={styles.nameTitle}>{driverDetails.firstName} {driverDetails.lastName}</Text>
            </View>
            <View style={styles.subtitleContainer}>
                <Text style={styles.subtitle}>Info</Text>
            </View>
            <View style={styles.listItem}>
                <Text style={styles.textItem}>Car Model: {driverDetails.driverInfo.carModel}</Text>
                <Text style={styles.textItem}>Passenger Limit: {driverDetails.driverInfo.passengerLimit}</Text>
                <Text style={styles.textItem}>Zipcode: {driverDetails.driverInfo.zipcode}</Text>
                <Text style={styles.textItem}>Available Days: {driverDetails.driverInfo.availableDays.join(', ')}</Text>
                {/* Add more driver info here if needed */}
            </View>
            <View style={styles.subtitleContainer}>
                <Text style={styles.subtitle}>Bio</Text>
            </View>
            <View style={styles.listItem}>
                <Text style={styles.textItem}>{driverDetails.bio}</Text>
            </View>
        </View>
    );
}

export default DriverDetails;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#4C4C47',
        flex: 1
    },
    image: {
        width: 'auto',
        height: 190,
    },
    nameTitle: {
        fontWeight: 'bold',
        fontSize: 24,
        margin: 8,
        textAlign: 'center',
        color: 'white'
    },
    subtitleContainer: {
        borderBottomColor: 'white',
        borderBottomWidth: 2,
        padding: 6,
        margin: 6,
        marginHorizontal: 24
    },
    subtitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: 'white',
        textAlign: 'center',
        borderBottomColor: 'white',
        borderBottomWidth: 2
    },
    listItem: {
        borderRadius: 6,
        paddingHorizontal: 8,
        paddingVertical: 4,
        marginVertical: 8,
        marginHorizontal: 12,
        backgroundColor: "#E5DCC5"
    },
    textItem: {
        color: ' #001427',
        textAlign: 'center'
    }
});
