
import{Text,StyleSheet, View,Image, TouchableOpacity,FlatList}from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';


const PostData=[
  {
    id:'1',
    userName:'Ali',
    userImg:require('/Users/ali/CARpoolNew490N/BuddyCarPool/assets/johnsample.jpg'),
    onlineTime:'4 hours ago',
    postText:'Ilove college',
    postImg:require('/Users/ali/CARpoolNew490N/BuddyCarPool/assets/media2.jpg'),
    like:false,
  },
  {
    id:'2',
    userName:'Jose',
    userImg:require('/Users/ali/CARpoolNew490N/BuddyCarPool/assets/user-4.jpg'),
    onlineTime:'3 min ago',
    postText:'I need a ride ',
    like:false,
  },
]
function StudentSummary(){
  
  const [posts, setPosts] = useState(PostData); 

  const toggleLiked = (postId) => {
    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        return {...post, like: !post.like}; // Corrected to 'like'
      }
      return post;
    });
    setPosts(updatedPosts);
  }
  const Rendering= ({ item }) => (
    <View style={styles.card}>
      <View style={styles.UserInfo}>
        <Image
          style={styles.userImage}
          source={item.userImg}
        />
        <View style={styles.UserInfoText}>
          <Text style={styles.UserName}>{item.userName}</Text>
          <Text style={styles.onlineTime}>{item.onlineTime}</Text>
          <Text style={styles.postText}>{item.postText}</Text>
        </View>
      </View>
      {item.postImg && (
        <Image
          style={styles.BigImage}
          source={item.postImg}
        />
      )}
      <View style={styles.interactionWraper}>
        <TouchableOpacity onPress={() => toggleLiked(item.id)} style={styles.interactionButton}>
          <Ionicons
            name={item.likes ? 'heart' : 'heart-outline'}
            size={24}
            color={item.likes ? '#2e64e5' : '#333'}
          />
          <Text style={styles.interactionText}>Like</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.interactionButton}>
          <Ionicons name='chatbubble-outline' size={24} color='#333' />
          <Text style={styles.interactionText}>Chat</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
    return (
      <View style={styles.container}>
      <FlatList
        data={posts}
        renderItem={({item})=><Rendering item={item} />}
        keyExtractor={item => item.id}
      />
    </View>
  );

      
   

    
}
export default StudentSummary;
const styles =StyleSheet.create({
    container:{
        flex:1,
       // justifyContent: 'center',
        
        backgroundColor:'#FFFF',
        padding:20,
        
    
    },
    card:{
     backgroundColor: '#FFFFFF',
    width: '100%',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    borderRadius: 10,
    padding: 15,
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
    interactionWraper:{
      flexDirection:"row",
      justifyContent:'center',
      borderRadius:5,
      padding:10,

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