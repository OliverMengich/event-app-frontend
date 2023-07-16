import { StatusBar } from 'expo-status-bar';
import { StyleSheet,SafeAreaView, Image, Text, View, Dimensions, Pressable } from 'react-native';
import Icon  from 'react-native-vector-icons/MaterialCommunityIcons';
const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
const {width, height} = Dimensions.get('window');

const date = new Date();
export default function EventScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar  style='auto' />
            <View style={{ width: '100%'}}>
                <View style={{alignItems: 'center',}}>
                    <View style={{marginVertical: 30,}}>
                        <Image
                            style={styles.tinyLogo}
                            source={{
                                uri: 'https://reactnative.dev/img/tiny_logo.png',
                            }}
                        />
                    </View>
                </View>
                <View style={{alignItems:'flex-start', paddingHorizontal: 10}}>
                    <View >
                        <Text >Event Title</Text>
                        <Text style={styles.boldText}>React Native Event</Text>
                    </View>
                    <View style={styles.row}>
                        <View>
                            <Text style={styles.normalText}>Date</Text>
                            <View style={styles.timContainer}>
                                <Text style={styles.timeText}>{date.getDate()+' '+monthNames[date.getMonth()].slice(0,3)+' '+date.getFullYear()}</Text>
                                <Icon size={20} name="calendar" />
                            </View>
                        </View>
                        <View>
                            <Text style={styles.normalText}>Time</Text>
                            <View style={styles.timContainer}>
                                <Text style={styles.timeText}>{date.getHours()+':'+date.getMinutes()}</Text>
                                <Icon size={20} name="clock-outline" />
                            </View>
                        </View>
                    </View>
                    <View>
                        <Text style={styles.boldText}>Description</Text>
                        <Text>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        </Text>
                    </View>
                    <View>
                        <Text style={styles.boldText}>Speakers</Text>
                        <View style={{flexDirection: 'row', alignItems: 'center',}}>
                            <View style={{backgroundColor: '#fff', margin: 10,}}>
                                <Image
                                    style={{height: 100, width: 100, }}
                                    source={{
                                        uri: 'https://reactnative.dev/img/tiny_logo.png',
                                    }}
                                />
                                <Text>Jane Does</Text>
                                <Text>Speaker</Text>
                            </View>
                            <View style={{backgroundColor: '#fff', margin: 10,}}>
                                <Image
                                    style={{height: 100, width: 100, }}
                                    source={{
                                        uri: 'https://reactnative.dev/img/tiny_logo.png',
                                    }}
                                />
                                <Text>Jane Does</Text>
                                <Text>Speaker</Text>
                            </View>
                        </View>
                    </View>
                    <View>
                        <Text style={styles.boldText}>Location</Text>
                        <Text>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        </Text>

                    </View>
                    <View>
                        <Text style={styles.boldText}>Attendees</Text>
                        <View style={{flexDirection: 'row', alignItems: 'center',}}>
                            <Image
                                style={[styles.userIcons,{left: 5, }]}
                                source={{
                                    uri: 'https://reactnative.dev/img/tiny_logo.png',
                                }}
                            />
                            <Image
                                style={[styles.userIcons,{ left: -15,}]}
                                source={{
                                    uri: 'https://reactnative.dev/img/tiny_logo.png',
                                }}
                            />
                            <Image
                                style={[styles.userIcons,{ left: -35,}]}
                                source={{
                                    uri: 'https://reactnative.dev/img/tiny_logo.png',
                                }}
                            />
                            <Image
                                style={[styles.userIcons,{ left: -55,}]}
                                source={{
                                    uri: 'https://reactnative.dev/img/tiny_logo.png',
                                }}
                            />
                        </View>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f7f8',
        // marginTop: 50,
        paddingHorizontal:10,

    },
    tinyLogo:{
        width: width* .8,
        height: height* .28,
        borderRadius: 10,
    },
    row:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: '80%',
    },
    textInputStyle:{
        height: 40,
        borderColor: 'gray',
        // borderWidth: .5,
        borderRadius: 10,
        paddingHorizontal:10,
        width:'60%',
        backgroundColor: '#fff'
    },
    boldText:{
        fontWeight: 'bold',
        fontSize: 20,
    },
    normalText:{
        fontWeight: 'normal',
        fontSize: 16,
        marginVertical: 5,
        color: '#262739'
    },
    timContainer:{
        flexDirection: 'row', 
        alignItems: 'center', 
        backgroundColor: '#fff',
        padding: 10, 
        borderRadius: 8,
        width: 120,
        justifyContent: 'space-between',
    },
    timeText:{
        
        
    },
    butttonStyle:{
        backgroundColor: '#262739',
        borderRadius: 7,
        paddingVertical: 2,
        paddingHorizontal: 10,
    },
    userIcons:{
        width: 50, 
        height: 50, 
        borderRadius: 25, 
        borderWidth: 2, 
        borderColor: '#fff',
        position: 'relative'
    }
});
