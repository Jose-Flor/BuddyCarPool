import { useState } from "react";
import {View,StyleSheet,TextInput,Button,Text,Alert,Image,TouchableOpacity,Modal,ScrollView,Switch}from'react-native'
import DateTimePicker from'@react-native-community/datetimepicker'
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from'expo-image-picker';
import React from "react";
import * as FileSystem from 'expo-file-system';
import * as Location from 'expo-location';
import { Picker } from '@react-native-picker/picker';



function CustomButton({ title, onPress, color }) {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.button, { backgroundColor: color }]}>
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    );
}

function ScheduleLocation({route,navigation}){
    const [date,setDate]=useState(new Date());
    const [time,setTime]=useState(new Date());
    const [zipCode,setzipCode]=useState('');
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [bio,setBio]=useState('');
    const[imageUri,setImageUri] = useState(null)
    const [location,setLocation] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedDays, setSelectedDays] = useState({
        Monday: false,
        Tuesday: false,
        Wednesday: false,
        Thursday: false,
        Friday: false
    });
    const toggleDay = (day) => {
        setSelectedDays({ ...selectedDays, [day]: !selectedDays[day] });
    };

    const handleSubmitDays = () => {
        setIsModalVisible(false);
        // Process selected days or pass them to another function
    };
    const renderDaySwitches = () => {
        return Object.keys(selectedDays).map((day) => (
            <View key={day} style={styles.daySwitchContainer}>
                <Text style={styles.dayLabel}>{day}</Text>
                <Switch
                    onValueChange={() => toggleDay(day)}
                    value={selectedDays[day]}
                />
            </View>
        ));
    };
    
    const formatSelectedDays = () => {
        const days = Object.entries(selectedDays)
            .filter(([day, isSelected]) => isSelected)
            .map(([day]) => day);
        return days.join(', '); // Join selected days with a comma
    };




  
    const userData=route.params?.userData;
    

    const formatDate = (date) => {
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    };
    const formatTime = (time) => {
        return `${time.getHours()}:${time.getMinutes().toString().padStart(2, '0')}`;
    };

    const getLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission to access location was denied');
            return;
        }

        let currentLocation = await Location.getCurrentPositionAsync({});
        setLocation(currentLocation);
    };

  
    const submitHandler = async() => {
        await getLocation ();
        const ScheduleDate=new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        time.getHours(),
        time.getMinutes(),

        );
      

     
        const daysArray = Object.keys(selectedDays).filter(day => selectedDays[day]);


        const updatedUserData = {
            ...userData,
            Schedule:ScheduleDate.toISOString(),
            zipCode,
            bio,
            imageUri,//permission for pictures 
           
            selectedDays: daysArray
        };
        try {
            const existingData = await AsyncStorage.getItem('drivers');
            let newDriverList = existingData ? JSON.parse(existingData) : [];
            newDriverList.push(updatedUserData);
            await AsyncStorage.setItem('drivers', JSON.stringify(newDriverList));
            Alert.alert("Welcome to CarpoolBuddy");
            navigation.navigate('DriverList');
          } catch (error) {
            console.error('Error saving data', error);
            Alert.alert("Error", "Failed to save data");
          }
        
    };
    const handleImagePicker = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted === false) {
            Alert.alert('Permission to access camera roll is required!');
            return;
        }

        const pickerResult = await ImagePicker.launchImageLibraryAsync();
        if (pickerResult.canceled) {
            return;
        }
        if (pickerResult.assets && pickerResult.assets.length > 0) {
            const localUri = pickerResult.assets[0].uri;
            const filename = localUri.split('/').pop();
    
            // Use a file path like `FileSystem.documentDirectory` to store the image locally
            const localFileUri = `${FileSystem.documentDirectory}${filename}`;
    
            try {
                await FileSystem.copyAsync({
                    from: localUri,
                    to: localFileUri
                });
                setImageUri(localFileUri);
            } catch (err) {
                console.error('Error saving the image locally', err);
            }
        } else {
            console.warn("No image was selected");
        }

        
    };
    const handleDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowDatePicker(Platform.OS === 'ios');
    
        // Check if the selected date is Saturday (6) or Sunday (0)
        if (currentDate.getDay() === 0 || currentDate.getDay() === 6) {
            Alert.alert("Invalid Date", "Please choose a date from Monday to Friday.");
        } else {
            setDate(currentDate);
        }
    };




    return(
<<<<<<< HEAD
        <View style={styles.container}>
            <Text style={styles.label}>Schedule</Text>
            <Text style={styles.sectionTitle}>Date:</Text>
            <Button title="Choose Date" onPress={() => setShowDatePicker(true)} 
             color="#007AFF" // Change the color as needed
            />
=======
        <ScrollView style={styles.container}>
            <Text style={styles.label}>Schedule:</Text>
            <CustomButton title="Choose Date" onPress={() => setShowDatePicker(true)} color="#007AFF" />

>>>>>>> 6d00de2cf85b67469e08503014a9c6aedef52a8e
            {showDatePicker && (
                <DateTimePicker 
                value={date} 
                mode='date' 
                onChange={handleDateChange}
                />
            )}
            <Text style={styles.chosenDate}>Chosen Day: {formatDate(date)}</Text>

            <TouchableOpacity onPress={() => setIsModalVisible(true)} style={styles.button}>
                <Text style={styles.buttonText}>Select Days</Text>
            </TouchableOpacity>
            
            <Modal
                visible={isModalVisible}
                transparent={true}
                animationType="slide"
            >
                <View style={styles.modalView}>
                    <ScrollView>
                        {renderDaySwitches()}
                    </ScrollView>
                    <CustomButton title="Submit" onPress={handleSubmitDays} color="#007AFF" />
                </View>
            </Modal>
            <Text style={styles.selectedDaysText}>Chosen Days: {formatSelectedDays()}</Text>


<<<<<<< HEAD
             <Text style={styles.sectionTitle}>Select Time:</Text>
            <Button title="Choose Time" onPress={() => setShowTimePicker(true)} 
            color="#007AFF" // Change the color as needed
            />
=======
             <Text style={styles.label}>Select Time:</Text>
             <CustomButton title="Choose Time" onPress={() => setShowTimePicker(true)} color="#007AFF" />
>>>>>>> 6d00de2cf85b67469e08503014a9c6aedef52a8e
            {showTimePicker && (
                <DateTimePicker
                    value={time}
                    mode="time"
                    display="default"
                    onChange={(event, selectedTime) => {
                        setTime(selectedTime || time);
                        setShowTimePicker(false);
                    }}
                />
            )}

          <Text style={styles.chosenDate}>Chosen Time: {formatTime(time)}</Text>

                       
                       
                       
                       
                        <Text style={styles.sectionTitle}>Location Information</Text>
            <Text style={styles.sectionTitle}>Zip Code:</Text>
            <TextInput 
                style={styles.input}
                placeholder="Enter your zip code"
                keyboardType="numeric"
                value={zipCode}
                onChangeText={setzipCode}
            />
<<<<<<< HEAD
              <Text style={styles.sectionTitle}>Profile Information</Text>
            <Button title="upload picture" onPress={handleImagePicker}/>
            {imageUri ? <Image source={{ uri: imageUri }} style={{ width: 100, height: 100 }} /> : null}
            <Text style={styles.sectionTitle}>Bio:</Text>
=======
            <CustomButton title="Upload Picture" onPress={handleImagePicker} color="#007AFF" />
            {imageUri ?<Image source={{ uri: imageUri }} style={styles.image} />: null} 
>>>>>>> 6d00de2cf85b67469e08503014a9c6aedef52a8e
            <TextInput
                style={styles.input}
                placeholder="Enter a short bio"
                value={bio}
                onChangeText={setBio}
                //multiline={true}
                //numberOfLines={4}
            />
<<<<<<< HEAD
             <Button
                title="Submit"
                onPress={submitHandler}
                color="#007AFF" // Adjust the color as needed
                style={styles.button}
            />
=======
           <CustomButton title="Submit" onPress={submitHandler} color="#007AFF" />

           <CustomButton title="Fetch Location" onPress={getLocation} color="#007AFF" />
            {location && (
                <Text>Location: Latitude: {location.coords.latitude}, Longitude: {location.coords.longitude}</Text>
            )}
>>>>>>> 6d00de2cf85b67469e08503014a9c6aedef52a8e

        </ScrollView>



    );

}
export default ScheduleLocation;
const styles=StyleSheet.create({
    container:{
       flex: 1,
       padding:20,
<<<<<<< HEAD
       backgroundColor:'#f94449' //eaeaea
=======
       backgroundColor:'#f94449'
>>>>>>> 6d00de2cf85b67469e08503014a9c6aedef52a8e
    },
    sectionTitle: {
        fontSize: 15,
        fontWeight: "bold",
        marginBottom: 10,
        color: "#333",
      },
    label: {
        fontSize: 20,
        marginBottom: 8,
        fontWeight:'bold',
        color: '#333', 
    },
    input: {
        borderWidth: 1,
        borderColor: '#FFF',
        borderRadius: 8,
        padding: 12,
        marginBottom: 15,
        color:'#FFF',
    },
    submittedDataContainer: {
        marginTop: 20,
    },
    button: {
<<<<<<< HEAD
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
=======
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 15,
        backgroundColor: '#007AFF',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
>>>>>>> 6d00de2cf85b67469e08503014a9c6aedef52a8e
    },


    chosenDate: {
        fontSize: 15,
        marginBottom: 10,
        color: '#333', 
    },
    image: {
        width: 100, // Adjust as needed
        height: 100, // Adjust as needed
       
    },
    picker: {
        height: 50,
        width: "100%",
       
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 15,
    },
    modalView: {
        marginTop:100,
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 5,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    daySwitchContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    dayLabel: {
        fontSize: 18,
    },
    selectedDaysText: {
        fontSize: 16,
        color: 'blue',
        marginBottom: 10,
        fontWeight:'bold'
    },
 


})
