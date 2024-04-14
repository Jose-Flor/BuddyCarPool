import { Pressable, View, Text, StyleSheet } from 'react-native';

function CategoryGridTile({ title, color, onPress }) {
    return (
        <View style={styles.container}>
            <Pressable
                style={[styles.button, { backgroundColor: color }]}
                onPress={onPress}>
                <View>
                    <Text style={styles.buttonText}>{title}</Text>
                </View>
            </Pressable>
        </View>
    );
}

export default CategoryGridTile;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginBottom: 10,
    },
    button: {
        borderWidth: 3,
        marginBottom: 30, 
        width: 300, 
        height: 80, 
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        borderRadius: 8,
    },
    buttonText: {
        textAlign: 'center',
        padding: 20,
        color: '#333333',
        fontSize: 20, 
        fontFamily: 'Helvetica',
    },
});
