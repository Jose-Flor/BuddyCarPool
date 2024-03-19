import{Text,StyleSheet,View} from 'react-native';
import React,{useEffect,useState} from 'react';
import { fetchUserData } from '../back-end/Http';


function StudentProfile({ route }) {
    
    const { userId } = route.params.userData; // Assuming navigation with parameters
    const [profileData, setProfileData] = useState(null);

    useEffect(() => {
        const loadUserData = async () => {
            try {
                const data = await fetchUserData(userId); // Adjust according to how you retrieve user data
                setProfileData(data);
            } catch (error) {
                console.error('Failed to fetch user data:', error);
            }
        };

        loadUserData();
    }, [userId]);
  
    // If profileData is null, display a loading message
    if (!profileData) {
        return (
          <View style={styles.container}>
            <Text style={styles.container}>Loading...</Text>
          </View>
        );
      }
    // Render the profile with the retrieved user data
    return (
      <Text style={styles.container}>
        Welcome, {profileData.firstName}
      </Text>
    );
  }
export default StudentProfile;
const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'#FFFF',
        padding:20,
        
    
    }
})
