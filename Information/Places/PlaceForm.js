import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { TextInput, Checkbox } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

function PlaceForm() {
    const [enteredTitle, setEnteredTitle] = useState('');
    const [availability, setAvailability] = useState({
        Monday: false,
        Tuesday: false,
        Wednesday: false,
        Thursday: false,
        Friday: false,
        
    });

    useEffect(() => {
        // Load stored data when the component mounts
        const loadData = async () => {
            try {
                const storedTitle = await AsyncStorage.getItem('savedTitle');
                const storedAvailability = await AsyncStorage.getItem('savedAvailability');
                if (storedTitle) {
                    setEnteredTitle(storedTitle);
                }
                if (storedAvailability) {
                    setAvailability(JSON.parse(storedAvailability));
                }
            } catch (error) {
                console.error('Failed to load data from storage', error);
            }
        };

        loadData();
    }, []);

    const changeTitleHandler = async (text) => {
        setEnteredTitle(text);
        try {
            await AsyncStorage.setItem('savedTitle', text);
        } catch (error) {
            console.error('Failed to save the title', error);
        }
    };

    const handleAvailabilityChange = async (day) => {
        const newAvailability = {
            ...availability,
            [day]: !availability[day]
        };
        setAvailability(newAvailability);
        try {
            await AsyncStorage.setItem('savedAvailability', JSON.stringify(newAvailability));
        } catch (error) {
            console.error('Failed to save availability', error);
        }
    };

    return (
        <ScrollView style={styles.container}>
            <View>
                <Text style={styles.label}>Title</Text>
                <TextInput
                    label="Enter Title"
                    value={enteredTitle}
                    onChangeText={changeTitleHandler}
                    style={styles.input}
                />
                <Text style={styles.label}>Availability:Check</Text>
                {Object.keys(availability).map(day => (
                    <View key={day} style={styles.dayContainer}>
                        <Text>{day}</Text>
                        <Checkbox
                            status={availability[day] ? 'checked' : 'unchecked'}
                            onPress={() => handleAvailabilityChange(day)}
                        />
                    </View>
                ))}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
    },
    label: {
        marginVertical: 8,
    },
    input: {
        marginBottom: 20,
    },
    dayContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8
    }
});

export default PlaceForm;
