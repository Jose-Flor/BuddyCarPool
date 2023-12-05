import {FlatList, Pressable, View,Text,StyleSheet,Platform,Alert,Image} from'react-native';
import React,{useState,useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';





//using this function , make the entire function and use <GridTile/>
function GridTile({name,Schedule,licensePlate,onPress,imageUri,selectedDays,carType,carModel}){
    const formattedDays = Array.isArray(selectedDays) ? selectedDays.join(', ') : 'No days selected';
   

    //we need to add ripple effect 
    return(
        <View style={styles.gridItem}>
            
            <Pressable android_ripple={{color:'#ccc'}}  style={({pressed})=>[styles.Button, pressed? styles.buttonPressed:null]}
            onPress={onPress}
            >
                <View style={styles.innerContainer}>
                    {imageUri && <Image source={{uri:imageUri}}style={styles.image}/>}
                    <Text style={styles.Namesid}>{name}</Text>
                    <Text style={styles.details}>Schedule: {Schedule}</Text>
          <Text style={styles.details}>License: {licensePlate}</Text>
          <Text style={styles.details}>Car Type: {carType}</Text>
          <Text style={styles.details}>Car Model: {carModel}</Text>
          <Text style={styles.details}>Days: {formattedDays}</Text>


                    <Text></Text>
                </View>
            </Pressable>
        </View>

    );
}



//the list of drivers shows here 
function Driverlist({navigation,filteredDrivers}){

    const [drivers, setDrivers] = useState([]);

    useEffect(() => {
        const loadDrivers = async () => {
            try {
                const storedDrivers = await AsyncStorage.getItem('drivers');
                if (storedDrivers !== null) {
                    const parsedDrivers = JSON.parse(storedDrivers);
                    setDrivers(parsedDrivers); // Corrected from setDriver to setDrivers
                }
            } catch (error) {
                Alert.alert("Error", "Failed to load drivers");
            }
        };
        if (!filteredDrivers || filteredDrivers.length === 0) {
            loadDrivers();
        }
    }, [filteredDrivers]);


    const handlePress = (driver) => {
        navigation.navigate('DriverOverView', { driver: driver });
    }


    const dataToShow = filteredDrivers && filteredDrivers.length > 0 ? filteredDrivers : drivers;
    const keyExtractor = (item, index) => {
        // Use item's id if available, otherwise fallback to using index
        return item.id ? item.id.toString() : `driver-${index}`;
    };

    return(
     <FlatList 
     data={dataToShow} 
     keyExtractor={keyExtractor}
     renderItem={({item})=>(
       <GridTile
       name={`${item.firstName} ${item.lastName}`}
            Schedule={item.Schedule ? new Date(item.Schedule).toLocaleString() : 'Not scheduled'} // Format the schedule date
            licensePlate={item.licensePlate}
            imageUri={item.imageUri}
            selectedDays={item.selectedDays}
            carType={item.driverInfo?.carType} // Pass carType
  carModel={item.driverInfo?.carModel}

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
        height:200,
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
        justifyContent:'center',
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
    image: {
        width: '100%',
        height: 100, // Adjust the height as needed
        borderRadius: 8,
    },
})
