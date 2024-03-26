
import {StyleSheet,View,Button, Text}from'react-native'
import{useState,useEffect,useCallback}from'react'
//import {Bubble, GiftedChat}from'react-native-gifted-chat'

function ChatScreen(){
    const [messages, setMessages] = useState([])

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
      ])
    }, [])
  
    const onSend = useCallback((messages = []) => {
      setMessages(previousMessages =>
        GiftedChat.append(previousMessages, messages),
      )
    }, [])
    const renderBubble=(props)=>{
        return(
        <Bubble
        {...props}
        wrapperStyle={{
            right:{
                backgroundColor:'#2e64e5'
            }
        }}
        textStyle={{
            right:{
                color:'#fff'
            }
        }}

        />
        );
    }
    return (
        <GiftedChat
          messages={messages}
          onSend={messages => onSend(messages)}
          user={{
            _id: 1,
          }}
          renderBubble={renderBubble}
        />
      )
}
export default ChatScreen;
const style=StyleSheet.create({


})