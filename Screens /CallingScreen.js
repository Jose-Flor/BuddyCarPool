import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

const CallingScreen = () => {
  const [dots, setDots] = useState(1);
  const [isCalling, setIsCalling] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prevDots => (prevDots === 3 ? 1 : prevDots + 1));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const handleHangup = () => {
    setIsCalling(false);
  };

  const handleVideoChat = () => {
    // Functionality for video chat button
    console.log('Video chat button pressed');
  };

  const handleMute = () => {
    setIsMuted(!isMuted);
  };

  if (!isCalling) {
    return null;
  }

  // Sample user data
  const user = {
    id: '1',
    userName: 'Abby',
    userImage: require('../assets/user-4.jpg'), // Provide correct path to the image
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {/* Profile picture and username */}
      <View style={{ alignItems: 'center', marginBottom: 20 }}>
        <Image source={user.userImage} style={{ width: 80, height: 80, borderRadius: 40 }} />
        <Text style={{ marginTop: 10, fontSize: 18 }}>{user.userName}</Text>
      </View>
      
      {/* "Calling" text and dots */}
      <Text style={{ fontSize: 24 }}>{'Calling' + '.'.repeat(dots)}</Text>
      
      {/* Buttons */}
      <View style={{ flexDirection: 'row', marginTop: 20 }}>
        <TouchableOpacity onPress={handleHangup} style={{ marginRight: 20 }}>
          <View style={{ backgroundColor: 'red', width: 60, height: 60, borderRadius: 30, justifyContent: 'center', alignItems: 'center' }}>
            <Icon name="phone" type="font-awesome" color="white" size={30} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleVideoChat} style={{ marginRight: 20 }}>
          <View style={{ backgroundColor: 'black', width: 60, height: 60, borderRadius: 30, justifyContent: 'center', alignItems: 'center' }}>
            <Icon name="videocam" type="material" color="white" size={30} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleMute}>
          <View style={{ backgroundColor: 'black', width: 60, height: 60, borderRadius: 30, justifyContent: 'center', alignItems: 'center' }}>
            <Icon name={isMuted ? "mic-off" : "mic"} type="material" color={isMuted ? "red" : "white"} size={30} />
            {isMuted && <View style={{ position: 'absolute', width: 40, height: 2, backgroundColor: 'red', transform: [{ rotate: '45deg' }] }} />}
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CallingScreen;
