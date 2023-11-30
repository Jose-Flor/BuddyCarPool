
import{View,Text,StyleSheet, ScrollView,Button,Image,Alert}from 'react-native'
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


function DriverOverView({route}){
const [drivers,setDrivers]=useState(null);
const driverId=route.params?.driverId;
useEffect(() => {
    const fetchDriver = async () => {
        try {
            const storedDrivers = await AsyncStorage.getItem('drivers');
            if (storedDrivers !== null) {
                const drivers = JSON.parse(storedDrivers);
                // Find the driver by ID or other unique property
                const foundDriver = drivers.find(d => d.id === driverId);
                setDrivers(foundDriver);
            }
        } catch (error) {
            Alert.alert("Error", "Failed to load driver details");
        }
    };

    fetchDriver();
}, [driverId]);

if (!drivers) {
    return <View style={styles.container}><Text>Loading...</Text></View>;
}
    
    return (
        <ScrollView style={styles.container}>
             <View style={styles.header}>
                <Image source={{uri:drivers.pictureUrl}}style={styles.driverImage}/>
                <Text>{drivers.firstName}{drivers.lastName}</Text>
                <Text>{drivers.email}</Text>
                <Text>{drivers.Schedule}</Text>

            </View>

        </ScrollView>

    );
    //the button must navigate to text 

};
export default DriverOverView;
const styles = StyleSheet.create({
    DriverOverView:{
        flex: 1,
        backgroundColor: '#f0f0f0'
    },
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
    },
    header: {
        alignItems: 'center',
        padding: 20,
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
        backgroundColor:'#ffffff'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
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

});
