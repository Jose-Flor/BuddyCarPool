import React, { useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View, Image, Modal } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import ChatScreen from "./ChatScreen";

const dummy = [
    { id: '1', userName: 'Ali', userImage: require('../assets/user-4.jpg'), messageTime: '10 min ago', messageText: 'can you please pick me up from my house ' },
    { id: '2', userName: 'johni boy', userImage: require('../assets/user-5.jpg'), messageTime: '2 min ago', messageText: 'yes of course ' }
]

function Messages({ navigation }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [messageText, setMessageText] = useState('');
    const [recipient, setRecipient] = useState('');

    const filteredData = dummy.filter(item =>
        item.userName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const sendMessage = () => {
        // Perform actions to send message here
        console.log("Message sent:", messageText, "to", recipient);
        // Close the modal and reset input fields
        setIsModalVisible(false);
        setMessageText('');
        setRecipient('');
    };

    return (
        <View style={styles.container}>
            {/* Search bar */}
            <View style={styles.searchBar}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search by username"
                    onChangeText={text => setSearchQuery(text)}
                    value={searchQuery}
                />
                <TouchableOpacity style={styles.createMessageButton} onPress={() => setIsModalVisible(true)}>
                    <FontAwesome name="plus" size={24} color="white" />
                </TouchableOpacity>
            </View>

            {/* FlatList with filtered data */}
            <FlatList
                data={filteredData}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.card}
                        onPress={() => navigation.navigate('ChatScreen', { userName: item.userName })}
                    >
                        <View style={styles.userInfo} >
                            <View style={styles.userImageWRAPPER}>
                                <Image style={styles.userImg} source={item.userImage} />
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

            {/* Message modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={() => setIsModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <TextInput
                            style={styles.modalInput}
                            placeholder="CarpoolBuddy User"
                            onChangeText={text => setRecipient(text)}
                            value={recipient}
                        />
                        <TextInput
                            style={[styles.modalInput, styles.messageInput]}
                            placeholder="Type your message here"
                            onChangeText={text => setMessageText(text)}
                            value={messageText}
                            multiline={true}
                        />
                        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
                            <Text style={styles.sendButtonText}>Send</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderColor: '#cccccc',
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
    searchInput: {
        flex: 1,
        height: 40,
        borderWidth: 1,
        borderColor: '#cccccc',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginRight: 8,
    },
    createMessageButton: {
        padding: 8,
        backgroundColor: '#007bff',
       
    },
    card: {
        flexDirection: 'row',
        padding: 10,
        borderBottomWidth: 1,
        borderColor: '#cccccc', 
    },
    userInfo: {

    },
    userImg: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    userImageWRAPPER: {
        paddingRight: 10,
    },
    TextSection: {

    },
    UserInfoText: {

    },
    userName: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    postTime: {
        fontSize: 12,
        color: '#666',
        padding: 5,
    },
    messageText: {

    },
   
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        width: '80%',
    },
    modalInput: {
        borderWidth: 1,
        borderColor: '#cccccc',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    messageInput: {
        height: 100,
        textAlignVertical: 'top',
    },
    sendButton: {
        backgroundColor: '#007bff',
        borderRadius: 5,
        padding: 10,
        alignItems: 'center',
    },
    sendButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default Messages;
