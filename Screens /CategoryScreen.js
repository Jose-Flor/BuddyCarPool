
import {FlatList, StyleSheet,View}from'react-native'
import { CATEGORIES } from '../Information/dummy-data'
import CategoryGridTile from '../Modeles/CategoryGridTile'
import{GestureHandlerRootView} from 'react-native-gesture-handler'



function CategoryScreen({navigation}){
 function renderItem({item}){
    function pressHandler(){
        navigation.navigate('DriverOverView2',{
            //this is for getting different id 
            categoryId:item.id,
        });

    }
    return(
    <CategoryGridTile 
    title={item.title} 
    color={item.color} 
    onPress={pressHandler}/>
    );
   }




    return ( 
    <View style={styles.container}>

    <GestureHandlerRootView>

    <FlatList data={CATEGORIES}
     keyExtractor={(item)=>item.id} 
     renderItem={renderItem}
     
     />
     </GestureHandlerRootView>
     </View>
     );

}
export default CategoryScreen
const styles=StyleSheet.create({
    container:{
        backgroundColor:'#D68B9B'
    }
})