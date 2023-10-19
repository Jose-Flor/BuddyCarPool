import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import MainScreen from './Screens /MainScreen';
import RegisterScreen from './Screens /RegisterScreen';
import{createNativeStackNavigator}from'@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import RegisterForm from './Screens /RegisterForm';

const Stack=createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>

      <Stack.Navigator initialRouteName='Register'>
        <Stack.Screen name='Register' component={RegisterScreen} options={{headerShown:false}}/>
        <Stack.Screen  name='main' component={MainScreen} />
        <Stack.Screen name='RegisterForm' component={RegisterForm}/>

      </Stack.Navigator>
    </NavigationContainer> 
  );
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
  },
});
