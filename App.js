import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet,SafeAreaView,View,Image,Dimensions, Text, Pressable} from 'react-native';
import { createNativeStackNavigator,} from '@react-navigation/native-stack'
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList} from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegistrationScreen from './screens/RegistrationScreen';
import FavouritesScreen from './screens/FavouritesScreen';
import EventScreen from './screens/EventScreen';
import EventsScreen from './screens/EventsScreen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import ProfileScreen from './screens/ProfileScreen';
import SpeakerProfile from './screens/SpeakerProfile';
import { QueryClient, QueryClientProvider, useQueryClient } from '@tanstack/react-query';
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator()

const { height } = Dimensions.get('window');
function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
  
function CustomDrawerContainer(props){
    const handleNavigation = ()=>{
        props.navigation.navigate('Profile')
    }
    console.log('Props.data: ', props.data.name)
    console.log(JSON.stringify(props.data).name)
    const {name,role, image} = (props.data);
    return(
        <DrawerContentScrollView contentContainerStyle={styles.viewNest} {...props}>
            <View style={{alignItems:'center',  borderBottomWidth: 1}}>
                <View style={{flexDirection:'row', alignItems:'center'}}>
                    <Image 
                        source={{
                            uri: image
                        }}
                        style={styles.imageStyle}
                    />
                    <View>
                        <Text style={{color:'#000',fontWeight:'bold', fontSize: 18}}>{capitalizeFirstLetter(name)}</Text>
                        <Text style={{color:'blue', fontSize: 15}}>{role}</Text>
                    </View>
                </View>
                <View style={{flexDirection: 'row',marginVertical:10}}>
                    <View style={{marginHorizontal: 8}}>
                        <Icon size={25} name="wechat" style={styles.signInOptionIcon} color={'#4285f4'} />
                        <Text style={{color:'#000', fontSize: 11}}>Chat</Text>
                    </View>
                    <View style={{marginHorizontal: 8}}>
                        <Icon size={25} name="bookmark-outline" style={styles.signInOptionIcon} color={'#f76810'} />
                        <Text style={{color:'#000', fontSize: 11}}>Bookmarks</Text>
                    </View>
                    <Pressable onPress={handleNavigation} style={{marginHorizontal: 8}}>
                        <Icon size={25} name="account" style={styles.signInOptionIcon} color={'#90EE90'} />
                        <Text style={{color:'#000', fontSize: 11}}>Account</Text>
                    </Pressable>
                </View>
            </View>
            <View style={{marginTop: height *.1}}>
                <DrawerItemList {...props}/>
            </View>
            <Pressable onPress={()=>props.navigation.navigate('Login')} style={{position: 'absolute',flexDirection: 'row', paddingVertical: 10, bottom: 0,width: '100%',alignItems: 'center', backgroundColor: '#4285f4'}}>
                <Icon size={25} name="bookmark-outline" color={'#fff'} />
                <Text>Logout</Text>
            </Pressable>
        </DrawerContentScrollView>
    )
}
function DrawerNavigator({route}){
    console.log('router parameters are: ',route.params)
    return(
        <Drawer.Navigator
            screenOptions={{
                headerStyle:{
                    backgroundColor: '#f9f7f8'
                },
                drawerStyle:{
                    backgroundColor: '#f9f7f8',
                    width: 300,
                },
            }}
            drawerContent={props => <CustomDrawerContainer data={route.params} {...props} />}
            >
            <Drawer.Screen 
                name='HomeScreen' 
                component={HomeScreen}
                options={{
                    headerRight: ()=>(
                        <View style={{flexDirection: 'row', marginRight: 10}}>
                            <Icon size={25} name="cart-variant" />
                            <View style={{marginLeft: 5}}>
                                <Icon size={25} name="bell-outline" />
                                <View style={{position:'absolute', top: -5, right: -5, backgroundColor: 'red', borderRadius: 10, width: 20, height: 20, alignItems:'center', justifyContent:'center'}}>
                                    <Text style={{color:'#fff', fontSize: 10}}>2</Text>
                                </View>
                            </View>
                        </View>
                    ),
                    drawerIcon:()=>(<Icon size={25} name="home-outline" />),
                    headerStyle:{
                        backgroundColor: '#f9f7f8'
                    },
                    title:'Home',
                    headerTitle:''
                }}
            />
            <Drawer.Screen 
                name='Favourites' 
                component={FavouritesScreen}
                options={{
                    headerRight: ()=>(
                        <View style={{marginRight: 10}}> 
                            <View style={{marginLeft: 5}}>
                                <Icon size={25} name="bell-outline" />
                                <View style={{position:'absolute', top: -5, right: -5, backgroundColor: 'red', borderRadius: 10, width: 20, height: 20, alignItems:'center', justifyContent:'center'}}>
                                    <Text style={{color:'#fff', fontSize: 10}}>2</Text>
                                </View>
                            </View>
                        </View>
                    ),
                    drawerIcon:()=>(<Icon size={25} name="home-outline" />),
                    headerStyle:{
                        backgroundColor: '#f9f7f8'
                    },
                    title:'Favourites',
                    headerTitle:''
                }}
            />
            <Drawer.Screen 
                name='Events' 
                component={EventsScreen}
                options={{
                    headerRight: ()=>(
                        <View style={{marginRight: 10}}> 
                            <View style={{marginLeft: 5}}>
                                <Icon size={25} name="bell-outline" />
                                <View style={{position:'absolute', top: -5, right: -5, backgroundColor: 'red', borderRadius: 10, width: 20, height: 20, alignItems:'center', justifyContent:'center'}}>
                                    <Text style={{color:'#fff', fontSize: 10}}>2</Text>
                                </View>
                            </View>
                        </View>
                    ),
                    drawerIcon:()=>(<Icon size={25} name="home-outline" />),
                    headerStyle:{
                        backgroundColor: '#f9f7f8'
                    },
                    title:'All Events',
                    headerTitle:''
                }}
            />
        </Drawer.Navigator>
    )
}
const queryClient = new QueryClient()
export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <StatusBar backgroundColor='#f9f7f8' style='auto' />
            <NavigationContainer>
                <SafeAreaView style={styles.container}>
                    {/* <Text style={styles.boldText}>Register</Text> */}
                    <Stack.Navigator  
                        screenOptions={{
                            headerStyle: {
                                backgroundColor: '#f9f7f8'
                            },
                        }}
                        >
                            <Stack.Screen
                                name='Login'
                                component={LoginScreen}
                                options={{
                                    headerShown: false
                                }}
                            />
                            <Stack.Screen
                                name='Home'
                                component={DrawerNavigator}
                                options={{
                                    title:'',
                                    headerShown:false
                                }}
                            />
                            <Stack.Screen 
                                name='Registration'
                                component={RegistrationScreen}
                                options={{
                                    headerShown:false,
                                }}
                            />
                            <Stack.Screen
                                name='EventDetails'
                                component={EventScreen}
                                options={{
                                    headerRight: ()=>(<Icon size={25} name="dots-vertical" />),
                                    headerTitle:'',
                                    headerStyle:{
                                        backgroundColor: '#f9f7f8'
                                    },
                                    // change back navigation icon
                                    headerLeft: ()=>(<Icon size={25} name="chevron-left" />),
                                }}
                            />
                            
                            <Stack.Screen
                                name='Profile'
                                component={ProfileScreen}
                            />
                    </Stack.Navigator>
                </SafeAreaView>
            </NavigationContainer>
        </QueryClientProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f7f8',
        
    },
    viewNest:{
        // alignItems:'center',
        // justifyContent:'center',
        marginTop:30,
        position: 'relative',
        height: height,
    },
    signInOptionIcon:{
        backgroundColor:'#fff', 
        borderRadius: 15, 
        padding:5, 
        marginHorizontal:5
    },
    imageStyle: {
        width: 60, 
        height: 60, 
        borderRadius: 20
    }
});
