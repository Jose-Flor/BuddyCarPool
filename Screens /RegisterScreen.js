
import{View,Text, Button, StyleSheet, TextInput}from"react-native"
function RegisterScreen({navigation}){
    const handleSignIn=()=>{
        navigation.navigate('main')
    }
    const handleRegister=()=>{
        navigation.navigate('register')

    }
    return (
    <View style={styles.container} >
        <Text>
             Register screen
        </Text>
        <View style={styles.inputContainer}>
            <TextInput style={styles.TextInpu} placeholder="Username"/>

        </View>
        <View style={styles.inputContainer}>
            <TextInput  style={styles.TextInpu} placeholder="Passsword"/>
        </View>
        <Button style={styles.dummyText} title="sign in" onPress={handleSignIn}/>

        <View>

            <Button title="Register" />
        </View>

    </View>
    );
}
export default RegisterScreen;
const styles=StyleSheet.create({
    container:{
      backgroundColor:'green',
      flex:1,
      justifyContent: 'center',
      alignItems: 'center',
      padding:50

    },
    dummyText:{

    },
    inputContainer:{
       
        alignItems: 'center',
        width:'100%',
        padding:10,
      
    },
    TextInpu:{
     borderWidth:1,
     padding:10,
     marginVertical:10,
     width:'100%'
    }
    
}
)    