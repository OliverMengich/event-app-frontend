import { StyleSheet,SafeAreaView,Switch,Alert, Image, Text, View, Dimensions, Pressable, ImageBackground } from 'react-native';
import Icon  from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import { CONSTS } from '../constants';
const {width, height} = Dimensions.get('window');
import { useQueryClient, useQuery, } from '@tanstack/react-query';
import * as ImagePicker from 'expo-image-picker';
export default function ProfileScreen({navigation}) {
    const queryClient = useQueryClient();
    let user;
    user = queryClient.getQueryData(['user']);
    if (user ===undefined) {
        user = queryClient.getQueryData(['register']);
    }
    console.log(user,'Is the user,')
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
    const {isLoading,refetch, error, data} = useQuery({
        enabled: false,
        queryKey: ['imageUpload'],
        queryFn: async ()=>{
            const formData = new FormData();
            formData.append('image', user.image);
            const response = await fetch(CONSTS.BACKEND_URL + '/attendee/upload', {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                body: formData,
            });
            return response.json();
        }
    })
    function handleAlert() {
        Alert.alert(
            'Alert',
            'Do you wish to edit your Profile photo',
            [
                {
                    style:'cancel',
                    text: 'NO!',
                    onPress: ()=>Alert.alert('Cancel Pressed'),
                },
                {
                    text: 'EDIT',
                    onPress: ()=>handleSelectImage(),
                }
            ]
        )
    }
    function handleSelectImage(){
        ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [1,1],
            quality: 1,
        }).then(async(result)=>{
            if (!result.canceled) {
                const formData = new FormData();
                console.log(result.assets[0])
                formData.append('file', {
                    uri: result.assets[0].uri,
                    name: result.assets[0].uri.split('/').pop(),
                    type: 'image/jpeg',
                });
                const response = await fetch(CONSTS.BACKEND_URL + '/attendee/upload', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: 'Bearer ' + user.access_token,
                    },
                    body: formData,
                });
                const response4 = await response.json();
                console.log(response4);
                queryClient.setQueryData(['user'], (oldData)=>({
                    ...oldData,
                    image: result.assets[0].uri,
                }));
                queryClient.setQueryData(['register'], (oldData)=>({
                    ...oldData,
                    image: result.assets[0].uri,
                }));
            }
        });
    }
    return (
        <SafeAreaView style={styles.container}>
            {/* <StatusBar  style='light' /> */}
            <View style={{ width: '100%',alignItems: 'center'}}>
                <View style={{position: 'relative'}}>
                    <Image
                        style={{height: 150, width: 150,borderRadius: 75 }}
                        source={{
                            uri: user.imageUrl,
                        }}
                    />
                    <Pressable onPress={handleAlert} android_ripple={{color: '#f5f5f5'}}>
                        <Icon name='camera' size={30} color='#4285f4' style={{position: 'absolute', bottom: 0, right: 0, backgroundColor: '#fff', borderRadius: 20, padding: 5}} />
                    </Pressable>
                </View>
                <View style={{paddingHorizontal: 10}}>
                    <View style={{marginVertical: 10}}>
                        <Text style={styles.boldText}>{user.name}</Text>
                        <Text style={styles.boldText}></Text>
                        <View style={{flexDirection: 'row',marginVertical: 10, alignItems: 'center'}}>
                            <View style={styles.otherInfor}>
                                <Text style={[styles.boldText,{color: '#f76810'}]}>230K</Text>
                                <Text style={{textTransform: 'uppercase'}}>Followers </Text>
                            </View>
                            <View style={styles.otherInfor}>
                                <Text style={[styles.boldText,{color: '#f76810'}]}>5</Text>
                                <Text style={{textTransform: 'uppercase'}}>Events</Text>
                            </View>
                            <View style={styles.otherInfor}>
                                <Text style={[styles.boldText,{color: '#f76810'}]}>4.5</Text>
                                <Text style={{textTransform: 'uppercase', }}>Rating </Text>
                            </View>
                        </View>
                        <Pressable android_ripple={{color:'#f5f5f5'}}  style={styles.butttonStyle}>
                            <Text style={{color: 'black'}}>Edit Profile</Text>
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
        // backgroundColor: '#4285f4',
        width: width *.5,
        borderWidth: .5,
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
    otherInfor:{
        alignItems: 'center',
        marginHorizontal: 10,
    
    }
});
