
import {Text, View,StyleSheet} from "react-native"
import DriverInfo from "../Information/DriverInfo";

function Drivers(){
    const driverDetail=DriverInfo();
    return(
     <View style={styles.container}>
        <View style={styles.box}>

        <Text> Full Name:{driverDetail.fullName}</Text>
        <Text>phone Number:{driverDetail.contactInformation.phoneNumber}</Text>
       

        <Text></Text>
        </View>

        
    </View>
    );
}
export default Drivers;
const styles=StyleSheet.create({
    container:{
        flex:1,
        padding:10,
        alignItems:'center',
        justifyContent: 'center',
    },
    box:{
        width:'80%',
        padding:15,
        borderWidth:1,
        borderBlockColor:'black',
        borderRadius:5,
        backgroundColor:'black'

    },


})