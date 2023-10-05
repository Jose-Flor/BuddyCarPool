import { NavigationContainer } from "@react-navigation/native";
import { Text, View } from "react-native";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Drivers from "./Drivers";
import Messages from "./Messages";
import maps from "./Map";

const BottomTabs=createBottomTabNavigator();

function TabsOverview(){
    return (
    
         <BottomTabs.Navigator>
            <BottomTabs.Screen name="Driver" component={Drivers} />
            <BottomTabs.Screen name="Messages" component={Messages} />
            <BottomTabs.Screen name="maps" component={maps}/>

    </BottomTabs.Navigator>

    );
}

function MainScreen() {
    return (
        
        

            <TabsOverview/>
       
        
    );
    
}
export default MainScreen;
