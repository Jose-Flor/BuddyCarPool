
import {Pressable,View,StyleSheet} from 'react-native';
import{Ionicons}from'@expo/vector-icons'
function IconButton ({icon,size,color,onPress}){
    return (
    <Pressable onPress={onPress} style={({pressed})=>pressed && style.pressed}>
        <View style={style.container}>
            <Ionicons name={icon} size={size} color={color}/>

        </View>
    </Pressable>
    );

}
export default IconButton;
const style= StyleSheet.create({
    container:{
        borderRadius:24,
        padding:6,
        margin:8

    },
    pressed:{
        opacity:0.75
    }
})