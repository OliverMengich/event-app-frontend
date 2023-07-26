import { StatusBar } from 'expo-status-bar';
import { StyleSheet,SafeAreaView,Switch, Image, Text, View, Dimensions, Pressable, ImageBackground } from 'react-native';
import Icon  from 'react-native-vector-icons/MaterialCommunityIcons';
import { useQuery } from '@tanstack/react-query';
import { CONSTS } from '../constants';
import { FlatList } from 'react-native-gesture-handler';
import EventItemComponent from '../components/EventItem.component';
const {width, height} = Dimensions.get('window');
// import AnimatedLoader from 'react-native-animated-loader'
export default function SpeakerProfile({route, navigation}) {
    const { speakerId } = route.params;
    const { isLoading, data } = useQuery({
        queryKey: ['speaker', speakerId],
        queryFn: async () =>{
            const response = await fetch(`http://192.168.88.251:3001/speakers/${speakerId}`);
            const data = await response.json();
            console.log('====================================');
            console.log(data);
            console.log('====================================');
            return data;
        },
        networkMode: 'always',
    });
    navigation.setOptions({
        header: ()=>(
            <View style={{flexDirection: 'row', alignItems: 'center',marginTop: 50, justifyContent: 'space-between', }}>
                <Icon name="chevron-left" size={30} color="#262739" onPress={()=>navigation.goBack()} />
                <Text style={{fontSize: 18,  color: '#262739'}}>PROFILE</Text>
                <Text></Text>
            </View>
        ),
    });
    console.log('Speaker found is',speakerId,data);
    if (isLoading){
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Text>Loadiing..</Text>
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
                        uri: data.imageUrl,
                    }}
                />
                <View style={{paddingHorizontal: 10}}>
                    <View style={{marginVertical: 10}}>
                        <Text style={styles.boldText}>{data.name}</Text>
                        <Text style={{alignSelf: 'center'}}>{data.role}</Text>
                        <Text>{data.description}</Text>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Pressable android_ripple={{color:'#f5f5f5'}}  style={styles.butttonStyle}>
                                <Text style={{color: 'white'}}>FOLLOW</Text>
                            </Pressable>
                            <Pressable android_ripple={{color:'#f5f5f5'}}  style={styles.messageButtonStyle}>
                                <Text style={{color: 'black'}}>MESSAGE</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
                <View style={{flexDirection: 'row',paddingHorizontal: 10, alignItems: 'center', width: '100%', justifyContent: 'space-between'}}>
                    <Text style={styles.boldText}>Events</Text>
                    <Pressable android_ripple={{color: '#f5f5f5'}}>
                        <Text style={{color: CONSTS.PRIMARY_COLOR}}>Show All</Text>
                    </Pressable>
                </View>
                <FlatList
                    data={data.event}
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
        width: width *.3,
        marginHorizontal: 15,

    },
    messageButtonStyle:{
        borderRadius: 20,
        paddingVertical: 10,
        alignItems: 'center',
        borderWidth: 2,
        width: width *.3,
        marginHorizontal: 15,
    },
    signInOptionIcon:{backgroundColor:'#fff', borderRadius: 15, padding:5, marginHorizontal:5}
});
