import { useState } from 'react';
import {StyleSheet, Text, TextInput, View,ScrollView,Switch,TouchableOpacity,Alert,KeyboardAvoidingView, Platform, Modal}from'react-native';
import { Ionicons } from '@expo/vector-icons';
import ScheduleLocation from './ScheduleLocation';
import {Picker} from "@react-native-picker/picker"
import axios from 'axios'
import { fetchUserData, saveUserData, signUp } from '../back-end/Http';




function RegisterForm({ navigation,isLogin, onSubmit, credentialsInvalid={} }) {
    const [firstName, setFirstName] = useState(''); 
    const [lastName, setLastName] = useState(''); 
    const [enteredEmail, setEnteredEmail] = useState(''); 
    const [enteredConfirmEmail, setEnteredConfirmEmail] = useState(''); 
    const [enteredPassword, setEnteredPassword] = useState('');
    const [enteredConfirmPassword, setEnteredConfirmPassword] = useState(''); 
    const [isDriver,setIsDriver]=useState(false);
    const [licensePlate, setLicensePlate] = useState('');
    const [driverLicense, setDriverLicense] = useState('');
    const [carModel, setCarModel] = useState('');
    const [carType,setCarType] = useState('');
    const [passengerLimit,setPassengerLimit] = useState(0); 
    const [isPickerVisible, setIsPickerVisible] = useState(false);
    const handleCarTypeChange=(selectedCarType)=>{
      setCarType(selectedCarType);
      setPassengerLimit(selectedCarType ==='Sedan'? 2 : 3 );
      setIsPickerVisible(false);
    }
    const togglePicker = () => {
      setIsPickerVisible(!isPickerVisible);
  };
    const carTypes=[
      {
        label:'Sedan',value:'Sedan'},
        {label:'Van',value:'Van'}
    ];
    function rendercars(){
  return carTypes.map((type, index) => (
    <TouchableOpacity 
      key={index}
      style={style.carTypeOption}
      onPress={() => handleCarTypeChange(type.value)}
    >
      <Text style={{ color: '#333' }}>{type.label}</Text> {/* Ensure text color contrasts with background */}
    </TouchableOpacity>
  ));
}
    const {
      email: emailIsInvalid, 
      confirmEmail: emailsDontMatch,
      password: passwordIsInvalid, 
      confirmPassword: passwordsDontMatch, 
    } = credentialsInvalid
    function updateInputValueHnadler(inputType,enteredValue){
        switch(inputType){
            case'firstName':
            setFirstName(enteredValue);
            break;
            case'lastName':
            setLastName(enteredValue);
            break;
            case'email':
            setEnteredEmail(enteredValue);
            break;
            case'confirmEmail':
            setEnteredConfirmEmail(enteredValue);
            break;
            case'password':
            setEnteredPassword(enteredValue);
            break;
            case'passwordconfirmation':
            setEnteredConfirmPassword(enteredValue);
            break;

    }

}
function updateDriverInputValueHandler(inputType, enteredValue) {
    switch (inputType) {
      case 'licensePlate':
        setLicensePlate(enteredValue);
        break;
      case 'driverLicense':
        setDriverLicense(enteredValue);
        break;
      case 'carModel':
        setCarModel(enteredValue);
        break;
    }
  }
async function submitHnadler(){
    const isStudentEmail=enteredEmail.endsWith('@gmail.com');
    if (!isStudentEmail) {
        alert('You must use a student email to register.');
        return;
    }
    if (isDriver && (!licensePlate || !driverLicense || !carModel)) {
        alert('Please fill in all the fields related to driver information.');
        return;
    }
    
    
    if (enteredEmail !== enteredConfirmEmail || enteredPassword !== enteredConfirmPassword) {
      Alert.alert('Error', 'Emails or passwords do not match.');
      return;
  }
  try{
    const signUpResponse= await signUp(enteredEmail,enteredPassword);
    const userData = {
      firstName,
      lastName,
      email: enteredEmail,
      password:enteredPassword,
      isDriver,
      carType,
      carModel,
      passengerLimit,
      ...(isDriver && {
          driverInfo: {
              licensePlate,
              driverLicense,
              carModel,
              carType,
              passengerLimit
          }
      })
    }
    await saveUserData(signUpResponse.localId,userData);
    Alert.alert('Registration Successful', 'Please sign in with your new account.');
    navigation.navigate('Register');



  }catch(error){
    console.error('Registration failed:', error);
            Alert.alert('Registration Failed', 'Failed to register. Please try again.');

  }
 
}

  
  
   return (
    <KeyboardAvoidingView 
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    style={style.container}
    >
    <ScrollView style={style.container }>
    









       <Text style={style.Header}>Create Account</Text>

       

        <TextInput 
        
        autoCapitalize='none'
        placeholder="First Name"
        placeholderTextColor="#bcbcbc"  
        onChangeText={(text) => updateInputValueHnadler('firstName', text)}
        value={firstName}
        style={{
          ...style.inputContainer,
          backgroundColor: 'white', 
          color: 'black',
          
        }}
        
        
        />
         {/* <Text>LastName</Text>*/ }
         <TextInput
        autoCapitalize='none'
        placeholder="Last Name"
        placeholderTextColor="#bcbcbc"  
        onChangeText={(text) => updateInputValueHnadler('lastName',text)}
        value={lastName}
        style={{
          ...style.inputContainer,
          backgroundColor: 'white', 
          color: 'black',
        }}

        />
         <View style={style.switchContainer}>
        <Text>Are you a driver?</Text>
        <Switch
          value={isDriver}
          onValueChange={(newValue) => setIsDriver(newValue)}
        />
      </View>
      {isDriver && (
        <>
          <TextInput
            placeholder="License Plate"
            placeholderTextColor="#bcbcbc"  
            onChangeText={(text) => updateDriverInputValueHandler('licensePlate', text)}
            value={licensePlate}
            style={{
              ...style.inputContainer,
              backgroundColor: 'white', 
              color:'black'
            }}
          />
          <TextInput
            placeholder="Driver License"
            placeholderTextColor="#bcbcbc"  
            onChangeText={(text) =>updateDriverInputValueHandler('driverLicense', text)}
            value={driverLicense}
            style={{
              ...style.inputContainer,
              backgroundColor: 'white', 
              color:'black'
            }}
          />
          <TextInput
            placeholder="Car Model"
            placeholderTextColor="#bcbcbc"  
            onChangeText={(text) => updateDriverInputValueHandler('carModel', text)}
            value={carModel}
            style={{
              ...style.inputContainer,
              backgroundColor: 'white', 
              color:'black'
            }}
          />
          {isDriver && (
        <View>
            <TouchableOpacity onPress={togglePicker} style={{...style.inputContainer, backgroundColor: 'white'}}>
                 <Text style={{color: '#bcbcbc'}}>Select Your Car Type</Text>
            </TouchableOpacity>
            {isPickerVisible && (
              

                <Picker
                    selectedValue={carType}
                    onValueChange={(itemValue, itemIndex) => handleCarTypeChange(itemValue)}
                    style={{width:'100%',backgroundColor:'white'}}
                    >
                    <Picker.Item label="Select Car Type" value=""/>
                    {carTypes.map((type) => (
              <Picker.Item key={type.value} label={type.label} value={type.value} />
            ))}
                </Picker>
            
            )}
        </View>
    )}
        </>
      )}
      {isDriver && carType &&(
        <Text>Passenger Limit:{passengerLimit}</Text>
      )}
      {carType !== '' && (
    <View style={style.carTypeContainer}>
        <Text style={style.CarTypeText}>Selected Car Type: {carType}</Text>
    </View>
)}
  
        <View>

       <Text style={[style.label,emailIsInvalid && style.labelIsInvalid]}></Text>
       <TextInput 
       autoCapitalize='none'
       keyboardType='email-address'
       placeholder="Csun Email Address"  
       placeholderTextColor="#bcbcbc"  
       onChangeText={(text) => updateInputValueHnadler('email',text)}
       value={enteredEmail}
       style={[style.inputContainer, emailIsInvalid && style.inputIsInvalid, { backgroundColor: 'white',color:'black' }]}
       />

       </View>
       {!isLogin && (
        <View>
            <Text style={[style.label,emailsDontMatch && style.labelIsInvalid]}>
                

            </Text>
            <TextInput
            autoCapitalize='none'
            keyboardType='email-address'
            placeholder="Confirm Email Address"  
            placeholderTextColor="#bcbcbc"  
            onChangeText={(text) => updateInputValueHnadler('confirmEmail',text)}
            value={enteredConfirmEmail}
            style={[style.inputContainer, emailsDontMatch && style.inputIsInvalid, { backgroundColor: 'white',color:'black' }]}
            />
            </View>
            )}
            <View>
                <Text style={[style.label , passwordIsInvalid && style.labelIsInvalid]}>
                    
                </Text>
                <TextInput
                autoCapitalize='none'
                placeholder="Enter Password"  
                placeholderTextColor="#bcbcbc"  
                onChangeText={(text) => updateInputValueHnadler('password',text)}
                value={enteredPassword}
                style={[
                  style.inputContainer,
                  { backgroundColor: 'white',color:'black' }, 
                  passwordIsInvalid && style.labelIsInvalid
              ]}

                />
             </View>
             {!isLogin &&(
                <View> 
                    <Text style={[style.label ,passwordsDontMatch && style.labelIsInvalid]}>
                    

                   </Text>
                   <TextInput 
                   autoCapitalize='none'
                   placeholder="Confirm Password"  
                   placeholderTextColor="#bcbcbc"  
                   onChangeText={(text) => updateInputValueHnadler ('passwordconfirmation', text)}
                   value={enteredConfirmPassword}
                   style={[
                    style.inputContainer, 
                    passwordsDontMatch, 
                    style.inputIsInvalid,
                    { backgroundColor: 'white',color:'black' } 
                  ]}

                   
                   />
                </View>
             )}

            <View style={{ marginBottom: 20 }} />

             <View>
             <TouchableOpacity onPress={submitHnadler} style={{...style.button, backgroundColor: '#E50025'}}>
                <Text style={{ color: 'white' }}>Register</Text>
             </TouchableOpacity>
             <Text style={{ marginTop: 10, textAlign: 'center', color: '#666666' }}>
                By clicking the Register button, you agree to our <Text style={{ color: '#E50025' }}>Terms & Conditions</Text>.
              </Text>
          </View>
   
       
       <TextInput/>

       </ScrollView>
       </KeyboardAvoidingView>

    

    );

 
}

