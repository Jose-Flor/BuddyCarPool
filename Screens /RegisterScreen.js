
import React, { useState } from 'react';
import{View, Image, Text, ImageBackground, TouchableOpacity, Button, StyleSheet, TextInput}from"react-native"

function RegisterScreen({navigation}){
    const handleSignIn=()=>{
        navigation.navigate('main')
    }
    
    const handleRegister=()=>{
        navigation.navigate('RegisterForm')

    }
    return (
    <View style={styles.container} >
        <View style={styles.mainContainer} >
        <View style={styles.textStyle}>
        
        <View style={styles.imageContainer}>
        <Image
        source={require('../assets/logo.jpg')} 
        style={styles.image}
        />
        </View>

        <Text style={styles.subtitleText}>
            The best app to find your next carpool buddy!
        </Text>
        </View>
        </View>
        <View style={styles.inputContainer}>
            <TextInput style={styles.TextInput} placeholder="CSUN Email"/>

        </View>
        <View style={styles.inputContainer}>
            <TextInput  style={styles.TextInput} placeholder="Password" secureTextEntry={true}/>
        </View>
        
        
        <View style={styles.buttonscontainer}>
       <TouchableOpacity
        style={styles.customButton}
        onPress={handleSignIn}
        >
        <Text style={styles.buttonText} >Sign In</Text>
      </TouchableOpacity>
        </View>
        
        <TouchableOpacity
        style={styles.customButton}
        onPress={handleRegister}
        >
        <Text style={styles.buttonText} >Register</Text>
      </TouchableOpacity>
      <View style={styles.image2Container}>
     <Image
     source={require('../assets/CSUNlogo.jpg')} 
     style={styles.image2}
     />
     </View>
        </View>
     
   
    );
}

export default RegisterScreen;
const styles=StyleSheet.create({
    container:{
      backgroundColor:'white',
      flex:1,
      justifyContent: 'center',
      alignItems: 'center',
      padding:50
    
    },
    
    dummyText:{
        textDecorationStyle: 'none',
        color: 'red',
         },

        imageContainer: {
            width: 250,     
            height: 250, 
            paddingLeft: 50, 
         },

        image: {
            flex: 1,        
            width: undefined,
            height: undefined,
        },
    
        
    customButton: {
          backgroundColor: 'black', 
          padding: 10, 
          borderRadius: 5,
        },
        
    buttonText:{
        textDecorationStyle: 'none',
        color: 'white',
        fontSize: 15,
    },

    buttonscontainer: {
        marginTop: 50,
        padding: 10,
    },

    inputContainer:{
        alignItems: 'center',
        width:'100%',
        padding:5,
    
      
    },
    TextInput:{
     borderWidth:1,
     padding:10,
     marginVertical:10,
     width:'100%'
    },
    titleText:{
        fontStyle:'italic',
        fontSize:60,
        color: 'red',
        textAlign: 'center'
    },
    subtitleText:{
        color:'black',
        textAlign: 'center'
        


    },

    image2:{
        height: 85,
        width: 85,
        marginTop: 30,
    },

    
}
)    