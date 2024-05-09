import React, { useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View, TextInput, FlatList, Image } from 'react-native';
import { Icon } from 'react-native-elements';

const Messages = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [messageInput, setMessageInput] = useState('');
  const [filteredMessages, setFilteredMessages] = useState(dummy); 

  const handleSearch = query => {
    setSearchQuery(query);
    const filtered = dummy.filter(item =>
      item.userName.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredMessages(filtered);
  };

  const handleCreateMessage = () => {
    setIsModalVisible(true);
  };

  const handleSend = () => {
    // Send message logic
    console.log('Sending message:', userInput, messageInput);
    // Close the modal after sending message
    setIsModalVisible(false);
    // Reset input fields
    setUserInput('');
    setMessageInput('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        {/* Search icon */}
        <Icon name="search" type="font-awesome" color="#ccc" size={20} style={{ marginRight: 10 }} />

        <TextInput
          style={styles.searchInput}
          placeholder="Search by Name..."
          value={searchQuery}
          onChangeText={handleSearch}
        />

        {/* Plus button for creating a new message */}
        <TouchableOpacity onPress={handleCreateMessage} style={{ marginLeft: 10 }}>
          <Icon name="plus" type="font-awesome" color="#ccc" size={20} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredMessages}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('ChatScreen', { userName: item.userName })}
          >
            <View style={styles.userInfo}>
              <View style={styles.userImageWRAPPER}>
                <Image style={styles.userImg} source={item.userImage} />
              </View>
              <View style={styles.TextSection}>
                <View style={styles.UserInfoText}>
                  <Text style={styles.userName}>{item.userName} </Text>
                  <Text style={styles.postTime}>{item.messageTime} </Text>
                </View>
                <Text style={styles.messageText}>{item.messageText}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />

      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <TouchableOpacity activeOpacity={1} style={styles.modalContainer} onPressOut={() => setIsModalVisible(false)}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Enter User:</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Enter username..."
              value={userInput}
              onChangeText={text => setUserInput(text)}
            />
            <Text style={styles.modalTitle}>Message:</Text>
            <TextInput
              style={[styles.modalInput, { height: 100 }]}
              multiline={true}
              placeholder="Type your message..."
              value={messageInput}
              onChangeText={text => setMessageInput(text)}
            />
            <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
              <Text style={styles.sendButtonText}>Send</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default Messages;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  searchBar: {
    flexDirection: 'row', 
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    alignItems: 'center', 
    justifyContent: 'space-between', 
  },
  searchInput: {
    flex: 1, 
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  card: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  userInfo: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flex: 1,
  },
  userImg: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  userImageWRAPPER: {
    paddingRight: 10,
  },
  TextSection: {},
  UserInfoText: {
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
    padding: 5,
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 14,
    color: '#333333',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  sendButton: {
    backgroundColor: 'blue',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  sendButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

const dummy = [
  {
    id: '1',
    userName: 'Abby',
    userImage: require('../assets/user-4.jpg'),
    messageTime: 'Just now',
    messageText: 'Okay see you there!'
  },
  {
    id: '2',
    userName: 'Ali',
    userImage: require('../assets/user-5.jpg'),
    messageTime: '12 min ago',
    messageText: 'yes of course'
  },
  {
    id: '3',
    userName: 'Mariela',
    userImage: require('../assets/user-5.jpg'),
    messageTime: '5 days ago',
    messageText: 'Me: Nidhiben cant make it'
  },
  {
    id: '4',
    userName: 'Nidhiben',
    userImage: require('../assets/user-5.jpg'),
    messageTime: '5 days ago',
    messageText: 'I cant make it that day'
  },
  {
    id: '5',
    userName: 'Prof. Afshin',
    userImage: require('../assets/user-5.jpg'),
    messageTime: '10 days ago',
    messageText: 'Me: Please let me pass the class'
  }
];
