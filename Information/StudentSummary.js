
import { useState } from 'react';
import{Text,StyleSheet, View,Image, TouchableOpacity,FlatList, SafeAreaView}from 'react-native'
import {Ionicons}from'@expo/vector-icons'
import { FAB, Portal, Provider } from 'react-native-paper';



const PostData=[
  {
    id:'1',
    userName:'Ali',
    userImg:require('/Users/ali/Documents/CarpoolProject/BuddyCarPool/assets/TeslaTest.jpeg'),
    onlineTime:'4 hours ago',
    postText:'Ilove college',
    postImg:require('/Users/ali/Documents/CarpoolProject/BuddyCarPool/assets/TeslaTest2.jpeg'),
    like:false,

  }
]


function StundentSummary({navigation}){
  
  const [posts,setPosts]=useState(PostData)


  const toggleLiked = (postId) => {
    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        return { ...post, like: !post.like };
      }
      return post;
    });
    setPosts(updatedPosts);
  };

  const renderPost = ({ item }) => (
    
      <SafeAreaView>
    <View style={styles.card}>
      <View style={styles.userInfo}>
        <Image style={styles.userImage} source={item.userImg} />
        <View style={styles.userInfoText}>
          <Text style={styles.userName}>{item.userName}</Text>
          <Text style={styles.onlineTime}>{item.onlineTime}</Text>
          <Text style={styles.postText}>{item.postText}</Text>
        </View>
      </View>
      {item.postImg && (
        <Image style={styles.postImg} source={item.postImg} />
      )}
      <View style={styles.interactionWrapper}>
        <TouchableOpacity onPress={() => toggleLiked(item.id)} style={styles.interaction}>
          <Ionicons name={item.like ? 'heart' : 'heart-outline'} size={24} color={item.like ? '#2e64e5' : '#333'} />
          <Text style={styles.interactionText}>Like</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.interaction}>
          <Ionicons name='chatbubble-outline' size={24} color='#333' />
          <Text style={styles.interactionText}>Chat</Text>
        </TouchableOpacity>
      </View>
    </View>
    
    </SafeAreaView>
    
  );

  return(
    <Provider>
    <View>
      <FlatList
      data={posts}
      renderItem={renderPost}
      keyExtractor={item=>item.id}
      />

    </View>
    <Portal>
      <FAB 
      style={styles.fab}
      small
      icon='post'
      onPress={()=>navigation.navigate('AddPost')}
      />
    </Portal>
    </Provider>
   

  );
}
export default StundentSummary;
const styles =StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 20,
  },
  card: {
    backgroundColor: '#F8F8F8',
    marginBottom: 20,
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  userInfoText: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: 10,
  },
  userName: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  onlineTime: {
    fontSize: 12,
    color: '#666',
  },
  postText: {
    marginTop: 10,
  },
  postImg: {
    width: '100%',
    height: 250,
    marginTop: 15,
  },
  interactionWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 15,
  },
  interaction: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 5,
    padding: 2,
    backgroundColor: 'transparent',
  },
  interactionText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 5,
    marginLeft: 5,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  
   

    


})