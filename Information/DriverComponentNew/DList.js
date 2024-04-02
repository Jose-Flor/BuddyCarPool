
import{View,Text,StyleSheet,FlatList}from 'react-native'
import DriverList2 from './DriverList2'
function DList({filterDrivers}){
    function rendering(itemData){
        const item=itemData.item
        const driverItemProps={
            id:item.id,
            firstName:item.firstName,
            LastName:item.LastName,
            imageUrl:item.imageUrl,
            availableDays:item.driverInfo.availableDays,
            carModel:item.driverInfo.carModel,
            driverInfo:item.driverInfo,
            licensePlate:item.driverInfo.licensePlate,
            driverLicense:item.driverInfo.driverLicense,
            CarCategory:item.driverInfo.CarCategory,
            passengerLimit:item.driverInfo.passengerLimit,
            carImageUrl:item.driverInfo.carImageUrl,
            bio:item.bio

        }
        return<DriverList2  {...driverItemProps}
          />
    }

    return( 
    <View style={styles.container}>
      
        <FlatList 
        data={filterDrivers}
        keyExtractor={item=>item.email}//asusume that email are importan , maybe car detail is important?? 
        renderItem={rendering}
    
        />

    </View>
    );
}
export default DList;
const styles = StyleSheet.create({
    container:{
      flex: 1,
      backgroundColor:'#D68B9B'
  
    }
})