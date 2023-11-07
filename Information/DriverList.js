import {FlatList, Pressable, View,Text,StyleSheet,Platform} from'react-native';


class Drivers{
    constructor(id,name,licenseNumber,isAvilable,pictureUrl,schedule){
        this.id = id;
        this.name = name;
        this.licenseNumber = licenseNumber;
        this.isAvilable = isAvilable;
        this.pictureUrl = pictureUrl;
        this.schedule = schedule;
    }
}
const Category=[
    new Drivers('1','Ali  ',' 22 ',true,'johnsample.jpg',' Available:Monday'),
    new Drivers('2','John ','  ',true,'ali.jpg',' Available:Tuesday'),
    new Drivers('3','John ','  ',true,'ali.jpg',' Available:Monday'),
    new Drivers('4','Doe ','  ',true,'ali.jpg',' Available:Thursday'),
    new Drivers('5','John ','  ',true,'ali.jpg',' Available:Friday'),
    new Drivers('6','Doe ',' ',true,'ali.jpg',' Available:Monday'),
];


//using this function , make the entire function and use <GridTile/>
function GridTile({name,schedule,licenseNumber,onPress}){
    //we need to add ripple effect 
    return(
        <View style={styles.gridItem}>
            
            <Pressable android_ripple={{color:'#ccc'}}  style={({pressed})=>[styles.Button, pressed? styles.buttonPressed:null]}
            onPress={onPress}
            >
                <View style={styles.innerContainer}>
                    <Text style={styles.Namesid}>{name}{schedule}{licenseNumber}</Text>
                </View>
            </Pressable>
        </View>

    );
}



//the list of drivers shows here 
function Driverlist({navigation}){
    function rendercategoryItem(itemData){
        function HnadlerPress(){
            navigation.navigate('DriverOverView');
            }
            return(
                <GridTile 
                name={itemData.item.name}
                schedule={itemData.item.schedule}
                licenseNumber={itemData.item.licenseNumber}
                onPress={HnadlerPress}
                
                />

            );
    }


    return <FlatList 
     data={Category} 
     keyExtractor={(item)=>item.id } 
     renderItem={rendercategoryItem}
     numColumns={2} />;
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
    }
})
