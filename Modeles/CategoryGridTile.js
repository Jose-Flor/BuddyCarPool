
import {Pressable, View,Text,StyleSheet} from'react-native'
function CategoryGridTile({title,color,onPress}){
    return(
        <View style={styles.container} >
            <Pressable style={[styles.button,{backgroundColor:color}]}
            onPress={onPress}
            >
                <View>
                    <Text style={styles.buttonText}>{title}</Text>
                </View>
            </Pressable>
        </View>

    );
}
export default CategoryGridTile;
const styles=StyleSheet.create({
    container:{
        paddingTop:100,
        alignItems: 'center',
        

    },
    button:{
        border:3 ,
        marginBottom:30,
        width:100,
        //backgroundColor:'#2196F3',
        height:110,
        width:400,
        alignItems: 'center',
        
        elevation:3,
        shadowColor:'#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
    shadowRadius: 3.84,




    },
    buttonText:{
        textAlign: 'center',
        padding:20,
        color:"black",
        fontSize:'50',
        fontFamily:'Helvetica',
    }
    
})
