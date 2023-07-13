import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet,SafeAreaView,} from 'react-native';
import { createNativeStackNavigator} from '@react-navigation/native-stack'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen'
import RegistrationScreen from './screens/RegistrationScreen';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator()

function DrawerNavigator(){
    return(
        <Drawer.Navigator>
            <Drawer.Screen name='Home' component={HomeScreen}/>
        </Drawer.Navigator>
    )
}
export default function App() {
    return (
        <>
            <StatusBar backgroundColor='#f9f7f8' style='auto' />
            <NavigationContainer>
                <SafeAreaView style={styles.container}>
                    {/* <Text style={styles.boldText}>Register</Text> */}
                    <Stack.Navigator 
                        screenOptions={{
                            headerStyle:{
                                backgroundColor: '#f9f7f8'
                            },
                        }}
                        >
                        {/* <Stack.Screen
                            name='Home Screen'
                            component={HomeScreen}
                            options={{
                                headerRight: ()=>(<Icon size={25} name="bell-outline" />),
                                headerLeft:()=>( <Icon size={25} name="menu" />),
                                title:''
                            }}
                        /> */}
                        <Stack.Screen
                            name='Home Screen'
                            component={DrawerNavigator}
                        />
                        <Stack.Screen
                            name='Login'
                            component={LoginScreen}
                        />
                        <Stack.Screen 
                            name='Join Us'
                            component={RegistrationScreen}
                        />
                    </Stack.Navigator>
                </SafeAreaView>
            </NavigationContainer>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f7f8',
        // marginTop: 50,
        paddingHorizontal:10,
        
    },
});
