import { NavigationContainer } from "@react-navigation/native";
import { Text, View, Modal, Button } from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Drivers from "./Drivers";
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

const BottomTabs = createBottomTabNavigator();

function filterHandling({ navigation }) {
    return (
        <View>
            <Text>this is filter</Text>

        </View>
    );
}
function TabsOverview({ setIsFilterModalVisible, filteredDrivers }) {
    return (

        <BottomTabs.Navigator
            initialRouteName="DriverList"
            screenOptions={({ navigation }) => ({

                headerStyle: { backgroundColor: GStyle.colors.bottmbTabs },

                headerTintColor: "white",
                tabBarStyle: { backgroundColor: GStyle.colors.bottmbTabs },
                tabBarActiveBackgroundColor: GStyle.colors.BottomTabsActive,

                headerRight: () => <IconButton icon='menu' size={24} color='white' onPress={() => { navigation.navigate('StudentProfile') }} />,
                headerLeft: () => <IconButton icon='funnel' size={22} color='white' onPress={() => setIsFilterModalVisible(true)} />

            })}>
            <BottomTabs.Screen
                name="Driver"
                component={Driverlist}
                initialParams={{ filteredDrivers }}
                options={{
                    title: "Recent Driver",
                    tabBarLabel: "Recent",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="car" size={size} color={'White'} />
                    ),
                }}
            />
                    <BottomTabs.Screen name='StudentSummary' component={StudentSummary} 
                    options={{
                        title:'Students ',
                        tabBarLabel:'Students',
                        tabBarIcon:({color,size})=> <Ionicons name="person" size={size} color={color} />
                    }}
                    />
            <BottomTabs.Screen name="Messages" component={Messages}
                options={{
                    title: 'Messages',
                    tabBarLabel: 'Messages',
                    tabBarIcon: ({ color, size }) => <Ionicons name='paper-plane' size={size} color={'White'} />


                }} />
            <BottomTabs.Screen name="maps" component={maps}
                options={{
                    title: 'Maps',
                    tabBarLabel: 'Maps',
                    tabBarIcon: ({ color, size }) => <Ionicons name='map' size={size} color={'White'} />
                }} />
            
        </BottomTabs.Navigator>

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