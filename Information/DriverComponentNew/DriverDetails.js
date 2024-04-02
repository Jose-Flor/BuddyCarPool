
import { useContext, useLayoutEffect } from 'react';
import {View,Text,Image, StyleSheet, Button} from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import IconButton from '../../Screens /General style/IconButton';
import { CATEGORIES } from '../dummy-data';
import { FavoritesContext } from '../Store/favorite-context';

function DriverDetails({route,navigation}){
    const { driverDetails } = route.params;
    const { ids, addFavorite, removeFavorite } = useContext(FavoritesContext);
    const isFavorite = ids.includes(driverDetails.id); // Determine if the driver is a favorite


    function PressHnadlerHeaderButon (){
        if (isFavorite) {
            removeFavorite(driverDetails.id);
           
        } else {
            addFavorite(driverDetails.id);
            

        }
    }

    useLayoutEffect(()=>{
        navigation.setOptions({
            headerRight:()=>{
                return(
                <IconButton 
                icon={isFavorite?'star':'star-outline' }
                size='24' color='blue' onPress={PressHnadlerHeaderButon} />
                );
            }

        });

    },[navigation,isFavorite])

    

    return(
        <View style={styles.continer}>
            <Image style={styles.image} source={{uri:driverDetails.carImageUrl}} />
            <View>
                <Text style={styles.nameTile}>{driverDetails.firstName}{driverDetails.LastName}</Text>
            </View>
            <View>
            <Text> {driverDetails.zipcode}</Text>
            <View style={styles.subtielContainer}>

                <Text style={styles.subtile}>info </Text>
            </View >
            <View >
                <View style={styles.listItem}>

                <Text style={styles.textItem}>Avialable Days</Text>

                <Text style={styles.textItem}>{driverDetails.availableDays}</Text>
                </View>
                <View style={styles.listItem}>

                <Text style={styles.textItem}>LicensePlate</Text>
                <Text style={styles.textItem}>{driverDetails.licensePlate}</Text>
                </View>
                <View style={styles.listItem}>

                <Text style={styles.textItem}>passengerLimit:{driverDetails.passengerLimit}</Text>
                </View>
            </View>
            </View>
            <View style={styles.subtielContainer}>
                <Text style={styles.subtile}>bio</Text>
            </View>
            <View style={styles.listItem}>
                <Text style={styles.textItem}>{driverDetails.bio}</Text>
                
            </View>
        </View>
        

    );
}
export default DriverDetails
const styles=StyleSheet.create({
    continer:{
        backgroundColor:'#4C4C47',
        flex:1

    },
    image:{
        width: 'auto',
        height: 190,


    },
    nameTile:{
        fontWeight: 'bold',
        fontSize:24,
        margin:8,
        textAlign: 'center',
        color:'white'

    },
    subtile:{
        fontSize:18,
        
        fontWeight:"bold",
        color:'white',
        textAlign: 'center',
        
        borderBottomColor: 'white',
        borderBottomWidth:2



    },
    subtielContainer:{
        borderBottomColor: 'white',
        borderBottomWidth:2,
        padding:6,
        margin:6,
        marginHorizontal:24


    },
    listItem:{
        borderRadius:6,
        paddingHorizontal:8,
        paddingVertical:4,
        marginVertical:8,
        marginHorizontal:12,
        backgroundColor:"#E5DCC5"


    },
    textItem:{
        color:' #001427',
        textAlign:'center'


    }
    

})