import React, { useState } from 'react';
import { FlatList, StyleSheet, View, Text, TouchableOpacity, Dimensions, Modal, Pressable, Image } from 'react-native';
import { Dummy_Drivers } from '../Information/dummy-data';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const windowWidth = Dimensions.get('window').width;

function CategoryScreen({ navigation }) {
    const [selectedDays, setSelectedDays] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);

    function renderItem({ item }) {
        if (selectedDays.length === 0 || item.driverInfo.availableDays.some(day => selectedDays.includes(day))) {
            return (
                <TouchableOpacity style={styles.driverContainer} onPress={() => pressHandler(item)}>
                    <Image source={item.imageUrl} style={styles.driverImage} />
                    <Text style={styles.driverName}>{item.firstName} {item.lastName}</Text>
                    <Text style={styles.availableDays}>Available Days: {item.driverInfo.availableDays.map(day => {
                        switch(day) {
                            case 'Monday':
                                return 'Mon';
                            case 'Tuesday':
                                return 'Tue';
                            case 'Wednesday':
                                return 'Wed';
                            case 'Thursday':
                                return 'Thu';
                            case 'Friday':
                                return 'Fri';
                            case 'Saturday':
                                return 'Sat';
                            case 'Sunday':
                                return 'Sun';
                            default:
                                return day;
                        }
                    }).join(', ')}</Text>
                </TouchableOpacity>
            );
        } else {
            return null;
        }
    }

    function pressHandler(driver) {
        navigation.navigate('DriverDetails', { driverDetails: driver });
    }

    function toggleDay(day) {
        if (selectedDays.includes(day)) {
            setSelectedDays(selectedDays.filter(selectedDay => selectedDay !== day));
        } else {
            setSelectedDays([...selectedDays, day]);
        }
    }

    return (
        <View style={styles.screen}>
            <Text style={styles.bannerText}>View Drivers</Text>
            <TouchableOpacity style={styles.filterButton} onPress={() => setModalVisible(true)}>
                <Text style={styles.filterButtonText}>Filter</Text>
            </TouchableOpacity>
            <GestureHandlerRootView style={styles.flatListContainer}>
                <FlatList
                    data={Dummy_Drivers}
                    keyExtractor={(item) => item.id.toString()}
                    numColumns={2}
                    renderItem={({ item }) => renderItem({ item })}
                    columnWrapperStyle={styles.row}
                />
            </GestureHandlerRootView>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(!modalVisible)}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <TouchableOpacity
                            style={styles.exitButton}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={styles.exitButtonText}>X</Text>
                        </TouchableOpacity>
                        <Text style={styles.modalText}>Select Days:</Text>
                        <View style={styles.modalDays}>
                            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                                <Pressable
                                    key={day}
                                    style={[styles.dayButton, selectedDays.includes(day) ? styles.dayButtonSelected : null]}
                                    onPress={() => toggleDay(day)}
                                >
                                    <Text>{day.slice(0, 3)}</Text>
                                </Pressable>
                            ))}
                        </View>
                        <Pressable
                            style={({ pressed }) => [
                                styles.filterButton,
                                pressed ? styles.applyFilterButtonPressed : styles.applyFilterButton
                            ]}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Text style={styles.filterButtonText}>Apply Filter</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

export default CategoryScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        paddingTop: 40
    },
    bannerText: {
        color: '#333333',
        fontSize: 22,
        fontFamily: 'Helvetica',
        fontWeight: 'bold',
        marginBottom: 20,
    },
    filterButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        padding: 10,
        backgroundColor: '#F5F5F5',
        borderRadius: 5,
    },
    filterButtonText: {
        color: '#333333',
        fontWeight: 'bold',
    },
    flatListContainer: {
        flex: 1,
        width: '100%',
    },
    driverContainer: {
        backgroundColor: '#F5F5F5',
        marginVertical: 10,
        padding: 20,
        borderRadius: 10,
        width: windowWidth / 2 - 20,
        marginHorizontal: 10,
        alignItems: 'center',
    },
    driverImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
    driverName: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    availableDays: {
        fontSize: 12,
        marginTop: 5,
        color: '#666666',
    },
    row: {
        flex: 1,
        justifyContent: 'space-around',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        elevation: 5,
    },
    modalText: {
        fontSize: 18,
        marginBottom: 10,
        paddingLeft: 30,
    },
    modalDays: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
    dayButton: {
        borderWidth: 1,
        borderColor: '#333333',
        borderRadius: 20,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    dayButtonSelected: {
        backgroundColor: '#FF999C',
    },
    applyFilterButton: {
        backgroundColor: 'white',
        borderColor: 'black',
        borderWidth: 1,
        paddingVertical: 10,
        alignItems: 'center',
        borderRadius: 5,
    },
    applyFilterButtonPressed: {
        backgroundColor: '#FF999C',
        borderColor: 'black',
        borderWidth: 1,
        paddingVertical: 10,
        alignItems: 'center',
        borderRadius: 5,
        opacity: 0.7, // Reduce opacity to indicate press
    },
    applyFilterButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    exitButton: {
        position: 'absolute',
        top: 1,
        left: 4,
        padding: 20,
    },
    exitButtonText: {
        color: '#333333',
        fontWeight: 'bold',
        fontSize: 18,
    },
});

