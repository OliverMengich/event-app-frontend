import { StatusBar } from 'expo-status-bar';
import { StyleSheet,SafeAreaView,Dimensions, Text, View, Pressable, TextInput } from 'react-native';
import Icon  from 'react-native-vector-icons/MaterialCommunityIcons';
import { useQuery, } from '@tanstack/react-query';
import React,{useState} from 'react';
import axios from 'axios';
import { CONSTS } from '../constants';
const {width, height} = Dimensions.get('window');
export default function LoginScreen({navigation}) {
    const [loginData, setLoginData] = useState({
        email: '',
        password: '',
    });
    const { refetch, data} = useQuery({
        queryKey: ['user'],
        queryFn: async ()=> {
            console.log('Sending connection login')
            try {
                const response = await axios.post(`${CONSTS.BACKEND_URL}/auth/login`, {
                    email: loginData.email,
                    password: loginData.password,
                });
                console.log(response.data);
                
                return response.data;
            } catch (error) {
                console.log('Error encountered: ', error);
            }
        },
        enabled: false,
        networkMode: 'offline',
    })
    const handleTextChange = (key,value) => {
        console.log(key,value);
        setLoginData({
            ...loginData,
            [ key ]: value,
        });
    }
    function handleNavigation(){
        navigation.navigate('Registration');
    }
    function handleLogin(){
        console.log('Logging in');
        console.log(loginData);
        refetch();
    }
    if (data !== undefined) {
        console.log('Data',data);
        navigation.navigate('Home',{
            ...data
        });
    }
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar  style='auto' />
            <View style={{width: '100%',backgroundColor: '#f9f7f8', alignItems:'center'}}>
                <View style={{width:'100%'}}>
                    <Text>Email</Text>
                    <TextInput 
                        keyboardType='email-address' 
                        onChangeText={(text)=>handleTextChange('email',text)} 
                        style={styles.textInputStyle} 
                        placeholder='Enter Your Name'
                        value={loginData.email}
                    />
                </View> 
                <View style={{width:'100%'}}>
                    <Text>Password</Text>
                    <TextInput 
                        keyboardType='visible-password'
                        onChangeText={(text)=>handleTextChange('password',text)} 
                        style={styles.textInputStyle} 
                        placeholder='Enter Your Password'
                        value={loginData.password}
                    />
                </View>    
                <Pressable onPress={handleLogin} style={styles.buttonStyle}>
                    <Text style={styles.textcolor}>LOGIN</Text>
                </Pressable>
                <Pressable>
                    <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                </Pressable>
                <View style={{flexDirection: 'row'}}>
                    <Icon size={25} name="google" style={styles.signInOptionIcon} color={'#4285f4'} />
                    <Icon size={25} name="twitter" style={styles.signInOptionIcon} color={'#24a3f1'} />
                    <Icon size={25} name="instagram"  style={styles.signInOptionIcon} color={'#f76810'} />
                    <Icon size={25} name="linkedin" style={styles.signInOptionIcon} color={'#24a3f1'} />
                </View>
                <Pressable android_ripple={{color: '#f5f5f5'}} onPress={handleNavigation} >
                    <Text style={styles.forgotPasswordText}>Don't have an account? Create one.</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f7f8',
        paddingHorizontal:10,
        marginTop: height*0.4,
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    textInputStyle: {
        height: 40,
        borderColor: 'gray',
        borderBottomWidth: 1,
        width: '100%',
        paddingHorizontal: 10,
        marginVertical: 10,
    },
    buttonStyle:{
        backgroundColor: '#ef544f',
        paddingVertical: 10,
        borderRadius: 25,
        width: '40%',
        alignItems: 'center',
        marginVertical: 10,
        justifyContent: 'center',
    },
    textcolor:{
        color: '#fff',
        alignSelf: 'center',
    },
    forgotPasswordText:{
        color: '#7597ce',
        alignSelf: 'center',
        marginVertical: 10,
    },
    signInOptionIcon:{backgroundColor:'#fff', borderRadius: 15, padding:5, marginHorizontal:5}
});
