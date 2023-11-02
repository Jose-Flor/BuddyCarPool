
import { useState } from 'react';
import {StyleSheet, Text, TextInput, View,ScrollView,Switch,TouchableOpacity,Alert}from'react-native';
import auth from '@react-native-firebase/auth'


function RegisterForm({ isLogin, onSubmit, credentialsInvalid={} }) {
    const [firstName, setFirstName] = useState(''); 
    const [lastName, setLastName] = useState(''); 
    const [enteredEmail, setEnteredEmail] = useState(''); 
    const [enteredConfirmEmail, setEnteredConfirmEmail] = useState(''); 
    const [enteredPassword, setEnteredPassword] = useState('');
    const [enteredConfirmPassword, setEnteredConfirmPassword] = useState(''); 
    const [isDriver,setIsDriver]=useState(`false`);
    const [licensePlate, setLicensePlate] = useState('');
    const [driverLicense, setDriverLicense] = useState('');
    const [carModel, setCarModel] = useState('');
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
function submitHnadler(){
    const isStudentEmail=enteredEmail.endsWith('@my.csun.edu');
    if (!isStudentEmail) {
        alert('You must use a student email to register.');
        return;
    }
    if (isDriver && (!licensePlate || !driverLicense || !carModel)) {
        alert('Please fill in all the fields related to driver information.');
        return;
    }
    
    const userData = {
        firstName,
        lastName,
        email: enteredEmail,
        password: enteredPassword,
        isDriver, // this assumes you have a way to set 'isDriver' in your state
    };
    if (isDriver) {
        userData.driverInfo = {
            licensePlate,
            driverLicense,
            carModel,
        };
    }
    onSubmit(userData)
}

   //
  
   return (
    <ScrollView style={style.container}>
       <Text style={style.Header}>What is you name </Text>
       <View style={style.SubHeader}> 
       </View>
        <Text>Name</Text>
        <TextInput 
        
        autoCapitalize='none'
        placeholder="Enter your name"
        onChangeText={(text) => updateInputValueHnadler('firstName', text)}
        value={firstName}
        style={style.inputContainer}
        
        
        />
        <Text>LastName</Text>
        <TextInput
        autoCapitalize='none'
        placeholder="Enter your Last name"
        onChangeText={(text) => updateInputValueHnadler('lastName',text)}
        value={lastName}
        style={style.inputContainer}

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
            onChangeText={(text) => updateDriverInputValueHandler('licensePlate', text)}
            value={licensePlate}
            style={style.inputContainer}
          />
          <TextInput
            placeholder="Driver License"
            onChangeText={(text) =>updateDriverInputValueHandler('driverLicense', text)}
            value={driverLicense}
            style={style.inputContainer}
          />
          <TextInput
            placeholder="Car Model"
            onChangeText={(text) => updateDriverInputValueHandler('carModel', text)}
            value={carModel}
            style={style.inputContainer}
          />
        </>
      )}
        <View>

       <Text style={[style.label,emailIsInvalid && style.labelIsInvalid]}>Email Address</Text>
       <TextInput 
       autoCapitalize='none'
       keyboardType='email-address'
       onChangeText={(text) => updateInputValueHnadler('email',text)}
       value={enteredEmail}
       style={[style.inputContainer, emailIsInvalid&&style.inputIsInvalid]}
       />
       </View>
       {!isLogin && (
        <View>
            <Text style={[style.label,emailsDontMatch && style.labelIsInvalid]}>
                confirm email address

            </Text>
            <TextInput
            autoCapitalize='none'
            keyboardType='email-address'
            onChangeText={(text) => updateInputValueHnadler('confirmEmail',text)}
            value={enteredConfirmEmail}
            style={[style.inputContainer,emailsDontMatch && style.inputIsInvalid]}
            />
            </View>
            )}
            <View>
                <Text style={[style.label , passwordIsInvalid && style.labelIsInvalid]}>
                    Password
                </Text>
                <TextInput
                autoCapitalize='none'
                onChangeText={(text) => updateInputValueHnadler('password',text)}
                value={enteredPassword}
                style={[style.inputContainer , passwordIsInvalid && style.labelIsInvalid]}
                />
             </View>
             {!isLogin &&(
                <View> 
                    <Text style={[style.label ,passwordsDontMatch && style.labelIsInvalid]}>
                        confirm Password

                   </Text>
                   <TextInput 
                   autoCapitalize='none'
                   onChangeText={(text) => updateInputValueHnadler ('passwordconfirmation', text)}
                   value={enteredConfirmPassword}
                   style={[style.inputContainer, passwordsDontMatch,style.inputIsInvalid]}
                   
                   />
                </View>
             )}
             <View>
             <TouchableOpacity onPress={submitHnadler} style={style.button}>
        <Text>Register</Text>
      </TouchableOpacity>
            
             </View>
             




        
    



       
       <TextInput/>

       </ScrollView>

    

    );

 
}
export default RegisterForm;
const style=StyleSheet.create({

    container:{
        flex:1,
        padding:20,
        backgroundColor:'#A9E5BB',
    },
    Header:{
        fontSize:30,
        
        marginBottom:10,
        fontWeight:'bold',



    },
    inputContainer:{
        borderWidth:1,
        borderColor:'#FFF',
        borderRadius:5,
        padding:10,
        marginBottom:15,
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

    },
    labelIsInvalid:{

    },
    submitHandle:{

    },
    button:{
        backgroundColor: '#387ef5',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,

    },
    switchContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10,
    }
    
        
    })
