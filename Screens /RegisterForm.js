
import { useState } from 'react';
import {StyleSheet, Text, TextInput, View}from'react-native';



function RegisterForm({isLogin,onSubmit,credentialsInvalid}){
    const [firstName,setFistName]=useState('');
    const [lastName,setLastName]=useState('');
    const[enteredEmil,setEnteredEmil]=useState('');
    const[enteredConfirmEmail,setEnteredConfirmEmail]=useState('');
    const[enterPassword,setEnterPassword]=useState('');
    const[enteredConfirmPassword,setEntereConfirmPassword]=useState('');

    const {
        email:emailIsInavlid,
        confirmEmail:emailsDontMatch,
        password:passwordIsInavlid,
        confirmPassword:passwordDontMatch,
    }=credentialsInvalid;
    
   
  
    return (
    <View style={style.container}>
       <Text style={style.Header}>What is you name </Text>
       <View style={style.SubHeader}>
        <Text>Name</Text>
        <TextInput 
        style={[]}
        autoCapitalize='none'
        placeholder="Enter your name"
        
        
        />
        <View >

        </View>

       </View>

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
        borderColor:'#FFF'
    },
    SubHeader:{
        fontSize:16,
        marginBottom:20,
        color:'#FFF',
    }
        
    })
