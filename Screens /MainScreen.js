import { NavigationContainer } from "@react-navigation/native";
import { Text, View,Modal,Button } from "react-native";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Drivers from "./Drivers";
import Messages from "./Messages";
import maps from "./Map";
import { GStyle } from "./General style/GStyle";
import {Ionicons} from '@expo/vector-icons';
import Driverlist from "../Information/DriverList";
import IconButton from "./General style/IconButton";
import DriverFilter from "../Information/Filters";
import { useState } from "react";
import React from "react";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
const BottomTabs=createBottomTabNavigator();
function profileScreen({navigation }){
    return (
        <View>
            <Text>this is profile screen </Text>
        </View>

    );
}
function filterHnadling ({navigation}){
    return (
        <View>
            <Text>this is filter</Text>

        </View>
    );
}
function TabsOverview({setIsFilterModalVisible,filteredDrivers}){
    return (
    
         <BottomTabs.Navigator 
         initialRouteName="DriverList"
         screenOptions={({navigation}) =>({
            
            headerStyle:{backgroundColor:GStyle.colors.bottmbTabs},
            
            headerTintColor:"white",
            tabBarStyle:{backgroundColor:GStyle.colors.bottmbTabs},
            tabBarActiveBackgroundColor:GStyle.colors.BottomTabsActive,
            
            headerRight:()=><IconButton icon='menu' size={24} color='white' onPress={()=>{navigation.navigate('')}}/>,
            headerLeft:()=><IconButton icon='funnel' size={22} color='white' onPress={()=>setIsFilterModalVisible(true)}/>
            
         })}>
             <BottomTabs.Screen
        name="Driver"
        component={Driverlist}
        initialParams={{  filteredDrivers }}
        options={{
          title: "Recent Driver",
          tabBarLabel: "Recent",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="car" size={size} color={color} />
          ),
        }}
      />
            <BottomTabs.Screen name="Messages" component={Messages}
             options={{
                title:'Messages',
                tabBarLabel:'Messages',
                tabBarIcon:({color,size})=><Ionicons name='paper-plane' size={size} color={color}/>


            }} />
            <BottomTabs.Screen name="maps" component={maps} 
            options={{
                title:'Maps',
                tabBarLabel:'Maps',
                tabBarIcon:({color,size})=><Ionicons name='map' size={size} color={color}/>
            }}/>

    </BottomTabs.Navigator>

    );
}

function MainScreen() {
    const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
    const [allDrivers, setAllDrivers] = useState([]);
    const [filteredDrivers, setFilteredDrivers] = useState([]);
    const [selectedDay, setSelectedDay] = useState('Monday');



    

   
    const filterDrivers = (drivers, day) => {
        if (day) {
            const newFilteredDrivers = drivers.filter(driver =>
                driver.selectedDays && driver.selectedDays.includes(day)
            );
            setFilteredDrivers(newFilteredDrivers);
        } else {
            setFilteredDrivers(drivers); // Show all drivers if no day is selected
        }
    };

    useEffect(() => {
        const fetchDrivers = async () => {
            try {
                const storedDrivers = await AsyncStorage.getItem('drivers');
                if (storedDrivers !== null) {
                    const drivers = JSON.parse(storedDrivers);
                    setAllDrivers(drivers);
                    filterDrivers(drivers, 'Monday'); // Apply initial filter
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
            {/* Render the TabsOverview and pass necessary props */}
            <TabsOverview 
    setIsFilterModalVisible={setIsFilterModalVisible} 
    filteredDrivers={filteredDrivers}
/>


            {/* Modal for driver filter */}
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
                       setIsFilterModalVisible(false); // Close modal when day is selected
                       filterDrivers(allDrivers, day); // Update the filtered drivers
                    }}
                    onClose={() => setIsFilterModalVisible(false)}
                />
            </Modal>
        </View>
    );

    
}
export default MainScreen;
