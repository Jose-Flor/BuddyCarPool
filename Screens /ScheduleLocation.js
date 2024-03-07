import { useState } from "react";
import {View,StyleSheet,TextInput,Button,Text,Alert,Image,TouchableOpacity,Modal,ScrollView,Switch}from'react-native'
import DateTimePicker from'@react-native-community/datetimepicker'
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from'expo-image-picker';
import React from "react";
import * as FileSystem from 'expo-file-system';
import * as Location from 'expo-location';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import { saveUserData } from "../back-end/Http";



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




  
    // const userData=route.params?.userData;
    // const userId = route.params.userData.userId;
    const { userId } = route.params.userData;


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
            ...route.params?.userData,
            Schedule:ScheduleDate.toISOString(),
            zipCode,
            bio,
            imageUri,//permission for pictures 
           
            selectedDays: daysArray
        };
        try{
            const result=await saveUserData(route.params?.userData?.userId, updatedUserData);
            Alert.alert("Schedule Added ","your schedule has been added ");
            navigation.navigate('Register');

        }catch(error){
            console.error('Error submitting the scheduele ',error);
            Alert.alert("Erorr ","failed to submit schedule ")
        }
        // try {
        //     const response = await axios.post('http://localhost:5000/schedule', updatedUserData);
        //     if (response.status === 201) {
        //         // Handle success
        //         Alert.alert("Schedule Added", "Your schedule has been successfully added.");
        //         navigation.navigate('MainScreen');
        //     } else {
        //         // Handle any other HTTP status code
        //         Alert.alert("Error", "There was a problem adding your schedule.");
        //     }
        // } catch (error) {
        //     console.error('Error submitting schedule:', error);
        //     Alert.alert("Error", "Failed to submit schedule.");
        // }
        // try {
        //     const existingData = await AsyncStorage.getItem('drivers');
        //     let newDriverList = existingData ? JSON.parse(existingData) : [];
        //     newDriverList.push(updatedUserData);
        //     await AsyncStorage.setItem('drivers', JSON.stringify(newDriverList));
        //     Alert.alert("Welcome to CarpoolBuddy");
        //     navigation.navigate('DriverList');
        //   } catch (error) {
        //     console.error('Error saving data', error);
        //     Alert.alert("Error", "Failed to save data");
        //   }
        
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
        <ScrollView style={styles.container}>
        <TouchableOpacity onPress={() => handleIconButtonPress()}>
  <View style={styles.circleIcon}>
    <View style={styles.circleBackground}>
      <Ionicons name="ios-person" size={55} color="#636363" />
    </View>
  </View>
</TouchableOpacity>
<View style={styles.SubHeader}>
  {/* Your SubHeader content here */}
</View>

<View style={styles.uploadProfileContainer}>
  <Text style={{ fontSize: 13, marginBottom: 10, color: 'black' }}>Upload Profile Picture</Text>
</View>
        
            <Text style={styles.label}>Your Availability:</Text>
            <CustomButton title="Choose Dates" onPress={() => setShowDatePicker(true)} color="#007AFF" />

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


             <Text style={styles.label}>Select Time:</Text>
             <CustomButton title="Choose Time" onPress={() => setShowTimePicker(true)} color="#007AFF" />
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
            

           <CustomButton title="Submit" onPress={submitHandler} color="#007AFF" />

           <CustomButton title="Fetch Location" onPress={getLocation} color="#007AFF" />
            {location && (
                <Text>Location: Latitude: {location.coords.latitude}, Longitude: {location.coords.longitude}</Text>
            )}

        </ScrollView>



    );

}
export default ScheduleLocation;
const styles=StyleSheet.create({
    container:{
       flex: 1,
       padding:20,
       backgroundColor:'white'
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
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 15,
        backgroundColor: '#007AFF',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },


    chosenDate: {
        fontSize: 15,
        marginBottom: 10,
        color: '#333', 
        paddingBottom: 0,
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
        fontWeight:'bold',
        paddingBottom: 30,
    },
    uploadProfileContainer: {
        flex: 1,
        justifyContent: 'center', // Center vertically
        alignItems: 'center', // Center horizontally
        paddingBottom: 30,
        
    },

    circleIcon: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 10,
      },
      circleBackground: {
        backgroundColor: 'lightgrey', // You can set any color you want
        borderRadius: 55, // Half of the icon size for a perfect circle
        padding:10, // Adjust the padding as needed
      },
})