export default RegisterForm;
const style=StyleSheet.create({

    container:{
        flex:1,
        padding:20 ,
        backgroundColor:'lightgrey',
    },
     Header:{
        fontSize:26,
        marginBottom:10,
        //marginTop: 5, // Adjust this value 
        fontWeight:'bold',
        alignItems: 'center'



    },
    inputContainer:{
        borderWidth:1,
        borderColor:'#FFF',
        borderRadius:5,
        padding:10,
        marginBottom: 10,
        color:'#FFF',
        
    },
    SubHeader:{
        fontSize:16,
        marginBottom:20,
        color:'black',
    },
    inputIsInvalid:{

    },
    label:{
      color: 'black'

    },
    labelIsInvalid:{

    },
    submitHandle:{

    },
    button:{
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 8,

    },
    switchContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10,
    },
    carTypeOption:{
      padding:10,
      backgroundColor:'#f0f0f0',
      borderBottomWidth:1,
      borderBottomColor:'#ddd'
    },
    CarTypeText:{
      fontSize:16,
      color:'#333',
    },
    carTypeContainer: {
      backgroundColor: '#f7f7f7',
      padding: 10,
      marginVertical: 10,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: '#ddd',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 2,
      elevation: 2,
      alignItems: 'center',
    },




    uploadProfileContainer: {
      flex: 1,
      justifyContent: 'center', // Center vertically
      alignItems: 'center', // Center horizontally
  },

  circleIcon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleBackground: {
    backgroundColor: 'lightgrey', // You can set any color you want
    borderRadius: 55, // Half of the icon size for a perfect circle
    padding:10, // Adjust the padding as needed
  },


    })

