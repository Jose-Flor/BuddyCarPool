// import React, { useState, useEffect, useContext } from "react";
// import {
//   ScrollView,
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   ImageBackground,
//   TouchableOpacity,
//   Alert,
//   KeyboardAvoidingView,
//   Platform,
// } from "react-native";
// import {
//   TextInput,
//   Checkbox,
//   Button,
//   ActivityIndicator,
//   FAB,
//   Portal,
//   Provider,
// } from "react-native-paper";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { useAuth } from "../Store/AuthContext";
// import * as ImagePicker from "expo-image-picker";
// import {
//   getCurrentPositionAsync,
//   useForegroundPermissions,
//   PermissionStatus,
// } from "expo-location";
// import LocationPicker from "../Places/LocationPicker";
// import MapView, { Marker } from "react-native-maps";
// import { useRoute } from "@react-navigation/native";
// import { Camera } from "expo-camera";
// import { Picker } from "@react-native-picker/picker";
// import { DriverContext } from "../Store/Carpool-Context";

// function PlaceForm({ isEditing, editDriverId, navigation }) {
//   const [permissionInfo, requestPermission] = useForegroundPermissions();
//   const [location, setLocation] = useState(null);
//   const [mapVisible, setMapVisible] = useState(false);
//   const [carModel, setCarModel] = useState("");
//   const [carType, setCarType] = useState("");
//   const [passengerLimit, setPassengerLimit] = useState(0);
//   const [isPickerVisible, setIsPickerVisible] = useState(false);
//   const { addDriver, updateDriver } = useContext(DriverContext);
//   const { fetchUserData } = useAuth(); // This should correctly destructure fetchUserData

//   const { user, updateUserData, uploadImage } = useAuth();

//   const [profileData, setProfileData] = useState({
//     firstName: "",
//     lastName: "",
//     availability: {
//       Monday: false,
//       Tuesday: false,
//       Wednesday: false,
//       Thursday: false,
//       Friday: false,
//     },
//     carImage: null,
//     profileImage: null,
//     bio: " ",
//     location: { lat: null, lng: null }, // Ensure location is properly initialized
//   });
//   const [loading, setLoading] = useState(false);
//   const [open, setOpen] = useState(false);
//   const [carImage, setCarImage] = useState(null);
//   const route = useRoute();
//   const pickedLocation = route.params?.pickedLocation;

//   const handleCarTypeChange = (selectedCarType) => {
//     setCarType(selectedCarType);
//     setPassengerLimit(selectedCarType === "Sedan" ? 4 : 6); // Adjust numbers based on your requirements
//   };

//   useEffect(() => {
//     if (pickedLocation) {
//       setLocation(pickedLocation);
//       setProfileData((prev) => ({
//         ...prev,
//         location: pickedLocation,
//       }));
//     }
//   }, [pickedLocation]);

//   useEffect(() => {
//     const fetchData = async () => {
//         setLoading(true);
//         try {
//             const userData = await fetchUserData();
//             if (userData) {
//                 setProfileData(prev => ({
//                     ...prev,
//                     ...userData,
//                     profileImage: userData.profileImage ? userData.profileImage : require('') // provide a default image path
//                 }));
//             }
//         } catch (error) {
//             console.error("Failed to fetch data:", error);
//             Alert.alert("Error", "Failed to fetch data.");
//         }
//         setLoading(false);
//     };
//     fetchData();
// }, []);

//   const handleBioChange = (text) => {
//     setProfileData((prev) => ({ ...prev, bio: text }));
//   };

//   const handleLocationPermission = async () => {
//     if (!permissionInfo) {
//       const { status } = await requestPermission();
//       if (status !== PermissionStatus.GRANTED) {
//         Alert.alert(
//           "Permission Denied",
//           "Location permission is required to use this feature."
//         );
//         return;
//       }
//     } else {
//       if (permissionInfo.status !== PermissionStatus.GRANTED) {
//         const { status } = await requestPermission();
//         if (status !== PermissionStatus.GRANTED) {
//           Alert.alert(
//             "Permission Denied",
//             "Location permission is required to use this feature."
//           );
//           return;
//         }
//       }
//     }
//   };
//   const getLocation = async () => {
//     let { status } = await requestPermission();
//     if (status !== PermissionStatus.GRANTED) {
//       Alert.alert(
//         "Permission Denied",
//         "Location permission is required to use this feature."
//       );
//       return;
//     }
//     try {
//       const location = await getCurrentPositionAsync({});
//       setProfileData((prev) => ({
//         ...prev,
//         location: {
//           lat: location.coords.latitude,
//           lng: location.coords.longitude,
//         },
//       }));
//       setMapVisible(true); // Ensure map is visible when location is updated
//     } catch (error) {
//       console.error("Error fetching location:", error);
//       Alert.alert("Location Error", "Unable to fetch location.");
//     }
//   };

