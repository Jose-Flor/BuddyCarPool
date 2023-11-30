import { useState } from "react";
import {View,StyleSheet,TextInput,Button,Text,Alert}from'react-native'
import DateTimePicker from'@react-native-community/datetimepicker'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { launchImageLibrary } from "react-native-image-picker";
import React from "react";


function ScheduleLocation({route,navigation}){
    const [date,setDate]=useState(new Date());
    const [time,setTime]=useState(new Date());
    const [zipCode,setzipCode]=useState('');
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [bio,setBio]=useState('');
    const[imageUri,setImageUri] = useState('')
    const [location,setLocation] = useState(null);
    

  
    const userData=route.params?.userData;

    const formatDate = (date) => {
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    };
    const formatTime = (time) => {
        return `${time.getHours()}:${time.getMinutes().toString().padStart(2, '0')}`;
    };
    const handleImagePicker=()=>{
        const options={
            storageOption:{
                skipBackup:true,
                path:'images'
            },
        };
        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                const source = { uri: response.uri };
                setImageUri(source.uri);
            }
        });


    }
    const submitHandler = async() => {
        const ScheduleDate=new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        time.getHours(),
        time.getMinutes(),

        );

        const updatedUserData = {
            ...userData,
            Schedule:ScheduleDate.toISOString(),
            zipCode,
            bio,
            pictureUrl:imageUri,
        };
        try{
            const exsitingData =await AsyncStorage.getItem('drivers');
            let newDriverList=exsitingData ? JSON.parse(exsitingData):[]
            newDriverList.push(updatedUserData)

            await AsyncStorage.setItem('drivers',JSON.stringify(newDriverList));
            Alert.alert("Welcome to CarpoolBuddy");
            navigation.navigate('DriverList');
        }catch(error){
            console.error('Erorr saving date',error);
            Alert.alert("Error","failed to save data")
        }


        
    };
    




    return(
        <View style={styles.container}>
            <Text style={styles.label}>Schedule:</Text>
            <Button title="Choose Date" onPress={() => setShowDatePicker(true)} />
            {showDatePicker && (
                <DateTimePicker 
                value={date} 
                mode='date' 
                
                onChange={(event, selectedDate) => {
                    const currentDate=selectedDate || date;
                    setShowDatePicker(Platform.OS === 'ios');
                    setDate(currentDate)
                }}
                />
            )}
                        <Text style={styles.chosenDate}>Chosen Day: {formatDate(date)}</Text>

             <Text style={styles.label}>Select Time:</Text>
            <Button title="Choose Time" onPress={() => setShowTimePicker(true)} />
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


            <Text style={styles.label}>Zip Code:</Text>
            <TextInput 
                style={styles.input}
                placeholder="Enter your zip code"
                keyboardType="numeric"
                value={zipCode}
                onChangeText={setzipCode}
            />
            <Button title="upload picture" onPress={handleImagePicker}/>
            {imageUri ? <Image source={{ uri: imageUri }} style={{ width: 100, height: 100 }} /> : null}
            <TextInput
                style={styles.input}
                placeholder="Enter a short bio"
                value={bio}
                onChangeText={setBio}
            />
             <Button
                title="Submit"
                onPress={submitHandler}
                color="#007AFF" // Adjust the color as needed
            />

        </View>



    );

}
export default ScheduleLocation;
const styles=StyleSheet.create({
    container:{
       flex: 1,
       padding:20,
       backgroundColor:'#f0f0f0'
    },
    label: {
        fontSize: 18,
        marginBottom: 8,
        fontWeight:'bold',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
    },
    submittedDataContainer: {
        marginTop: 20,
    },
    button: {
        marginTop: 10,
        color: '#007AFF', 
    },
    chosenDate: {
        fontSize: 16,
        marginBottom: 10,
        color: 'blue', // Adjust the color as needed
    },

})