import React, { useState, useEffect, useCallback, useLayoutEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Linking} from 'react-native';
import { Bubble, GiftedChat } from 'react-native-gifted-chat';
import { Ionicons } from '@expo/vector-icons'; 
import * as ImagePicker from 'expo-image-picker';

function ChatScreen({ navigation }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 1,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
      {
        _id: 2,
        text: 'hello wordl',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );
  }, []);

  const renderBubble = (props) => {
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

  const handleCall = () => {
    // Specify the phone number you want to call
    const phoneNumber = '818';
    
    // Construct the phone call URI
    const phoneCallUri = `tel:${phoneNumber}`;

    // Open the phone app with the specified phone number
    Linking.openURL(phoneCallUri);
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity style={styles.headerRight} onPress={handleCall}>
          <Ionicons name="call" size={24} color="blue" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const renderActions = (props) => (
    <View style={styles.actionsContainer}>
      <Ionicons
        name="image"
        size={24}
        color="black"
        style={styles.imagePickerIcon}
        onPress={openImagePicker}
      />
    </View>
  );

  const renderSend = (props) => (
    <View style={styles.actionsContainer}>
      <Ionicons
        name="send"
        size={24}
        color="blue" // Change the color to blue
        style={styles.sendIcon}
        onPress={() => {
          props.onSend({ text: props.text.trim() }, true);
        }}
      />
    </View>
  );

  const openImagePicker = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      const image = {
        _id: Math.random(),
        image: result.uri,
        createdAt: new Date(),
        user: {
          _id: 1,
        },
      };

      onSend([image]);
    }
  };

  return (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: 1,
      }}
      renderBubble={renderBubble}
      renderActions={renderActions}
      renderSend={renderSend}
    />
  );
}

ChatScreen.navigationOptions = ({ navigation }) => ({
  headerRight: () => (
    <TouchableOpacity onPress={() => console.log("Calling...")} style={{ marginRight: 20 }}>
      <Ionicons name="call" size={24} color="black" />
    </TouchableOpacity>
  ),
});

const styles = StyleSheet.create({
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagePickerIcon: {
    marginRight: 10,
  },
  sendIcon: {
    marginLeft: 10,
  },
  headerRight: {
    marginRight: 20,
  },
});



export default ChatScreen;