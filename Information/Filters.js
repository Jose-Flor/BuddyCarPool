import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';

function DriverFilter({ selectedDay, setSelectedDay, onClose }) {
   
    const [dropdownVisible, setDropdownVisible] = useState(false);

   
    
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => setDropdownVisible(!dropdownVisible)} style={styles.toggleButton}>
                <Text style={styles.buttonText}>Select Day: {setSelectedDay}</Text>
            </TouchableOpacity>

            {dropdownVisible && (
                <View style={styles.dropdown}>
                    <Picker
                        selectedValue={selectedDay}
                        onValueChange={(itemValue) => {
                            setSelectedDay(itemValue);
                            onClose(); // Close the picker when a day is selected
                        }}
                        style={styles.picker}
                    >
                        <Picker.Item label="Monday" value="Monday" />
                        <Picker.Item label="Tuesday" value="Tuesday" />
                        <Picker.Item label="Wednesday" value="Wednesday" />
                        <Picker.Item label="Thursday" value="Thursday" />
                        <Picker.Item label="Friday" value="Friday" />
                        
                    </Picker>
                    <TouchableOpacity onPress={() => setDropdownVisible(false)} style={styles.closeButton}>
                        <Text style={styles.closeButtonText}>Close</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
}

export default DriverFilter;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 76,
    },
    picker: {
        width: '100%',
        height: 50,
    },
    dropdown: {
        marginTop: 100,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#007AFF',
        marginBottom:60
    },
    toggleButton: {
        padding: 10,
        backgroundColor: '#007AFF',
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    closeButton: {
        marginTop: 10,
        padding: 10,
        backgroundColor: '#FF6347', // Tomato color for the close button
        borderRadius: 5,
        alignItems: 'center',
    },
    closeButtonText: {
        color: 'white',
        fontSize: 16,
    },
});
