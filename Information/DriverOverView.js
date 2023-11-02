
import{View,Text,StyleSheet, ScrollView,Button}from 'react-native'
function DriverOverView(){
    return (
        <ScrollView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.bio}> Hello , my name is Ali,Im a csun student
                 </Text>
                 <Text style={styles.carDetails}>Car Model: Tesla Model S</Text>
    <Text style={styles.carDetails}>License Plate: ABC-1234</Text>
                 <Text style={styles.scheduleTitle}>Schedule:</Text>
                <Text>Monday: 9am - 5pm</Text>
                <Text>Tuesday: 10am - 6pm</Text>
                <Text>Wednesday: 8am - 4pm</Text>
                <Text>Thursday: 9am - 5pm</Text>
                <Text>Friday: 9am - 5pm</Text>
                <Text>Saturday: Off</Text>
                <Text>Sunday: Off</Text>
                <Button title="Text" onPress={() => console.log('Button Prtessed')}/>


            </View>

        </ScrollView>

    );
};
export default DriverOverView;
const styles = StyleSheet.create({
    DriverOverView:{
        flex: 1,
        padding: 15
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    header: {
        alignItems: 'center',
        padding: 20,
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    driverImage: {
        width: 150,
        height: 150,
        borderRadius: 75,
        marginBottom: 10,
    },
    heartButton: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
    content: {
        padding: 20,
    },
    bio: {
        marginBottom: 20,
    },
    scheduleTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    carDetails: {
        marginBottom: 10,
    },
});
