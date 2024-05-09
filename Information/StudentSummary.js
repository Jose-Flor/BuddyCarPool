import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, SafeAreaView, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FAB, Portal, Provider, Menu, Divider } from 'react-native-paper';

function StudentSummary({ navigation, route }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const { newPost } = route.params || {};
    if (newPost) {
      setPosts(prevPosts => [{ ...newPost, id: String(prevPosts.length + 1) }, ...prevPosts]);
    }
  }, [route.params]);

  const toggleLiked = (postId) => {
    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        return { ...post, like: !post.like };
      }
      return post;
    });
    setPosts(updatedPosts);
  };

  const [menuVisible, setMenuVisible] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [menuAnchor, setMenuAnchor] = useState({ x: 0, y: 0 });
  const [shareSubMenuVisible, setShareSubMenuVisible] = useState(false);

  const openMenu = (postId, x, y) => {
    if (selectedPostId === postId && menuVisible) {
      setMenuVisible(false);
      setSelectedPostId(null);
    } else {
      setMenuVisible(true);
      setSelectedPostId(postId);
      setMenuAnchor({ x, y });
    }
  };

  const openShareSubMenu = () => {
    setShareSubMenuVisible(true);
  };

  const closeShareSubMenu = () => {
    setShareSubMenuVisible(false);
  };

  const closeMenu = () => {
    setMenuVisible(false);
    setShareSubMenuVisible(false);
  };

  const shareViaWhatsApp = async () => {
    const url = 'https://example.com/post'; // Replace with the actual post URL
    const message = 'Check out this cool post: ' + url;
    const whatsappUrl = `whatsapp://send?text=${encodeURIComponent(message)}`;
    try {
      await Linking.openURL(whatsappUrl);
    } catch (error) {
      console.error('Error opening WhatsApp:', error);
    }
  };

  const shareViaMessage = () => {
    const message = 'Check out this cool post: https://example.com/post'; // Replace with the actual post URL
    Linking.openURL(`sms:?body=${encodeURIComponent(message)}`);
  };

  const shareViaEmail = () => {
    const subject = 'Check out this cool post';
    const body = 'Hey! I found this amazing post: https://example.com/post'; // Replace with the actual post URL
    Linking.openURL(`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
  };

  const renderPost = ({ item, index }) => (
      <SafeAreaView>
        <View style={styles.card}>
          {/* User Profile Icon */}
          <View style={styles.userInfo}>
            {/* Placeholder Icon */}
            <Ionicons name="person-circle-outline" size={50} color="#666" style={styles.userImage} />
            <View style={styles.userInfoText}>
              <Text style={styles.userName}>{item.userName}</Text>
              <Text style={styles.onlineTime}>{item.onlineTime}</Text>
              <Text style={styles.postText}>{item.postText}</Text>
            </View>
          </View>
          {/* Post Image */}
          {item.postImg && (
              <Image style={styles.postImg} source={{ uri: item.postImg }} />
          )}
          {/* Interaction Icons */}
          <View style={styles.interactionWrapper}>
            {/* Like */}
            <TouchableOpacity onPress={() => toggleLiked(item.id)} style={styles.interaction}>
              <Ionicons name={item.like ? 'heart' : 'heart-outline'} size={24} color={item.like ? '#2e64e5' : '#333'} />
              <Text style={styles.interactionText}>Like</Text>
            </TouchableOpacity>
            {/* Chat */}
            <TouchableOpacity style={styles.interaction}>
              <Ionicons name='chatbubble-outline' size={24} color='#333' />
              <Text style={styles.interactionText}>Chat</Text>
            </TouchableOpacity>
            {/* Options (Three dots icon) */}
            <TouchableOpacity onPress={(e) => openMenu(item.id, e.nativeEvent.pageX, e.nativeEvent.pageY)} style={styles.optionsIcon}>
              <Ionicons name='ellipsis-horizontal' size={24} color='#333' />
            </TouchableOpacity>
          </View>
        </View>
        {/* Options Menu */}
        <Menu
            visible={menuVisible && selectedPostId === item.id}
            onDismiss={closeMenu}
            anchor={{ x: menuAnchor.x, y: menuAnchor.y }}
            style={styles.menu}
        >
          <View style={styles.menuContainer}>
            <TouchableOpacity style={styles.menuItem} onPress={openShareSubMenu}>
              <Text style={styles.menuItemText}>Share</Text>
            </TouchableOpacity>
            <Divider style={styles.divider} />
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuItemText}>Save</Text>
            </TouchableOpacity>
            <Divider style={styles.divider} />
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuItemText}>Report Post</Text>
            </TouchableOpacity>
            {/* Share Submenu */}
            <Menu
                visible={shareSubMenuVisible && selectedPostId === item.id && menuAnchor.x > 0 && menuAnchor.y > 0}
                onDismiss={closeShareSubMenu}
                anchor={{ x: menuAnchor.x, y: menuAnchor.y + 10 }}
                style={styles.subMenu}
            >
              <TouchableOpacity style={styles.subMenuItem} onPress={shareViaEmail}>
                <Ionicons name="mail-outline" size={24} color="white" />
                <Text style={styles.subMenuItemText}>Share via Email</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.subMenuItem} onPress={shareViaMessage}>
                <Ionicons name="chatbubble-outline" size={24} color="white" />
                <Text style={styles.subMenuItemText}>Share via Message</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.subMenuItem} onPress={shareViaWhatsApp}>
                <Ionicons name="logo-whatsapp" size={24} color="white" />
                <Text style={styles.subMenuItemText}>Share via WhatsApp</Text>
              </TouchableOpacity>
            </Menu>
          </View>
        </Menu>
      </SafeAreaView>
  );

  return (
      <Provider>
        <View style={styles.container}>
          <FlatList
              data={posts}
              renderItem={renderPost}
              keyExtractor={(item, index) => index.toString()}
          />
        </View>
        <Portal>
          <FAB
              style={styles.fab}
              small
              icon='post'
              onPress={() => navigation.navigate('AddPost')}
          />
        </Portal>
      </Provider>
  );
}

export default StudentSummary;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    padding: 20,
  },
  card: {
    backgroundColor: '#FFF',
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
  optionsIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 10,
  },
  menu: {
    marginLeft: 10,
    position: 'absolute',
  },
  menuContainer: {
    backgroundColor: 'grey', // Light gray background color with transparency
    borderRadius: 10,
    padding: 5,
    elevation: 4,
  },
  menuItem: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  menuItemText: {
    fontSize: 16,
  },
  divider: {
    marginVertical: 5,
  },
  subMenu: {
    marginTop: 10,
    position: 'absolute',
    backgroundColor: 'grey', // Light gray background color with transparency
  },
  subMenuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  subMenuItemText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#000', // Black text color
  },
});