import { StatusBar } from 'expo-status-bar';
import { StyleSheet,SafeAreaView,Switch, Image, Text, View, Dimensions, Pressable, ImageBackground } from 'react-native';
import Icon  from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import { EVENTS } from './FavouritesScreen';
import { CONSTS } from '../constants';
const {width, height} = Dimensions.get('window');
import { useQueryClient } from '@tanstack/react-query';
export default function ProfileScreen({navigation}) {
    const queryClient = useQueryClient();
    let user;
    user = queryClient.getQueryData(['user']);
    if (user ===undefined) {
        user = queryClient.getQueryData(['register']);
    }
    navigation.setOptions({
        header: ()=>(
            <View style={{flexDirection: 'row', alignItems: 'center',height: height*.15, justifyContent: 'space-between', paddingHorizontal: 10}}>
                <Icon name="chevron-left" size={30} color="#262739" onPress={()=>navigation.goBack()} />
                <Text style={{fontSize: 20, fontWeight: 'bold', color: '#262739'}}>Profile</Text>
                <Pressable android_ripple={{color: '#f5f5f5'}} onPress={()=>navigation.navigate('UserSettingScreen')}>
                    <AntDesignIcon name="setting" size={30} color="#262739" />
                </Pressable>
            </View>
        ),

    });
    return (
        <SafeAreaView style={styles.container}>
            {/* <StatusBar  style='light' /> */}
            <View style={{ width: '100%',alignItems: 'center'}}>
                <Image
                    style={{height: 150, width: 150,borderRadius: 75 }}
                    source={{
                        uri: 'https://reactnative.dev/img/tiny_logo.png',
                    }}
                />
                <View style={{paddingHorizontal: 10}}>
                    <View style={{marginVertical: 10}}>
                        <Text style={styles.boldText}>{user.name}</Text>
                        <Text style={styles.boldText}></Text>
                        <Pressable android_ripple={{color:'#f5f5f5'}}  style={styles.butttonStyle}>
                            <Text style={{color: 'white'}}>Edit Profile</Text>
                        </Pressable>
                    </View>
                </View>
                <View style={{paddingHorizontal: 10, flexDirection: 'row',justifyContent: 'space-between',width: '100%', alignItems: 'center'}}>
                    <Text style={styles.boldText}>My Events</Text>
                    <Pressable android_ripple={{color: '#f5f5f5'}}>
                        <Text style={{color: CONSTS.PRIMARY_COLOR}}>Show All</Text>
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f7f8',
        position: 'relative',
        // marginTop: height * .25,
        // paddingHorizontal:10,
        width: '100%',

    },
    tinyLogo:{
        width: width,
        height: height* .40,
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
    },
    boldText:{
        fontWeight: 'bold',
        fontSize: 20,
        color: '#262739',
        alignSelf: 'center',
    },
    butttonStyle:{
        borderRadius: 20,
        paddingVertical: 10,
        alignItems: 'center',
        backgroundColor: '#4285f4',
        width: width *.5,
    },
    detailsRole: {
        flexDirection: 'row',
        borderWidth: 1, 
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderColor: '#888',
        marginVertical: 10,
        borderRadius: 20,
    },
});
