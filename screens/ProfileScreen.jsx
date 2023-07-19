import { StatusBar } from 'expo-status-bar';
import { StyleSheet,SafeAreaView,Switch, Image, Text, View, Dimensions, Pressable, ImageBackground } from 'react-native';
import Icon  from 'react-native-vector-icons/MaterialCommunityIcons';
import { EVENTS } from './FavouritesScreen';

const {width, height} = Dimensions.get('window');

export default function ProfileScreen() {
    
    return (
        <SafeAreaView style={styles.container}>
            {/* <StatusBar  style='light' /> */}
            <View style={{ width: '100%',alignItems: 'center'}}>
                <Image
                    style={{height: 100, width: 100,borderRadius: 50 }}
                    source={{
                        uri: 'https://reactnative.dev/img/tiny_logo.png',
                    }}
                />
                <View style={{paddingHorizontal: 10}}>
                    <View style={{marginVertical: 10}}>
                        <Text style={{alignSelf: 'center'}}>Oliver Kipkemei</Text>
                        <Text style={styles.boldText}></Text>
                        <Pressable android_ripple={{color:'#f5f5f5'}}  style={styles.butttonStyle}>
                            <Text style={{color: 'white'}}>Edit Profile</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
            <View style={{width: '80%'}}>
                <View style={styles.detailsRole}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Icon name="account" size={20} color="#262739" />
                        <Text>Edit Profile</Text>
                    </View>
                    <Icon name="chevron-right" size={20} color="#262739" />
                </View>
                <View style={styles.detailsRole}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Icon name="account" size={20} color="#262739" />
                        <Text>My Events</Text>
                    </View>
                    <Icon name="chevron-right" size={20} color="#262739" />
                </View>
                <View style={styles.detailsRole}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Icon name="account" size={20} color="#262739" />
                        <Text>Feedback</Text>
                    </View>
                    <Icon name="chevron-right" size={20} color="#262739" />
                </View>
                <View style={styles.detailsRole}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Icon name="bell" size={20} color="#262739" />
                        
                        <Text>Notifications</Text>
                    </View>
                    <Switch  />
                    {/* <Icon name="chevron-right" size={20} color="#262739" /> */}
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#f9f7f8',
        position: 'relative',
        // marginTop: height * .25,
        // paddingHorizontal:10,
        width: '100%',
        alignItems: 'center'

    },
    tinyLogo:{
        width: width,
        height: height* .40,
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
    },
    row:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: '80%',
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
