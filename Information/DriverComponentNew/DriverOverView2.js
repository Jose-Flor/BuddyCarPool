
import React ,{useEffect}from 'react';
import {View,Text,Image, Pressable,StyleSheet}from'react-native'
import { FlatList } from 'react-native-gesture-handler';
import DriverList2 from './DriverList2';
import { CATEGORIES, Dummy_Drivers } from '../dummy-data';
import DList from './DList';
function DriverOverView2({route,navigation}){
    const catId= route.params.categoryId ;
    const filterDrivers=Dummy_Drivers.filter(driver=>driver.driverInfo && driver.driverInfo.CarCategory.id === catId)

    useEffect(() => {
        const category = CATEGORIES.find(category => category.id === catId);
        if (category) {
          navigation.setOptions({
            title: category.title
          });
        }
      }, [catId, navigation]);
      
   
   
    return <DList filterDrivers={filterDrivers}/>

}
export default DriverOverView2;
const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor:'#D68B9B'

  }
})