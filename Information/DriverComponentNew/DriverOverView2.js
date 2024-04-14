
import React ,{useEffect}from 'react';
import {View,Text,Image, Pressable,StyleSheet}from'react-native'

import { FlatList } from 'react-native-gesture-handler';
import DriverList2 from './DriverList2';
import { CATEGORIES, Dummy_Drivers } from '../dummy-data';
import DList from './DList';
function DriverOverView2({ route, navigation }) {
  const { categoryId } = route.params;
  const filterDrivers = Dummy_Drivers.filter(driver =>
      driver.driverInfo && driver.driverInfo.availableDays.includes(categoryId)
  );

  useEffect(() => {
      navigation.setOptions({
          title: categoryId // Use the category ID as title
      });
  }, [categoryId, navigation]);

  return (
      <View style={styles.container}>
          <DList filterDrivers={filterDrivers} />
      </View>
  );
}

export default DriverOverView2;

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#D68B9B'
  }
});