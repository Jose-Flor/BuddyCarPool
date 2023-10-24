
import { useState } from 'react';
import {StyleSheet, Text, TextInput, View}from'react-native';



function RegisterForm({ isLogin, onSubmit, credentialsInvalid={} }) {
    const [firstName, setFirstName] = useState(''); 
    const [lastName, setLastName] = useState(''); 
    const [enteredEmail, setEnteredEmail] = useState(''); 
    const [enteredConfirmEmail, setEnteredConfirmEmail] = useState(''); 
    const [enteredPassword, setEnteredPassword] = useState('');
    const [enteredConfirmPassword, setEnteredConfirmPassword] = useState(''); 
  
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
function submitHnadler(){
    onSubmit({
        firstName,
        lastName,
        email:enteredEmail,
        confirmEmail:enteredConfirmEmail,
        password:enteredPassword,
        confirmPassword:enteredConfirmPassword,
    })
}

   //
  
    return (
    <View style={style.container}>
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
        onChangeText={(text) => updateInputValueHnadler('LastName',text)}
        value={lastName}
        style={style.inputContainer}

        />
        <View>

       <Text style={[style.label,emailIsInvalid && style.labelIsInvalid]}>Email Address</Text>
       <TextInput 
       autoCapitalize='none'
       keyboardType='email-address'
       onChangeText={(text) => updateInputValueHnadler('Email',text)}
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
                   onChangeText={(text) => updateInputValueHnadler ('confirmPasswords', text)}
                   value={enteredConfirmPassword}
                   style={[style.inputContainer, passwordsDontMatch,style.inputIsInvalid]}
                   
                   />
                </View>
             )}
             <View>
            
             </View>
             




        
    



       
       <TextInput/>

       </View>

    

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

    }
    
        
    })
