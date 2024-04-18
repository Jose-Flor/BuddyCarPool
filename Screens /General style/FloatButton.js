
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { View, StyleSheet, Text, Button, Modal } from 'react-native';
import { FAB } from 'react-native-elements';

function FloatButton(){
    const navigation =useNavigation()
    const [isModalVisible,setModalVisisble]=useState(false);
    const toggleModal=()=>{
        setModalVisisble(!isModalVisible)
        
    }

    return(
        <View style={styles.container}>
            <Modal isVisible={isModalVisible}>
            <View style={styles.modalContent}>
          <Text>This is the modal content!</Text>
          <Button title="Close" onPress={toggleModal} />
        </View>

        </Modal>
        <FAB
        title='Open'
        placement='right'
        onPress={toggleModal}

        
        />




        </View>


    );
}
export default FloatButton;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
      modalContent: {
        backgroundColor: 'white',
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
      },
    
})
