import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import MainScreen from "./Screens /MainScreen";
import RegisterScreen from "./Screens /RegisterScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import RegisterForm from "./Screens /RegisterForm";
import Driverlist from "./Information/DriverList";
import DriverOverView from "./Information/DriverOverView";

import ScheduleLocation from "./Screens /ScheduleLocation";
import DriverFilter from "./Information/Filters";
import StudentProfile from "./Information/StudentProfile";
import ChatScreen from "./Screens /ChatScreen";
import Messages from "./Screens /Messages";
import { createDrawerNavigator } from "@react-navigation/drawer";
import CategoryScreen from "./Screens /CategoryScreen";
import DriverOverView2 from "./Information/DriverComponentNew/DriverOverView2";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import DriverDetails from "./Information/DriverComponentNew/DriverDetails";
import CarFavoriteScreen from "./Information/DriverComponentNew/CarFavoriteScreen";
import FavoritesContextProvider from "./Information/Store/favorite-context";
import { Provider } from "react-redux";
import { Image } from "react-native";
import { AuthProvider } from "./Information/Store/AuthContext";
import DrawerContent from "./Information/DrawerContent";
import CarMapplace from "./Information/DriverComponentNew/CarMapplace";

import Profile from "./Screens /Profile";
import Feeds from "./Information/Feeds";
import AddPost from "./Information/AddPost";
import PlaceForm from "./Information/Places/PlaceForm";
import LocationPicker from "./Information/Places/LocationPicker";
import Maps from "./Screens /Map";
import IconButton from "./Screens /General style/IconButton";
import { DriverProvider } from "./Information/Store/Carpool-Context";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const LogoTitle = () => (
  <Image
    style={{ width: 120, height: 30 }}
    source={require("./assets/CSUNlogo.jpg")}
    resizeMode="contain"
  />
);

function DrawerNvaigator() {
  return (
    <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
      <Drawer.Screen
        name="Main"
        component={MainScreen}
        options={{
          headerShown: true,
          headerRight: () => {},
        }}
      />
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="CarFavoriteScreen" component={CarFavoriteScreen} />
      <Drawer.Screen name="Feeds" component={Feeds} />
    </Drawer.Navigator>
  );
}
export default function App() {
  return (
    <AuthProvider>
      <DriverProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <FavoritesContextProvider>
            <NavigationContainer>
              <Stack.Navigator initialRouteName="Register">
                <Stack.Screen
                  name="Register"
                  component={RegisterScreen}
                  options={{ headerShown: false }}
                />

                <Stack.Screen
                  name="main"
                  component={DrawerNvaigator}
                  options={{
                    headerShown: true,
                    headerTitle: () => (
                      <Image
                        source={require("./assets/logo.jpg")}
                        style={{
                          width: 100,
                          height: 100,
                          alignSelf: "flex-start",
                          marginTop: -20,
                        }}
                      />
                    ),
                    headerStyle: {
                      backgroundColor: "#de0a26",
                    },
                  }}
                />
                <Stack.Screen
                  name="DriverOverView"
                  component={DriverOverView}
                  options={{
                    presentation: "modal",
                    headerStyle: {
                      backgroundColor: "orangered",
                    },
                  }}
                />
                <Stack.Screen name="RegisterForm" component={RegisterForm} />
                <Stack.Screen
                  name="ScheduleLocation"
                  component={ScheduleLocation}
                />

                <Stack.Screen name="DriverList" component={Driverlist} />
                <Stack.Screen name="DriverFilter" component={DriverFilter} />
                <Stack.Screen
                  name="Home"
                  component={DrawerNvaigator}
                  options={{
                    headerShown: false,
                  }}
                />

                <Stack.Screen
                  name="CategoryScreen "
                  component={CategoryScreen}
                  options={{
                    contentStyle: { backgroundColor: "#BA324F" },
                  }}
                />
                <Stack.Screen
                  name="DriverOverView2"
                  component={DriverOverView2}
                  options={{
                    headerStyle: {
                      backgroundColor: "orangered",
                    },
                  }}
                />
                <Stack.Screen
                  name="DriverDetails"
                  component={DriverDetails}
                  options={{
                    presentation: "modal",

                    headerStyle: {
                      backgroundColor: "#de0a26",
                    },
                  }}
                />
                {/* <Stack.Screen name='ChatScreen' component={ChatScreen} options={({route})=>({
          title:route.params.userName
        })}/>
      <Stack.Screen name='Messages'component={Messages}/> */}
                <Stack.Screen
                  name="CarMapplace"
                  component={CarMapplace}
                  options={{
                    presentation: "modal",
                    headerStyle: {
                      backgroundColor: "#de0a26",
                    },
                  }}
                />
                <Stack.Screen name="AddPost" component={AddPost} />
                <Stack.Screen
                  name="Maps"
                  component={Maps}
                  options={{ headerRight: () => <IconButton icon="save" /> }}
                />

                {/* <Stack.Screen name="PlaceFrom" component={PlaceForm} /> */}
                <Stack.Screen
                  name="LocationPicker"
                  component={LocationPicker}
                />
              </Stack.Navigator>
            </NavigationContainer>
          </FavoritesContextProvider>
        </GestureHandlerRootView>
      </DriverProvider>
    </AuthProvider>
  );
}
//later add option={{headerhown:false}} to remove the header
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
