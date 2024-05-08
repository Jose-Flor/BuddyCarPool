import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  Image,
  ScrollView,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import {
  FAB,
  Modal,
  Portal,
  Text,
  Button,
  Provider,
  TextInput,
  Checkbox,
  ActivityIndicator,
} from "react-native-paper";
import { useAuth } from "../Information/Store/AuthContext";

export default function Profile() {
  const [modalVisible, setModalVisible] = useState(false);
  const [city, setCity] = useState(""); // State for city input
  const [phoneNumber, setPhoneNumber] = useState(""); // State for phone number input
  const [availabilityDate, setAvailabilityDate] = useState(new Date()); // State for availability date picker
  const [openDatePicker, setOpenDatePicker] = useState(false); // State to control date picker visibility
  const { user, fetchUserData, updateUserData, uploadImage } = useAuth(); // Using useAuth for context
  const [loading, setLoading] = useState(true); // Add a loading state
  const [profileImage, setProfileImage] = useState(
    require("../assets/logo1.jpg")
  );

  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    city: "",
    phoneNumber: "",
    profileImage: "",

    bio: "",
    availability: {
      Monday: false,
      Tuesday: false,
      Wednesday: false,
      Thursday: false,
      Friday: false,
    },
  });
  useEffect(() => {
    async function loadData() {
      if (!user) {
        console.log("No user found, skipping data load.");
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const userData = await fetchUserData();
        console.log("Fetched userData:", userData); // Check what you get immediately after fetching

        // Accessing the first property of userData, as userData contains an additional nested object.
        const userKey = Object.keys(userData)[0];
        const userDetails = userData[userKey];

        if (userDetails) {
          setProfileData({
            firstName: userDetails.firstName || "",
            lastName: userDetails.lastName || "",
            city: userDetails.city || "",
            phoneNumber: userDetails.phoneNumber || "",
            profileImage: userDetails.profileImage
              ? { uri: userDetails.profileImage }
              : require("../assets/logo1.jpg"),
            bio: userDetails.bio || "",
            availability: userDetails.availability || {
              Monday: false,
              Tuesday: false,
              Wednesday: false,
              Thursday: false,
              Friday: false,
            },
          });
          console.log("User data loaded successfully:", userDetails);
        } else {
          console.log("User data is empty.");
        }
      } catch (error) {
        console.error("Failed to load user data:", error);
      }
      setLoading(false);
    }
    loadData();
  }, [user]);

  const handleInputChange = (name, value) => {
    // General handler for text inputs that updates state
    setProfileData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleAvailabilityChange = (day) => {
    // Toggle availability days
    setProfileData((prevState) => ({
      ...prevState,
      availability: {
        ...prevState.availability,
        [day]: !prevState.availability[day],
      },
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      let imageUrl = profileData.profileImage;
      if (profileData.profileImage.includes("file://")) {
        imageUrl = await uploadImage(profileData.profileImage);
      }
      await updateUserData({ ...profileData, profileImage: imageUrl });
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Failed to update profile:", error);
      alert("Failed to update profile. Please try again.");
    }
    setLoading(false);
  };

  const [open, setOpen] = useState(false);
  const onStateChange = ({ open }) => setOpen(open);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled && result.assets) {
      setProfileData((prevState) => ({
        ...prevState,
        profileImage: result.assets[0].uri, // Accessing uri from assets array
      }));
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera permissions to make this work!");
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled && result.assets) {
      setProfileData((prevState) => ({
        ...prevState,
        profileImage: result.assets[0].uri, // Accessing uri from assets array
      }));
    }
  };

  return (
    <Provider>
      <SafeAreaView style={styles.container}>
        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator animating={true} color={"#333"} size="large" />
          </View>
        )}
        {!loading && (
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.titleBar}>
              <Ionicons
                name="ios-arrow-back"
                size={24}
                color="#52575D"
              ></Ionicons>
            </View>

            <View style={{ alignSelf: "center" }}>
              <View style={styles.profileImage}>
                {profileData.profileImage && (
                  <Image
                    source={{ uri: profileData.profileImage }}
                    style={styles.image}
                    resizeMode="cover"
                  />
                )}
              </View>
              <View style={styles.dm}>
                <MaterialIcons
                  name="chat"
                  size={18}
                  color="#DFD8C8"
                ></MaterialIcons>
              </View>
              <View style={styles.active}></View>
              <View style={styles.add}>
                <Ionicons
                  name="ios-add"
                  size={48}
                  color="#DFD8C8"
                  style={{ marginTop: 6, marginLeft: 2 }}
                ></Ionicons>
              </View>
            </View>
            <Portal>
              <FAB.Group
                open={open}
                icon={open ? "plus" : "plus"}
                actions={[
                  { icon: "camera", label: "TAke Photo", onPress: takePhoto },
                  { icon: "image", label: "Pick Image", onPress: pickImage },
                ]}
                onStateChange={onStateChange}
              />
            </Portal>

            <View style={styles.infoContainer}>
              <Text style={[styles.text, { fontSize: 24 }]}>
                Name: {profileData.firstName} {profileData.lastName}
              </Text>
            </View>

            <View style={styles.statsContainer}>
              <View style={styles.statsBox}>
                <Text style={[styles.text, { fontSize: 17 }]}>City:</Text>

                <TextInput
                  value={profileData.city}
                  onChangeText={(text) => handleInputChange("city", text)}
                  style={styles.input}
                  placeholder="City"
                />
              </View>
              <View
                style={[
                  styles.statsBox,
                  {
                    borderColor: "#DFD8C8",
                    borderLeftWidth: 1,
                    borderRightWidth: 1,
                  },
                ]}
              >
                <Text style={[styles.text, { fontSize: 17 }]}>
                  Availability:
                </Text>
                {Object.keys(profileData.availability).map((day) => (
                  <View key={day} style={styles.dayContainer}>
                    <Text>{day}</Text>
                    <Checkbox
                      status={
                        profileData.availability[day] ? "checked" : "unchecked"
                      }
                      onPress={() => handleAvailabilityChange(day)}
                    />
                  </View>
                ))}
              </View>
              <View style={styles.statsBox}>
                <Text style={[styles.text, { fontSize: 17 }]}>Intention:</Text>

                <Text style={[styles.text, styles.subText]}>Driver</Text>
              </View>
            </View>

            <Text style={[styles.subText, styles.recent]}>About Me:</Text>
            <View style={{ alignItems: "center" }}>
              <View style={styles.recentItem}>
                <View style={styles.activityIndicator}></View>
                <View style={{ width: 250 }}>
                  <TextInput
                    value={profileData.bio}
                    onChangeText={(text) => handleInputChange("bio", text)}
                    multiline={true}
                    numberOfLines={2}
                    style={[styles.input, { height: 50, width: 230 }]} // Increased height for multiline input
                  />
                </View>
              </View>

              <Button
                mode="contained"
                onPress={handleSubmit}
                style={styles.button}
              >
                {loading ? "Saving..." : "Save Profile"}{" "}
                {/* Dynamic button text */}
              </Button>
            </View>
          </ScrollView>
        )}
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  text: {
    fontFamily: "HelveticaNeue",
    color: "#52575D",
  },
  image: {
    flex: 1,
    height: undefined,
    width: undefined,
    borderRadius: 40,
    borderColor: "red",
  },
  titleBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
    marginHorizontal: 16,
  },
  subText: {
    fontSize: 12,
    color: "#AEB5BC",
    textTransform: "uppercase",
    fontWeight: "500",
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 4,
    overflow: "hidden",
    borderColor: "black",
  },
  dm: {
    backgroundColor: "#41444B",
    position: "absolute",
    top: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  active: {
    backgroundColor: "#34FFB9",
    position: "absolute",
    bottom: 28,
    left: 10,
    padding: 4,
    height: 20,
    width: 20,
    borderRadius: 10,
  },
  add: {
    backgroundColor: "#41444B",
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  infoContainer: {
    alignSelf: "center",
    alignItems: "center",
    marginTop: 16,
  },
  statsContainer: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 32,
  },
  statsBox: {
    alignItems: "center",
    flex: 1,
  },
  mediaImageContainer: {
    width: 180,
    height: 200,
    borderRadius: 12,
    overflow: "hidden",
    marginHorizontal: 10,
  },
  mediaCount: {
    backgroundColor: "#41444B",
    position: "absolute",
    top: "50%",
    marginTop: -50,
    marginLeft: 30,
    width: 100,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    shadowColor: "rgba(0, 0, 0, 0.38)",
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 20,
    shadowOpacity: 1,
  },
  recent: {
    marginLeft: 78,
    marginTop: 32,
    marginBottom: 6,
    fontSize: 10,
  },
  recentItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  activityIndicator: {
    backgroundColor: "#CABFAB",
    padding: 4,
    height: 12,
    width: 12,
    borderRadius: 6,
    marginTop: 3,
    marginRight: 20,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
  modalView: {
    backgroundColor: "white",
    padding: 20,
    margin: 20,
    borderRadius: 20,
  },
  modalText: {
    marginBottom: 20,
  },
  input: {
    marginHorizontal: 20,
    marginTop: 10,
  },
  button: {
    margin: 20,
  },
  dayContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    marginTop: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
