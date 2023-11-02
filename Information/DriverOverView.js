
import{View,Text,StyleSheet}from 'react-native'
function DriverOverView(){
    return <View style={styles.DriverOverView}>
        <Text style={styles.DriverOverViewtext}
        >Driver over view screennn</Text>
    </View>
};
export default DriverOverView;
const styles = StyleSheet.create({
    DriverOverView:{
        flex: 1,
        padding: 15,
        textAlign: 'center',
        text: 'center',
        fontSize: 2000,
        
    },

    DriverOverViewtext: {
        color: 'red', 
    }
})