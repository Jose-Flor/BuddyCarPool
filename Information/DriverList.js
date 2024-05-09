import React, { useState, useEffect } from 'react';
import { FlatList, Pressable, View, Text, StyleSheet, Platform, Alert, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { fetchAllData } from '../back-end/Http';

function GridTile({ name, Schedule, licensePlate, onPress, imageUri, selectedDays, carType, carModel }) {
    const formattedDays = Array.isArray(selectedDays) ? selectedDays.join(', ') : 'No days selected';

    return (
        <View style={styles.gridItem}>
            <Pressable
                android_ripple={{ color: '#ccc' }}
                style={({ pressed }) => [styles.Button, pressed ? styles.buttonPressed : null]}
                onPress={onPress}
            >
                <View style={styles.innerContainer}>
                    {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
                    <Text style={styles.Namesid}>{name}</Text>
                    <Text style={styles.details}>Schedule: {Schedule}</Text>
                    <Text style={styles.details}>License: {licensePlate}</Text>
                    <Text style={styles.details}>Car Type: {carType}</Text>
                    <Text style={styles.details}>Car Model: {carModel}</Text>
                    <Text style={styles.details}>Days: {formattedDays}</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <Pressable
                        style={styles.interactionButton}
                        onPress={() => {/* Handle message action */}}
                    >
                        <Ionicons name='chatbubbles' size={29} color='white' />
                    </Pressable>
                    <Pressable
                        style={styles.interactionButton}
                        onPress={() => {/* Handle call action */}}
                    >
                        <Ionicons name='call' size={30} color='white' />
                        <Text>Request</Text>
                    </Pressable>
                </View>
                {/* Add your button here */}
                <View style={styles.bottomButton}>
                    <Text style={styles.buttonText}>Your Button</Text>
                </View>
            </Pressable>
        </View>
    );
}

function Driverlist({ navigation, filteredDrivers }) {
    const [drivers, setDrivers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { drivers } = await fetchAllData();
                setDrivers(drivers);
            } catch (error) {
                Alert.alert('Error', 'Failed to fetch drivers');
            }
        };

        fetchData();
    }, []);

    const handlePress = (driver) => {
        navigation.navigate('DriverOverView', { driver });
    };

    const dataToShow = filteredDrivers && filteredDrivers.length > 0 ? filteredDrivers : drivers;
    const keyExtractor = (item, index) => {
        return item.id ? item.id.toString() : `driver-${index}`;
    };

    return (
        <FlatList
            data={dataToShow}
            keyExtractor={keyExtractor}
            renderItem={({ item }) => (
                <GridTile
                    name={`${item.firstName} ${item.lastName}`}
                    Schedule={item.Schedule ? new Date(item.Schedule).toLocaleString() : 'Not scheduled'}
                    licensePlate={item.licensePlate}
                    imageUri={item.imageUri}
                    selectedDays={item.selectedDays}
                    carType={item.driverInfo?.carType}
                    carModel={item.driverInfo?.carModel}
                    onPress={() => handlePress(item)}
                />
            )}
            numColumns={2}
        />
    );
}

export default Driverlist;

const styles = StyleSheet.create({
    gridItem: {
        flex: 1,
        margin: 16,
        height: 200,
        borderRadius: 8,
        elevation: 4,
        backgroundColor: 'white',
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowOffset: { width: 3, height: 3 },
        shadowRadius: 9,
        overflow: Platform.OS === 'android' ? 'hidden' : 'visible'
    },
    Button: {
        flex: 1,
    },
    buttonPressed: {
        opacity: 0.5
    },
    innerContainer: {
        flex: 1,
        padding: 16,
        justifyContent: 'center',
        alignItems: 'center'
    },
    Namesid: {
        fontWeight: 'bold',
        fontSize: 10
    },
    details: {
        fontSize: 12
    },
    image: {
        width: '100%',
        height: 100,
        borderRadius: 8
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
    },
    interactionButton: {
        flexDirection: 'row',
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 5
    },
    bottomButton: {
        position: 'absolute',
        bottom: 10,
        backgroundColor: 'red',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
});
