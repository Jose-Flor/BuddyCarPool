import { NavigationContainer } from "@react-navigation/native";
import { Text, View } from "react-native";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Drivers from "./Drivers";
import Messages from "./Messages";
import maps from "./Map";
import { GStyle } from "./General style/GStyle";
import {Ionicons} from '@expo/vector-icons';


const BottomTabs=createBottomTabNavigator();

function TabsOverview(){
    return (
    
         <BottomTabs.Navigator screenOptions={{
            headerStyle:{backgroundColor:GStyle.colors.bottmbTabs},
            headerTintColor:"white",
            tabBarStyle:{backgroundColor:GStyle.colors.bottmbTabs},
            tabBarActiveBackgroundColor:GStyle.colors.BottomTabsActive,
         }}>
            <BottomTabs.Screen name="Driver" component={Drivers}
            options={{
                title:'Recent Driver',
                tabBarLabel:'Recent ',
                tabBarIcon:({color,size})=>
                <Ionicons name='car' size={size} color={color}/>
            }} />
            <BottomTabs.Screen name="Messages" component={Messages}
             options={{
                title:'Messages',
                tabBarLabel:'Messages',
                tabBarIcon:({color,size})=><Ionicons name='text' size={size} color={color}/>


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
    return (
        
        

            <TabsOverview/>
       
        
    );
    
}
export default MainScreen;
