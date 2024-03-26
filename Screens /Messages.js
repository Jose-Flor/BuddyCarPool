import {FlatList, StyleSheet, Text, TouchableOpacity, View,Image} from "react-native"
import ChatScreen from "./ChatScreen";
const dummy=[
    {id:'1',
    userName:'Ali',
    userImage:require('../assets/user-4.jpg'),
    messageTime:'10 min ago',
    messageText:'can you please pick me up from my house '
    
    
    },
    {
        id:'2',
        userName:'johni boy',
        userImage:require('../assets/user-5.jpg'),
        messageTime:'2 min ago',
        messageText:'yes of course '
    }
   
]
function Messages({navigation }){
    return (
    <View style={styles.container}>
    <FlatList
    data={dummy}
    keyExtractor={item=>item.id}
    renderItem={({item})=>(
        <TouchableOpacity style={styles.card} onPress={()=>navigation.navigate('ChatScreen',{userName:item.userName})}
        >
            <View style={styles.userInfo} >
                <View style={styles.userImageWRAPPER}>
                    <Image style={styles.userImg} source={item.userImage}/>
                </View>
                <View style={styles.TextSection}>
                    <View style={styles.UserInfoText} >
            <Text style={styles.userName}>{item.userName} </Text>
            <Text style={styles.postTime}>{item.messageTime} </Text>

                    </View>
                    <Text style={styles.messageText}>{item.messageText}</Text>
                </View>

            </View>

        </TouchableOpacity>
    )}
    />

</View>
    );
}
export default Messages;
const styles=StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#ffffff'
        
    },
    card:{
    flexDirection: 'row',
    padding:10,
    borderBottomWidth: 1,
    borderColor: '#cccccc', // Assuming you want a border separator
   

    },
    TextSection:{

    },
    userInfo:{
        flexDirection:'row',
        justifyContent:'flex-start',
        flex:1,
    },
    userImg: {
        width: 50,
        height: 50,
        borderRadius: 25,
      },
      userImageWRAPPER:{
       paddingRight:10,

      },
      textSextion:{
        felx:1,
        justifyContent:'center',
      


        


      },
      UserInfoText:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
      },
      userName: {
        fontSize: 14,
        fontWeight: 'bold',
      },
      postTime: {
        fontSize: 12,
        color: '#666',
        padding:5,
        alignSelf:'flex-start'
      },
      messageText: {
        fontSize: 14,
        color: '#333333',
      },
})