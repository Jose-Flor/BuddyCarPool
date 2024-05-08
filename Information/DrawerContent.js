
import{StyleSheet, View} from 'react-native'
import {DrawerContentScrollView,DrawerItem}from '@react-navigation/drawer'
import{Avatar,Title,Caption,Paragraph,Drawer,Text,TouchableRipple,Switch } from 'react-native-paper'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAuth } from './Store/AuthContext';

const profileImageUri = '/Users/ali/CARpoolNew490N/BuddyCarPool/assets/johnsample.jpg'; 

function DrawerContent(props){
    const{signOut,user,setuser}=useAuth();
    const handleSignOut = () => {
        Alert.alert(
            "Sign Out",
            "Are you sure you want to sign out?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Yes", onPress: async () => {
                        await signOut();
                        props.navigation.navigate('Register'); // Consider changing this to a 'Login' or 'Welcome' screen
                    }
                }
            ],
            { cancelable: false }
        );
    };

    return(
        <View style={{flex:1}}>
            <DrawerContentScrollView {...props} >
                <View style={style.drawerContent}>
                    <View style={style.userInfoSection}>
                        <View style={{flexDirection:'row',marginTop: 15}}>
                            <Avatar.Image
                                source={{ uri: profileImageUri }}
                                size={60}

                            />
                            <View style={{marginLeft:15, flexDirection:'column'}}>
                                <Title style={style.title}>Ali</Title>
                                <Caption style={style.caption}>@ali</Caption>
                            </View>
                        </View>
                        <View style={style.row}>
                            <View style={style.section}>
                                <Paragraph style={[style.paragraph, style.caption]}>80</Paragraph>
                                <Caption style={style.caption}>Following</Caption>
                            </View>
                            <View style={style.section}>
                                <Paragraph style={[style.paragraph, style.caption]}>100</Paragraph>
                                <Caption style={style.caption}>Followers</Caption>
                            </View>
                            </View>


                       

                    </View>


                </View>

            </DrawerContentScrollView >
            <Drawer.Section style={style.drawerSection}>
                <DrawerItem
                icon={({color,size})=>(
                    <Icon
                    name="comment-quote-outline"
                    color={color}
                    size={size}
                   
                    />

                )}
                label='feed'
                onPress={()=>{props.navigation.navigate('Feeds')}}
                />
            <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="home-outline" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Home"
                            onPress={() => {props.navigation.navigate('Main')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="account-outline" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Profile"
                            onPress={() => {props.navigation.navigate('Profile')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="bookmark-outline" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Bookmarks"
                            onPress={() => {props.navigation.navigate('CarFavoriteScreen')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="cog" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Settings"
                            onPress={() => {props.navigation.navigate('SettingsScreen')}}
                        />
                        


            </Drawer.Section>

            <Drawer.Section style={style.bottomDrawerSection}>
                <DrawerItem 
                icon={(color,size)=>(
                    <Icon
                    name='exit-to-app'
                    color={color}
                    size={40}
                    />
                )}
                label="Sign Out"
               onPress={handleSignOut}

                />
            </Drawer.Section>
        </View>

    );

}
export default DrawerContent;
const style=StyleSheet.create({


    drawerContent: {
        flex: 1,
      },
  

    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    userInfoSection: {
        paddingLeft: 20,
      },
      title: {
        fontSize: 16,
        marginTop: 3,
        fontWeight: 'bold',
      },
      caption: {
        fontSize: 14,
        lineHeight: 14,
      },
      section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
      },
      paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
      },
      row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
      },
      preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
      },
      drawerSection: {
        marginTop: 15,
      },
  
  


})