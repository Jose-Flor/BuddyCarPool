
import{Text,StyleSheet, View,Image,FlatList,ActivityIndicator}from 'react-native'
import { fetchAllData } from '../back-end/Http';
import{useState,useEffect}from'react'

function StudentSummary({navigation,route}){
    const userData=route.params?.userData;
    const [studentData, setStudentData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        if (!userData) {
            // Handle the case where userData is not available
            console.error('User data is not available');
            return;
        }
        setIsLoading(true);
        if (userData.role === 'driver') {
            fetchAllData()
                .then((data) => {
                    setStudentData(data.students);
                    setIsLoading(false);
                })
                .catch((error) => {
                    console.error('Error fetching student data:', error);
                    setIsLoading(false);
                });
        } else {
            setIsLoading(false);
        }
    }, [userData]);

  
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.UserInfo}>
       
        <View style={styles.UserInfoText}>
          <Text style={styles.UserName}>{item.firstName} {item.lastName}</Text>
          {/* Additional student info we going to put it here in futreeeee */}
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={studentData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()} // Assuming each student has a unique id
        />
      )}
    </View>
  );
};
export default StudentSummary;
const styles =StyleSheet.create({
    container:{
        flex:1,
       // justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'#FFFF',
        padding:20,
        
    
    },
    card:{
        backgroundColor:'#f8f8f8',
        width:'100%',
        marginBottom: 10,
        borderRadius:10,
        
    },
    UserInfo:{
        flexDirection:'row',
        justifyContent: 'center',
        padding:15
    },
    userImage:{
        width: 50,
        height:50,
        borderRadius:25



    },
    UserName:{
        fontSize:14,
        fontWeight:'bold',
        
    },
    onlineTime:{
        fontSize:12,
        color:'#666'
    },
    UserInfoText:{
        flexDirection:'column',
        justifyContent: 'center',
       

    },
    postText:{
        fontSize:12,
        marginRight:10
        
    }
    


})