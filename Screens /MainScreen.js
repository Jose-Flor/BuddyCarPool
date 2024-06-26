import { DrawerActions, NavigationContainer } from "@react-navigation/native";
import { Text, View, Modal, Button } from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Messages from "./Messages";
import maps from "./Map";
import Profile from "./Profile";
import { GStyle } from "./General style/GStyle";
import { Ionicons } from '@expo/vector-icons';
import Driverlist from "../Information/DriverList";
import IconButton from "./General style/IconButton";
import DriverFilter from "../Information/Filters";
import { useState, useEffect } from "react";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import StudentSummary from "../Information/StudentSummary";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ChatScreen from "./ChatScreen";
import { useNavigation } from "@react-navigation/native";
import CategoryScreen from "./CategoryScreen";
//import {createDrawerNavigator}from '@react-navigation/drawer'

const BottomTabs = createBottomTabNavigator();
const MessagesStack=createNativeStackNavigator();
function MessagesStackNavigator() {
  return (
    <MessagesStack.Navigator>
      <MessagesStack.Screen name='Messages' component={Messages} />
      <MessagesStack.Screen name='ChatScreen' component={ChatScreen} options={({ route }) => ({
        title: route.params.userName
      })}/>
      {/* Add other screens related to Messages here if necessary */}
    </MessagesStack.Navigator>
  );
}

function filterHandling({ navigation }) {
    return (
        <View>
            <Text>this is filter</Text>

        </View>
    );
}
// const Drawer=createDrawerNavigator();
// function Profiling({navigation}){
//     return(
//         <View>
//             <Button onPress={()=>navigation.goback()} title="go " />

//         </View>
//     )

// }
function TabsOverview({ setIsFilterModalVisible, filteredDrivers }) {
    const navigation = useNavigation();
    return (
        <View style={{flex: 1}}>
      <BottomTabs.Navigator
        initialRouteName="DriverList"
        screenOptions={({ }) => ({
          headerShown: false,
          tabBarStyle: { 
            backgroundColor: '#de0a26', 
            
       
            
            borderTopWidth: 0, 
            
            paddingBottom: 15,
            alignItems: 'center',
            height: 70,

          },
          tabBarActiveBackgroundColor: 'transparent',
          tabBarActiveTintColor: 'white',
          
        })}
      >
        <BottomTabs.Screen
          name="Driver"
          component={CategoryScreen}
          initialParams={{ filteredDrivers }}
          options={{
            title: "Driver Category",
            tabBarLabel: "Recent",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="car" size={size} color={'white'} style={{ borderRadius: 20, borderWidth: 1, borderColor: 'transparent', borderTopRightRadius: 0, borderBottomRightRadius: 0 }}/>
            ),
          }}
        />
        <BottomTabs.Screen 
          name='StudentSummary' 
          component={StudentSummary} 
          options={{
            title:'Students',
            tabBarLabel:'Students',
            tabBarIcon:({color,size})=> <Ionicons name="person" size={size} color={'white'} />
          }}
        />
        <BottomTabs.Screen 
          name="MessagesTab" 
          component={MessagesStackNavigator}
          options={{
            title: 'Messages',
            tabBarLabel: 'Messages',
            tabBarIcon: ({ color, size }) => <Ionicons name='paper-plane' size={size} color={'white'} />
          }} 
        />
        <BottomTabs.Screen 
          name="maps" 
          component={maps}
          options={{
            title: 'Maps',
            tabBarLabel: 'Maps',
            tabBarIcon: ({ color, size }) => <Ionicons name='map' size={size} color={'white'} />
          }} 
        />
      </BottomTabs.Navigator>
      </View>
    );
  }

function MainScreen() {
    const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
    const [allDrivers, setAllDrivers] = useState([]);
    const [filteredDrivers, setFilteredDrivers] = useState([]);
    const [selectedDay, setSelectedDay] = useState('Monday');
    const [userData, setUserData] = useState(null);

   

    const filterDrivers = (drivers, day) => {
        if (day) {
            const newFilteredDrivers = drivers.filter(driver =>
                driver.selectedDays && driver.selectedDays.includes(day)
            );
            setFilteredDrivers(newFilteredDrivers);
        } else {
            setFilteredDrivers(drivers);
        }
    };

    useEffect(() => {
        const fetchDrivers = async () => {
            try {
                const storedDrivers = await AsyncStorage.getItem('drivers');
                if (storedDrivers !== null) {
                    const drivers = JSON.parse(storedDrivers);
                    setAllDrivers(drivers);
                    console.log('All drivers', drivers)
                    filterDrivers(drivers, 'Monday');
                }
            } catch (error) {
                console.error('Error fetching drivers:', error);
            }
        };
        fetchDrivers();
    }, []);

    useEffect(() => {
        filterDrivers(allDrivers, selectedDay);
    }, [selectedDay, allDrivers]);

    return (
        <View style={{ flex: 1 }}>
            <TabsOverview
                setIsFilterModalVisible={setIsFilterModalVisible}
                filteredDrivers={filteredDrivers}
                userData={userData}
            />
            <Modal
                animationType="slide"
                transparent={true}
                visible={isFilterModalVisible}
                onRequestClose={() => setIsFilterModalVisible(false)}
            >
                <DriverFilter
                    selectedDay={selectedDay}
                    setSelectedDay={(day) => {
                        setSelectedDay(day);
                        setIsFilterModalVisible(false);
                        filterDrivers(allDrivers, day);
                    }}
                    onClose={() => setIsFilterModalVisible(false)}
                />
            </Modal>
        </View>
    );
}
export default MainScreen;