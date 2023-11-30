import { NavigationContainer } from "@react-navigation/native";
import { Text, View } from "react-native";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Drivers from "./Drivers";
import Messages from "./Messages";
import maps from "./Map";
import { GStyle } from "./General style/GStyle";
import {Ionicons} from '@expo/vector-icons';
import Driverlist from "../Information/DriverList";
import IconButton from "./General style/IconButton";


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
function TabsOverview(){
    return (
    
         <BottomTabs.Navigator 
         initialRouteName="DriverList"
         screenOptions={{
            
            headerStyle:{backgroundColor:GStyle.colors.bottmbTabs},
            
            headerTintColor:"white",
            tabBarStyle:{backgroundColor:GStyle.colors.bottmbTabs},
            tabBarActiveBackgroundColor:GStyle.colors.BottomTabsActive,
            
            headerRight:()=><IconButton icon='menu' size={24} color='white' onPress={()=>{navigation.navigate('')}}/>,
            headerLeft:()=><IconButton icon='funnel' size={22} color='white' onPress={()=>{}}/>
            
         }}>
            <BottomTabs.Screen name="Driver" component={Driverlist}
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
    return (
        
        

            <TabsOverview/>
       
        
    );
    
}
export default MainScreen;
