import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import DropDownPicker from 'react-native-dropdown-picker';

function DriverFilter({ selectedDay, setSelectedDay, onClose }) {
   
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(selectedDay);
    const [items, setItems] = useState([
        {label: 'Monday', value: 'Monday'},
        {label: 'Tuesday', value: 'Tuesday'},
        {label: 'Wednesday', value: 'Wednesday'},
        {label: 'Thursday', value: 'Thursday'},
        {label: 'Friday', value: 'Friday'},
    ]);

    return (
        <View style={styles.container}>
            <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={(callback) => {
                    setValue(callback);
                    setSelectedDay(callback);
                }}
                setItems={setItems}
                onClose={onClose}
                zIndex={3000}
                zIndexInverse={1000}
                style={styles.picker}
                dropDownContainerStyle={styles.dropdown}
                textStyle={styles.textStyle}
                arrowColor="#007AFF"
                arrowSize={20}
                dropDownDirection="BOTTOM"
            />
        </View>
    );
}

export default DriverFilter;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        justifyContent: 'center',

    },
    picker: {
        backgroundColor: '#ffffff',
        borderColor: '#dddddd',
        borderWidth: 1,
        borderRadius: 8,
    },
    dropdown: {
        borderColor: '#dddddd',
        borderWidth: 1,
        borderRadius: 8,
        backgroundColor: '#ffffff',
    },
    textStyle: {
        fontSize: 16,
        color: '#333333',
    }
});