import { StatusBar } from 'expo-status-bar';
import { StyleSheet,SafeAreaView, Image, Text, View, Dimensions, Pressable, TextInput } from 'react-native';
import Icon  from 'react-native-vector-icons/MaterialCommunityIcons';

export default function RegistrationScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar  style='auto' />
            <Text style={styles.boldText}>Register</Text>
            <View style={{width: '100%', alignItems:'center'}}>
                <View style={{width:'100%'}}>
                    <Text>Email</Text>
                    <TextInput keyboardType='email-address' style={styles.textInputStyle} placeholder='Enter Your email'/>
                </View> 
                <View style={{width:'100%'}}>
                    <Text>Name</Text>
                    <TextInput style={styles.textInputStyle} placeholder='Enter Your Name'/>
                </View> 
                <View style={{width:'100%'}}>
                    <Text>Password</Text>
                    <TextInput style={styles.textInputStyle} placeholder='Enter Your Password'/>
                </View>
                <View style={{width:'100%'}}>
                    <Text>Confirm Password</Text>
                    <TextInput style={styles.textInputStyle} placeholder='Retype Your Password'/>
                </View>    
                <Pressable style={styles.buttonStyle}>
                    <Text style={styles.textcolor}>REGISTER</Text>
                </Pressable>
                
                <View style={{flexDirection: 'row'}}>
                    <Icon size={25} name="google" style={styles.signInOptionIcon} color={'#4285f4'} />
                    <Icon size={25} name="twitter" style={styles.signInOptionIcon} color={'#24a3f1'} />
                    <Icon size={25} name="instagram"  style={styles.signInOptionIcon} color={'#f76810'} />
                    <Icon size={25} name="linkedin" style={styles.signInOptionIcon} color={'#24a3f1'} />

                </View>
                <Pressable>
                    <Text style={styles.forgotPasswordText}>Already have an account? Login.</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f7f8',
        marginTop: 50,
        paddingHorizontal:10,
        alignItems: 'center',
        justifyContent: 'center',
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
    boldText:{
        fontWeight: 'bold',
        fontSize: 20,
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
