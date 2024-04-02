import React from 'react';
import {View,Text, Pressable, StyleSheet,Image, Platform} from 'react-native'
import{useNavigation}from'@react-navigation/native'
import { DriverInfo } from '../../Modeles/Driver';
function DriverList2({id,firstName, LastName, imageUrl, availableDays, carModel,
    driverInfo, licensePlate, driverLicense, CarCategory,
    passengerLimit, carImageUrl,bio}) {
    const navigation=useNavigation();
    function selectCarHanlder(){

        navigation.navigate('DriverDetails',{
            driverDetails:{
                id,
                firstName,
                LastName,
                imageUrl,
                availableDays,
                carModel,
                driverInfo, // Assuming you want to pass the entire driverInfo object
                licensePlate,
                driverLicense,
                CarCategory, // This might be an object, ensure it's serializable
                passengerLimit,
                carImageUrl,
                bio
              
            }
        })
    }
    
    return (
        <View style={styles.container}>
            <Pressable  onPress={selectCarHanlder}>
                <View>
                    <Image source={{uri:imageUrl}} style={styles.image} />
                    <Text style={styles.fulname}>{firstName} {LastName} </Text>
                    
                    <View style={styles.details}>
                    <Text style={styles.detailitem} >{carModel}</Text>
                    <Text style={styles.detailitem}>{availableDays}</Text>
                    </View>
                </View>

           
            </Pressable>

        </View>

    );
}
export default DriverList2
const styles=StyleSheet.create({
    container:{
        alignItems: 'center', // Center the children horizontally
       
        padding: 14, 
        margin:16,
       
        backgroundColor:"white",
        borderRadius:8,
        elevation:4,
        shadowColor:'black',
        shadowOpacity:0.25,
        shadowOffset:{width:0,height:2},
        shadowRadius:8,
        

    },

    image:{
        alignItems: 'center',
        width:200,
        height:200,
       borderRadius:10,
        margin:20,
        
        

    },
    fulname:{
        fontSize:18,
        textAlign: 'center',
        fontWeight: 'bold',
        margin:8,
    },

    details:{
        flexDirection:'row',
        alignItems: 'center',
        padding:8,
        justifyContent: 'center',


    },
    //for space between the small details
    detailitem:{
        marginHorizontal:19,
        fontSize:12,
        
    }

})