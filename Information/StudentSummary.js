
import{Text,StyleSheet, View,Image, TouchableOpacity}from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';



function StudentSummary(){
  const [isLiked,setIsLiked]=useState(false);
  const toggleLiked=()=>{
    setIsLiked(!isLiked);
  }
  
    return (
        <View style={styles.container}>
          <View style={styles.card}>
            <View style={styles.UserInfo}>
              <Image
               style={styles.userImage}
               source={require('../assets/johnsample.jpg')}
               />
               <View style={styles.UserInfoText}>
                <Text style={styles.UserName}>
                  Ali
                </Text>
                <Text style={styles.onlineTime}>
                  4 hours

                </Text>

                  <View style={styles.postText}>
                    <Text>
                      welcome to college 
                    </Text>
                    <Image style={styles.BigImage}
                     source={require('../assets/media2.jpg')}/>
                    

                     <View style={{flexDirection:'row',marginTop:5}}>

                     <TouchableOpacity onPress={toggleLiked} style={styles.Iteracting}>
                      <Ionicons name={isLiked?'heart':'heart-outline'} size={20} color={isLiked?'#2e64e5 ':'#333'} />
                      <Text style={{marginLeft:5}}>like</Text>
                     </TouchableOpacity>
                     <TouchableOpacity style={[styles.Iteracting,{marginLeft:100}]}>
                      <Ionicons name='chatbubble-outline' size={20} 
                      color='#333'/>
                      <Text style={{marginLeft:5}}>chat</Text>
                     </TouchableOpacity>
                     </View>
                     

                  </View>
               </View>

            </View>
            
            <View style={styles.UserInfo}>
              <Image
               style={styles.userImage}
               source={require('../assets/johnsample.jpg')}
               />
               <View style={styles.UserInfoText}>
                <Text style={styles.UserName}>
                  jose
                </Text>
                <Text style={styles.onlineTime}>
                  4 hours

                </Text>

                  <View style={styles.postText}>
                    <Text>
                      I pay 5 dollars if someone pick me up form my home 
                    </Text>
                    
                    <View style={styles.divider}/>

                     <View style={{flexDirection:'row',marginTop:5}}>

                     
                     <TouchableOpacity onPress={toggleLiked} style={styles.Iteracting}>
                      <Ionicons name={isLiked?'heart':'heart-outline'} size={20} color={isLiked?'#2e64e5 ':'#333'} />
                     </TouchableOpacity>
                     <TouchableOpacity style={[styles.Iteracting,{marginLeft:100}]}>
                      <Ionicons name='chatbubble-outline' size={20} color="#333" />
                      <Text style={{marginLeft:5}}>chat</Text>
                     </TouchableOpacity>
                     </View>
                     

                  </View>
               </View>

            </View>

          </View>

        </View>
      
    );
}
export default StudentSummary;
const styles =StyleSheet.create({
    container:{
        flex:1,
       // justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'#FFFF',
        padding:20,
        
    
    },
    card:{
        backgroundColor:'#f8f8f8',
        width:'100%',
        marginBottom: 10,
        borderRadius:10,
        padding:15
    },
    UserInfo:{
        flexDirection:'row',
        
        padding:15,
        alignItems:'flex-start',
    },
    userImage:{
        width: 50,
        height:50,
        borderRadius:25



    },
    UserName:{
        fontSize:14,
        fontWeight:'bold',
        marginEnd:100,
        marginBottom:1
        
    },
    onlineTime:{
        fontSize:12,
        color:'#666'
    },
    UserInfoText:{
        flexDirection:'column',
        justifyContent: 'center',
        marginLeft:10,
       

    },
    postText:{

        
        marginTop:10
        
    },
    BigImage:{
     width:230,
     height:220,
     marginTop:10,
    },
    Iteracting:{
      flexDirection:'row',
      justifyContent: 'center',
      borderRadius:10,
      padding:2 
      
      
     
    }, 
    divider:{
      border:3 ,
      borderBottomColor:'#333',
      borderBottomWidth:1,
      width:250,
      marginTop:15,
      alignSelf: 'center',


    }
   

    


})