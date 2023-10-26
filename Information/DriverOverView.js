
import{View,Text,StyleSheet}from 'react-native'
function DriverOverView(){
    return <View style={styles.driverOverView}>
        <Text>Driver over view screen</Text>
    </View>
};
export default DriverOverView;
const styles = StyleSheet.create({
    driverOverView:{
        flex: 1,
        padding: 15
    }
})