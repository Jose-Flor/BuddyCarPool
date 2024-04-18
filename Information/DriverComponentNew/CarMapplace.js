import { useLayoutEffect,useState } from 'react';
import {Image, SafeAreaView, StyleSheet, Text, View,Alert} from'react-native'
import { colors } from 'react-native-elements';
import { Button, IconButton, Provider,FAB, Portal } from 'react-native-paper';
import PlaceForm from '../Places/PlaceForm';
import * as ImagePicker from 'expo-image-picker';
import MapView, { Marker } from 'react-native-maps';
import { Dimensions } from 'react-native';




function CarMapplace({route,navigation}){
    const [profileImage,setProfileImage]=useState(require('/Users/ali/Documents/CarpoolProject/BuddyCarPool/assets/logo1.jpg'));
    const [carImage, setCarImage] = useState(null);
    const [location, setLocation] = useState(null);
    const [mapVisible, setMapVisible] = useState(false);
    const [state, setState] = useState({ open: false });

    const editeDriverId=route.params?.driverDetails;
    useLayoutEffect(()=>{

        navigation.setOptions({
            title: isEditing?'Edit Information':'Add Information '
        })
    },[navigation,isEditing])

    const isEditing=!!editeDriverId;
    function deleteDriverInformation(){

    }
    function AddDriver(){
        return

    }
    function navigateToAddDriver() {
        navigation.navigate('CarMapplace');  // No parameters needed for adding new
    }
    
    function navigateToEditDriver(driver) {
        navigation.navigate('CarMapplace', { driverDetails: driver });  // Pass existing details for editing
    }
    function handleDriverSubmit() {
        if (isEditing) {
            updateDriver();
        } else {
            saveDriver();
        }
    }
    const saveDriver = () => {
        // Update this function as needed
        if (route.params?.onAddDriver) {
            route.params.onAddDriver({ ...newDriver, location });
            navigation.goBack();
        } else {
            console.error('Add driver callback not provided');
        }
    };
    
        // Call onAddDriver from props passed via navigation
    
    
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setCarImage(result.uri);
        }
    };
    const onStateChange = ({ open }) => setState({ open });

    const toggleMap = () => {
        setMapVisible(!mapVisible);
    };

    const takePhoto = async () => {
        let result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.canceled) {
            setCarImage(result.uri);
        }
    };
    const handleMapSelect = (e) => {
        setLocation(e.nativeEvent.coordinate);
        toggleMap();  // Optionally close the map after selection
        alert(`Location selected: ${e.nativeEvent.coordinate.latitude}, ${e.nativeEvent.coordinate.longitude}`);
    };


    



    return (
        <Provider>
            <SafeAreaView style={styles.container}>
                <Portal>
                    <FAB.Group
                        open={state.open}
                        icon={state.open ? 'close' : 'plus'}
                        actions={[
                            { icon: 'camera', label: 'Take Photo', onPress: () => takePhoto(setCarImage) },
                            { icon: 'image', label: 'Pick Image', onPress: () => pickImage(setCarImage) },
                            { icon: 'map-marker', label: 'Toggle Map', onPress: toggleMap },
                        ]}
                        onStateChange={onStateChange}
                    />
                </Portal>
                <View style={{ alignSelf: "center" }}>
                    <View style={styles.profileImage}>
                        <Image source={profileImage} style={styles.image} resizeMode="cover" />
                    </View>
                    {carImage && (
                        <Image source={{ uri: carImage }} style={styles.carImage} />
                    )}
                    {location && <LocationPicker lat={location.latitude} lng={location.longitude} />}
                    <PlaceForm />
                    <Button
                        mode='contained'
                        onPress={handleDriverSubmit}
                        style={styles.button}>
                        {isEditing ? 'Update Driver' : 'Add Driver'}
                    </Button>

                    {isEditing && (
                        <Button
                            mode='contained'
                            onPress={deleteDriverInformation}
                            style={styles.button}>
                            Delete Driver
                        </Button>
                    )}
                </View>
            </SafeAreaView>
        </Provider>
    );
                    }
                    export default CarMapplace;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#EAE3EA"
    },
    profileImage: {
        width: 200,
        height: 200,
        borderRadius: 100,
        borderWidth: 4,
        borderColor: 'black',
        overflow: 'hidden',
        marginBottom: 10,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    carImage: {
        width: 300,
        height: 200,
        marginBottom: 10,
    },
    button: {
        margin: 30
    },

})
