import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, Button, TextInput, TouchableOpacity, Modal, Text, Image } from 'react-native';
import { Bubble, GiftedChat } from 'react-native-gifted-chat';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker'; 
import CallingScreen from './CallingScreen';
import { useNavigation } from '@react-navigation/native';

function ChatScreen() {
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState('');
  const [lastMessageSent, setLastMessageSent] = useState('');
  const [calling, setCalling] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigation = useNavigation();
  useEffect(() => {
    setMessages([
      {
        _id: 3,
        text: 'Do you still need to carpool for Thursdays class?',
        createdAt: new Date(),
        user: {
          _id: 2,
        },
      },
    ]);
  }, []);

  const onSend = useCallback((newMessages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages));
    setLastMessageSent(newMessages[0].text);
  }, []);

  const handleSendMessage = () => {
    let newMessage;
    if (lastMessageSent === 'Do you still need to carpool for Thursdays class?') {
      newMessage = {
        _id: Math.random().toString(36).substring(7),
        text: 'Yes of course! I will meet you at our spot!',
        createdAt: new Date(),
        user: {
          _id: 1,
        },
      };
    } else if (lastMessageSent === 'Yes of course! I will meet you at our spot!') {
      newMessage = {
        _id: Math.random().toString(36).substring(7),
        text: 'Okay see you there!',
        createdAt: new Date(),
        user: {
          _id: 1,
        },
      };
    } else {
      newMessage = {
        _id: Math.random().toString(36).substring(7),
        text: messageText,
        createdAt: new Date(),
        user: {
          _id: 1,
        },
      };
    }
    onSend([newMessage]);
  };

 

  const renderInputToolbar = props => {
    return (
      <View style={styles.inputToolbar}>
        <TouchableOpacity onPress={() => setIsModalVisible(true)}>
          <Ionicons name="add" size={30} color="black" style={styles.icon} />
        </TouchableOpacity>
        <TextInput
          style={styles.textInput}
          placeholder="Type a message..."
          value={messageText}
          onChangeText={setMessageText}
        />
        <Button title="Send" onPress={handleSendMessage} />
      </View>
    );
  };

  const handleSendPhoto = async () => {
    // Open device's photo gallery
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      // Logic for sending selected image
      console.log(result.uri);
    }
  };

  const renderBubble = props => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#2e64e5',
          },
        }}
        textStyle={{
          right: {
            color: '#fff',
          },
        }}
      />
    );
  };

  const handleStartCall = () => {
    setCalling(true);
  };

  return (
    <View style={styles.container}>
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: 1,
        }}
        renderBubble={renderBubble}
        renderInputToolbar={renderInputToolbar}
      />
      {calling && <CallingScreen />}
      <TouchableOpacity onPress={handleStartCall} style={styles.callButton}>
        <Ionicons name="call" size={24} color="black" />
      </TouchableOpacity>

      {/* Modal for additional buttons */}
      <Modal visible={isModalVisible} animationType="slide" transparent={true}>
        <TouchableOpacity
          onPress={() => setIsModalVisible(false)}
          style={styles.modalBackground}
        />
        <View style={styles.modalContent}>
          <TouchableOpacity onPress={handleSendPhoto} style={styles.modalButton}>
            <Ionicons name="image" size={30} color="black" style={styles.modalIcon} />
            <Text style={styles.modalButtonText}>Send Image</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}} style={styles.modalButton}>
            <Ionicons name="logo-usd" size={30} color="black" style={styles.modalIcon} />
            <Text style={styles.modalButtonText}>Apple Pay</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputToolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
  textInput: {
    flex: 1,
    height: 40,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    borderRadius: 20,
    marginHorizontal: 8,
  },
  icon: {
    marginHorizontal: 8,
  },
  callButton: {
    position: 'absolute',
    bottom: 560,
    right: 20,
    backgroundColor: 'white',
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'transparent', 
    padding: 20,
    borderRadius: 10,
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: '50%', 
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  modalButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  modalIcon: {
    marginRight: 10,
  },
  modalButtonText: {
    fontSize: 20, 
    textAlign: 'center',
    color: 'black', 
    textDecorationLine: 'none', 
  },
});

export default ChatScreen;
