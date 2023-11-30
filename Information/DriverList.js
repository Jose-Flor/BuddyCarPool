import {FlatList, Pressable, View,Text,StyleSheet,Platform,Alert} from'react-native';
import React,{useState,useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';





//using this function , make the entire function and use <GridTile/>
function GridTile({name,Schedule,licenseNumber,onPress}){
    //we need to add ripple effect 
    return(
        <View style={styles.gridItem}>
            
            <Pressable android_ripple={{color:'#ccc'}}  style={({pressed})=>[styles.Button, pressed? styles.buttonPressed:null]}
            onPress={onPress}
            >
                <View style={styles.innerContainer}>
                    <Text style={styles.Namesid}>{name}</Text>
                    <Text style={styles.details}>Scheduel:{Schedule}</Text>
                    <Text style={styles.details}>License:{licenseNumber}</Text>
                    <Text></Text>
                </View>
            </Pressable>
        </View>

    );
}



//the list of drivers shows here 
function Driverlist({navigation}){

    const [drivers,setDrivers]=useState([])
    useEffect(() =>{
        const loadDrivers=async()=>{
            try{
                const storedDrivers= await AsyncStorage.getItem('drivers');
                if(storedDrivers !==null){
                    const parseDrivers=JSON.parse(storedDrivers)
                    setDrivers(parseDrivers);
                }
            }catch(error){
                Alert.alert("Error","failed to load drivers");
            }
        };
        loadDrivers();
    },[]);
    const handlePress=(driver)=>{
        navigation.navigate('DriverOverView',{driverId:driver.id})
    }


    return(
     <FlatList 
     data={drivers} 
     keyExtractor={(item,index)=>`driver-${index}` } 
     renderItem={({item})=>(
       <GridTile
       name={`${item.firstName} ${item.lastName}`}
            Schedule={item.Schedule ? new Date(item.Schedule).toLocaleString() : 'Not scheduled'} // Format the schedule date
            licenseNumber={item.licenseNumber}
            onPress={() => handlePress(item)}
       />
     )}
     numColumns={2} 
     />
     );
}
export default Driverlist;
const styles = StyleSheet.create({
    gridItem:{
        flex:1,
        margin:16,
        height:150,
        borderRadius:8,
        elevation:4,
        backgroundColor:'white',
        shadowColor:'black',
        shadowOpacity:0.25,
        shadowOffset:{width:3, height:3},
        shadowRadius:9,
        overflow:Platform.OS === 'android'? 'hidden' : 'visible'

    },
    Button:{
        flex:1,

    },
    buttonPressed:{
        opacity:0.5

    },
    innerContainer:{
        flex:1,
        padding:16,
        justifyContent:'flex-end',
        alignItems: 'center',
        
    },
    Namesid:{
        fontWeight:'bold',
        fontSize:10

    },
    driverOverView:{
        flex:1,
        padding:16,
    },
    details: {
        fontSize: 12
    },
})
