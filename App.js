import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import MainScreen from './Screens /MainScreen';
import RegisterScreen from './Screens /RegisterScreen';
import{createNativeStackNavigator}from'@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

const Stack=createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>

      <Stack.Navigator initialRouteName='Register'>
        <Stack.Screen name='Register' component={RegisterScreen} options={{headerShown:false}}/>
        <Stack.Screen  name='main' component={MainScreen} options={{headerShown:false}}/>

      </Stack.Navigator>
    </NavigationContainer>
      
      
    
    
  );
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
  },
});
