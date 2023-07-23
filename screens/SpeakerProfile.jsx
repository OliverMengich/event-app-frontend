import { StatusBar } from 'expo-status-bar';
import { StyleSheet,SafeAreaView,Switch, Image, Text, View, Dimensions, Pressable, ImageBackground } from 'react-native';
import Icon  from 'react-native-vector-icons/MaterialCommunityIcons';
import { useQuery } from '@tanstack/react-query';
import { CONSTS } from '../constants';
import { FlatList } from 'react-native-gesture-handler';
import EventItemComponent from '../components/EventItem.component';
const {width, height} = Dimensions.get('window');
// import AnimatedLoader from 'react-native-animated-loader'
export default function SpeakerProfile({route}) {
    const { speakerId } = route.params;
    const { isLoading, data } = useQuery({
        queryKey: ['speaker', speakerId],
        queryFn: async () =>{
            const response = await fetch(`http://localhost:3000/speakers/${speakerId}`);
            const data = await response.json();
            return data.results[0];
        },
        networkMode: 'always',
    });
    console.log(data);
    if (isLoading){
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <AnimatedLoader
                    visible={true}
                    overlayColor="rgba(255,255,255,0.75)"
                    animationStyle={{width: 100, height: 100}}
                    speed={1}
                    
                >
                    <Text>Loadiing..</Text>
                </AnimatedLoader>
            </View>
        )
    }
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
                        <Text style={{alignSelf: 'center'}}>{data.name}</Text>
                        <Text style={styles.boldText}>{data.role}</Text>
                        <Text>{data.description}</Text>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Pressable android_ripple={{color:'#f5f5f5'}}  style={styles.butttonStyle}>
                                <Text style={{color: 'white'}}>FOLLOW</Text>
                            </Pressable>
                            <Pressable android_ripple={{color:'#f5f5f5'}}  style={styles.messageButtonStyle}>
                                <Text style={{color: 'white'}}>MESSAGE</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={styles.boldText}>Events</Text>
                    <Pressable android_ripple={{color: '#f5f5f5'}}>
                        <Text style={{color: CONSTS.PRIMARY_COLOR}}>Show All</Text>
                    </Pressable>
                </View>
                <FlatList
                    data={data.events}
                    renderItem={({item}) => (
                        <EventItemComponent
                            date={item.date}
                            handleNavigation={()=>{}}
                            title={item.title}
                            description={item.description}
                            id={item.id}
                            location={item.location}
                            price={item.price}
                            image={item.image}
                        />
                    )}
                    keyExtractor={item => item.id}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    style={{marginVertical: 10}}
                />
                <View>
                    <Text>Socials</Text>
                    <View style={styles.row}>
                        <Pressable style={styles.signInOptionIcon} android_ripple={{color: '#f5f5f5'}}>
                            <Icon color={CONSTS.PRIMARY_COLOR} size={25} name="facebook" />
                        </Pressable>
                        <Pressable style={styles.signInOptionIcon} android_ripple={{color: '#f5f5f5'}}>
                            <Icon color={CONSTS.PRIMARY_COLOR} size={25} name="twitter" />
                        </Pressable>
                        <Pressable style={styles.signInOptionIcon} android_ripple={{color: '#f5f5f5'}}>
                            <Icon color={CONSTS.PRIMARY_COLOR} size={25} name="instagram" />
                        </Pressable>
                        <Pressable style={styles.signInOptionIcon} android_ripple={{color: '#f5f5f5'}}>
                            <Icon color={CONSTS.PRIMARY_COLOR} size={25} name="linkedin" />
                        </Pressable>
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
    messageButtonStyle:{
        borderRadius: 20,
        paddingVertical: 10,
        alignItems: 'center',
        borderWidth: 1,
        backgroundColor: '#4285f4',
        width: width *.5,
    },
    signInOptionIcon:{backgroundColor:'#fff', borderRadius: 15, padding:5, marginHorizontal:5}
});
