import React, { useContext, useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Alert } from 'react-native';
import { useAuth } from '../Store/AuthContext'; // Adjust the import path as necessary
import Loading from '../Store/Loading';

function DriverDetails({ route }) {
    const { driverId } = route.params; // Retrieve the passed driverId
    const { fetchUserData,fetchUserProfile } = useAuth();
    const [driverDetails, setDriverDetails] = useState(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                const userProfileData = await fetchUserProfile(driverId);
                const userData = await fetchUserData(driverId);
                
                if (userProfileData && userData) {
                    // Combine data from both functions if needed
                    const combinedData = {
                        ...userProfileData,
                        ...userData
                    };
                    
                    setDriverDetails(combinedData);
                } else {
                    Alert.alert('No data', 'No driver details available.');
                }
            } catch (error) {
                console.error('Error fetching driver details:', error);
                Alert.alert('Error', 'Failed to fetch driver details.');
            }
        };
    
        loadData();
    }, [driverId]);
    
    if(Loading){}

    if (!driverDetails) {
        return <Text>Loading...</Text>; // Add loading state handling
    }
if(driverDetails){
    return (
        <View style={styles.container}>
            <Image style={styles.image} source={{ uri: driverDetails.profileImage }} />
            <Text style={styles.nameTitle}>{driverDetails.firstName} {driverDetails.lastName}</Text>
            <View style={styles.subtitleContainer}>
                <Text style={styles.subtitle}>Info</Text>
            </View>
            <View style={styles.listItem}>
                <Text style={styles.textItem}>Car Model: {driverDetails.carModel}</Text>
                <Text style={styles.textItem}>Passenger Limit: {driverDetails.passengerLimit}</Text>
                <Text style={styles.textItem}>Available Days: {driverDetails.availableDays ? driverDetails.availableDays.join(', ') : 'Not specified'}</Text>
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
}

export default DriverDetails;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#EAE3EA',
        flex: 1
    },
    image: {
        width: '100%',
        height: 190,
        resizeMode: 'cover'
    },
    nameTitle: {
        fontWeight: 'bold',
        fontSize: 24,
        margin: 8,
        textAlign: 'center',
        color: 'black'
    },
    subtitleContainer: {
        borderBottomColor: 'black',
        borderBottomWidth: 2,
        padding: 6,
        margin: 6,
        marginHorizontal: 24
    },
    subtitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: 'black',
        textAlign: 'center'
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
        color: '#001427',
        textAlign: 'center'
    }
});