//   const toggleMap = () => {
//     if (!mapVisible) {
//       getLocation(); // Fetch location only when toggling the map on if not already visible
//     } else {
//       setMapVisible(false); // Hide the map if it's already visible
//     }
//   };

//   function pickonMapHnadler() {
//     navigation.navigate("Maps");
//   }

//   const handleAvailabilityChange = (day) => {
//     setProfileData((prevState) => ({
//       ...prevState,
//       availability: {
//         ...prevState.availability,
//         [day]: !prevState.availability[day], // This toggles the day correctly
//       },
//     }));
//   };

//   const handleImagePick = async () => {
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 1,
//     });
  
//     // Check if the operation was cancelled
//     if (!result.canceled) {
//       // Access the first asset safely
//       if (result.assets && result.assets.length > 0) {
//         const uri = result.assets[0].uri;
//         // Set the image URI in your state or wherever it's needed
//         setProfileData(prev => ({
//           ...prev,
//           carImage: { uri } // Ensuring we set an object with a uri property
//         }));
//         // Optionally upload the image to backend here or mark for upload
//       } else {
//         console.error("No assets found in the result");
//       }
//     }
//   };
//   const togglePicker = () => {
//     setIsPickerVisible(!isPickerVisible);
// };
  
//   const takePhoto = async () => {
//     // First, request the camera permissions
//     const { status } = await Camera.requestCameraPermissionsAsync();
//     if (status !== 'granted') {
//       alert('Sorry, we need camera permissions to make this work!');
//       return;
//     }
  
//     // Then, launch the camera
//     let result = await ImagePicker.launchCameraAsync({
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 1,
//     });
  
//     if (!result.canceled && result.assets) {
//       setProfileData(prev => ({
//         ...prev,
//         carImage: { uri: result.assets[0].uri } // Ensure correct structure
//       }));
//     }
//   };
  
//   const saveImageUri = async (uri) => {
//     try {
//       await AsyncStorage.setItem("carImageUri", uri);
//     } catch (error) {
//       console.error("Failed to save car image:", error);
//     }
//   };

//   const pickImage = async () => {
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 1,
//     });

//     if (!result.canceled && result.assets) {
//       setCarImage({ uri: result.assets[0].uri }); // Set the car image URI from the first asset
//     }
//   };

//   const handleSubmit = async () => {
//     setLoading(true);
//     try {
//       let imageUrl = carImage;
//       if (carImage && carImage.startsWith("file")) {
//         imageUrl = await uploadImage(carImage);
//       }
//       const updatedProfile = { ...profileData, carImage: imageUrl };
//       await updateUserData(updatedProfile);
//       alert("Profile updated successfully!");
//     } catch (error) {
//       console.error("Failed to update profile:", error);
//       Alert.alert("Failed to update profile. Please try again.");
//     }
//     setLoading(false);
//   };

//   const mapRegion = {
//     latitude: profileData.location.lat || 37.78825, // default latitude if none
//     longitude: profileData.location.lng || -122.4324, // default longitude if none
//     latitudeDelta: 0.0922,
//     longitudeDelta: 0.0421,
//   };

//   return (
//     <Provider>
//       <KeyboardAvoidingView
//         behavior={Platform.OS === "ios" ? "padding" : "height"}
//         style={{ flex: 1 }}
//         i
//       >
//         <ScrollView style={styles.container}>
//           <View style={{ alignSelf: "center" }}>
//             {loading && <ActivityIndicator animating={true} size="large" />}
//             <Image
//               source={profileData.profileImage}
//               style={styles.profileImage}
//               resizeMode="cover"
//             />
//             <Text
//               style={styles.name}
//             >{`${profileData.firstName} ${profileData.lastName}`}</Text>

//             {Object.keys(profileData.availability).map((day) => (
//               <View key={day} style={styles.dayContainer}>
//                 <Text>{day}</Text>
//                 <Checkbox
//                   status={
//                     profileData.availability[day] ? "checked" : "unchecked"
//                   }
//                   onPress={() => handleAvailabilityChange(day)}
//                 />
//               </View>
//             ))}
//             {profileData.carImage && (
//               <ImageBackground
//                 source={{ uri: profileData.carImage.uri }}
//                 style={styles.carImage}
//               >
//                 <Text style={styles.instructions}>Car Picture</Text>
//               </ImageBackground>
//             )}
//             <ImageBackground style={styles.mapImage}>
//               {profileData.location.lat && profileData.location.lng && (
//                 <MapView
//                   style={{ flex: 1 }}
//                   initialRegion={{
//                     latitude: profileData.location.lat,
//                     longitude: profileData.location.lng,
//                     latitudeDelta: 0.0922,
//                     longitudeDelta: 0.0421,
//                   }}
//                 >
//                   <Marker
//                     coordinate={{
//                       latitude: profileData.location.lat,
//                       longitude: profileData.location.lng,
//                     }}
//                     title={"Selected Location"}
//                   />
//                 </MapView>
//               )}
//             </ImageBackground>

