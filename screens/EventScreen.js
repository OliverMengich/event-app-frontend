import { StatusBar } from 'expo-status-bar';
import { useLayoutEffect,} from 'react';
import { StyleSheet,SafeAreaView, Image, Text, View, Dimensions, Pressable, ImageBackground } from 'react-native';
import Icon  from 'react-native-vector-icons/MaterialCommunityIcons';
import { EVENTS } from './FavouritesScreen';
const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
const {width, height} = Dimensions.get('window');

export default function EventScreen({route, navigation}) {
    const eventId = route.params.eventId;
    const event = EVENTS.find((ev)=>ev.id===eventId)
    const date = new Date(event.date);
    useLayoutEffect(() => {
        const event = EVENTS.find((ev)=>ev.id===eventId)
        console.log('Event ID is: ',event);
        navigation.setOptions({
            header: ()=> (
                <View >
                    <ImageBackground
                        imageStyle={styles.tinyLogo}
                        source={{
                            uri: event.image,
                        }}
                   >
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, marginVertical: 20,}}>
                            <Pressable style={{marginVertical: 30}} onPress={() => navigation.goBack()}>
                                <Icon style={{backgroundColor: '#fff', borderRadius: 15}} name="chevron-left" size={30} color="#262739" />
                            </Pressable>
                            <View style={{flexDirection: 'row', marginVertical: 30}}>
                                <Icon name="heart-outline" size={20} color="red" />
                                <Pressable onPress={() => navigation.navigate('EditEvent')}>
                                    <Icon name="dots-vertical" size={20} color="#fff" />
                                </Pressable>
                            </View>
                        </View>
                   </ImageBackground>
                </View>
            )

        });
    }, [navigation]);
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar  style='light' />
            <View style={{ width: '100%'}}>
                <View style={{alignItems:'flex-start',paddingHorizontal: 10}}>
                    <View style={{marginVertical: 10}}>
                        <Text >Event Title</Text>
                        <Text style={styles.boldText}>{event.title}</Text>
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
                    <View style={{marginVertical: 10}}>
                        <Text style={styles.boldText}>Description</Text>
                        <Text>
                            {event.description}
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
                            {event.location}
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
            <View style={styles.footer}>
                <View >
                    <Text style={{fontWeight: 'bold', }}>Price</Text>
                    <Text style={{fontWeight: 'bold', fontSize: 20,}}>{event.price} KES</Text>
                </View>
                <Pressable android_ripple={{color: '#fff',}} style={styles.registerbutton}>
                    <Text style={{fontWeight: 'bold', color: '#fff', textTransform: 'uppercase'}}>Register</Text>
                </Pressable> 
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#f9f7f8',
        position: 'relative',
        marginTop: height * .25,
        // paddingHorizontal:10,

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
        color: '#262739'
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
    },
    footer:{
        position: 'absolute', 
        bottom: 0, 
        width: '100%', 
        backgroundColor: '#fff',
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    registerbutton:{
        backgroundColor: 'red',
        paddingVertical: 12,
        paddingHorizontal: 10,
        width: width*.5,
        alignItems: 'center',
        borderRadius: 10,
    }
});
