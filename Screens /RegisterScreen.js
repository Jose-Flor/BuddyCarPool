
import{View,Text, Button, StyleSheet, TextInput}from"react-native"
function RegisterScreen({navigation}){
    const handleSignIn=()=>{
        navigation.navigate('main')
    }
    const handleRegister=()=>{
        navigation.navigate('RegisterForm')

    }
    return (
    <View style={styles.container} >
        <View style={styles.textStyle}>

        <Text style={styles.textStyle} >
             Buddy Car Pool
        </Text>
        <Text style={styles.textsyle2}>
            The best app to find your next carpool buddy!
        </Text>
        </View>
        <View style={styles.inputContainer}>
            <TextInput style={styles.TextInpu} placeholder="Username"/>

        </View>
        <View style={styles.inputContainer}>
            <TextInput  style={styles.TextInpu} placeholder="Password"/>
        </View>
        <Button style={styles.dummyText} title="Sign In" onPress={handleSignIn}/>

        <View>

            <Button title="Register" onPress={handleRegister} />
        </View>

    </View>
    );
}
export default RegisterScreen;
const styles=StyleSheet.create({
    container:{
      backgroundColor:'white',
      flex:1,
      justifyContent: 'center',
      alignItems: 'center',
      padding:50

    },
    dummyText:{
        textDecorationStyle: 'none',
        color: 'green',

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
    },
    textStyle:{
        fontStyle:'italic',
        fontSize:60,
        color: 'green',
        textAlign: 'center'
    },
    textsyle2:{
        color:'black',
        textAlign: 'center'
        


    }

    
}
)    