//             <View style={styles.inputContainerStyle}>
//               <TextInput
//                 mode="outlined"
//                 label="Bio"
//                 value={profileData.bio}
//                 onChangeText={handleBioChange}
//                 theme={{
//                   roundness: 25, // Custom roundness
//                   colors: {
//                     primary: "#6200ee",
//                     underlineColor: "transparent", // Hide the underline
//                   },
//                 }}
//                 style={{ backgroundColor: "white", width: "90%" }}
//               />
//             </View>
//             <TextInput
//               placeholder="Car Model"
//               onChangeText={setCarModel}
//               value={carModel}
//               style={styles.input} // Use the existing styles or adjust as needed
//             />

//             <View style={styles.inputContainer}>
//               <TouchableOpacity onPress={togglePicker} style={styles.input}>
//                 <Text>{carType || "Select Your Car Type"}</Text>
//               </TouchableOpacity>
//               {isPickerVisible && (
//                 <Picker
//                   selectedValue={carType}
//                   onValueChange={handleCarTypeChange}
//                   style={{ width: "100%" }}
//                 >
//                   <Picker.Item label="Sedan" value="Sedan" />
//                   <Picker.Item label="Van" value="Van" />
//                 </Picker>
//               )}
//             </View>

//             {carType && <Text>Passenger Limit: {passengerLimit}</Text>}

//             <Portal>
//               <FAB.Group
//                 open={open}
//                 icon={open ? "close" : "plus"}
//                 actions={[
//                   { icon: "car", label: "Take Photo", onPress: takePhoto },
//                   {
//                     icon: "car",
//                     label: "Pick Image",
//                     onPress: handleImagePick,
//                   },
//                   {
//                     icon: "map-marker",
//                     label: "Toggle Map",
//                     onPress: toggleMap,
//                   },
//                   {
//                     icon: "map",
//                     label: "Pick on map",
//                     onPress: pickonMapHnadler,
//                   },
//                 ]}
//                 onStateChange={({ open }) => setOpen(open)}
//               />
//             </Portal>
//             <Button
//               onPress={handleSubmit}
//               mode="contained"
//               style={styles.button}
//             >
//               {isEditing ? "Update Info" : "Add Info"}
//             </Button>
//           </View>
//         </ScrollView>
//       </KeyboardAvoidingView>
//     </Provider>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 10,
//   },
//   label: {
//     marginVertical: 8,
//   },
//   input: {
//     marginBottom: 20,
//   },
//   dayContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 2,
//   },
//   image: {
//     width: 300,
//     height: 200,
//     resizeMode: "contain",
//     marginBottom: 10,
//   },
//   carImage: {
//     width: 200,
//     height: 150,
//     borderRadius: 50,
//     borderWidth: 5,
//     borderColor: "black",
//     overflow: "hidden",
//     marginBottom: 10,
//   },
//   mapImage: {
//     width: 200,
//     height: 150,
//     borderRadius: 50,
//     borderWidth: 5,
//     borderColor: "black",
//     overflow: "hidden",
//     marginBottom: 10,
//   },
//   button: {
//     margin: 30,
//   },
//   profileImage: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     borderWidth: 2,
//     borderColor: "black",
//     overflow: "hidden",
//     marginBottom: 1,
//     marginLeft: 50,
//     justifyContent: "center",
//   },
//   name: {
//     fontSize: 20,
//     fontWeight: "bold",
//     textAlign: "center",
//     marginVertical: 10,
//   },
//   inputContainerStyle: {
//     margin: 8,
//   },
//   inputContentStyle: {
//     paddingLeft: 50,
//     fontWeight: "bold",
//     fontStyle: "italic",
//   },
//   instructions: {
//     fontSize: 18,
//     color: "#fff",
//     textAlign: "center",
//     backgroundColor: "rgba(0,0,0,0.5)", // Semi-transparent background for visibility
//     padding: 10,
//   },
//   mapInstructions: {
//     fontSize: 18,
//     color: "#fff",
//     textAlign: "center",
//     backgroundColor: "rgba(0,0,0,0.5)", // Semi-transparent background for visibility
//     padding: 10,
//   },
// });

// export default PlaceForm;
