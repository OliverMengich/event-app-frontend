import React from 'react';
import { View, Text, FlatList, StyleSheet, Pressable } from 'react-native';
import { useQueryClient } from '@tanstack/react-query';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
function NotificationsScreen({navigation, route}) {
    const queryClient = useQueryClient();
    let user;
    user = queryClient.getQueryData(['user']);
    if (user ===undefined) {
        user = queryClient.getQueryData(['register']);
    }
    console.log('Logged in user is: ',user.notifications);
    navigation.setOptions({
        headerTitle: '',
        headerStyle: {
            backgroundColor: '#f9f7f8',
        },
        header: ()=>(
            <View style={{flexDirection: 'row', marginTop:50, alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 10}}>
                <Pressable onPress={()=>navigation.goBack()} android_ripple={{color: '#f5f5f5'}} style={{padding: 10}}>
                    <Icon name="chevron-left" size={25} />
                </Pressable>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>Notifications</Text>
                <Pressable android_ripple={{color: '#f5f5f5'}} style={{padding: 10}}>
                    <Icon name="dots-vertical" size={25} />
                </Pressable>
            </View>
        )
    });

    return (
        <View style={styles.container}>
            <FlatList
                data={user.notifications}
                renderItem={({item}) => (
                        <View>
                            <Pressable android_ripple={{color: '#f5f5f5'}} style={styles.notificationItem}>
                                <View style={[styles.isReadIcon,true? {backgroundColor: '#3867fa',} : {backgroundColor: '#ccc'}]}>
                                </View>
                                <View style={{flexDirection: 'row', width: '90%',alignItems: 'center', justifyContent:'space-between'}}>
                                    <View>
                                        <Text style={{fontSize: 16, maxWidth: 200,}}>{item.message}</Text>
                                        <Text style={{color: '#ccc'}}>{new Date(item.createdAt).toDateString()}</Text>
                                    </View>
                                    <View>
                                        <Pressable android_ripple={{color:'#fff'}}  style={styles.butttonStyle}>
                                            <Text style={{color: '#3867fa',fontWeight: 'bold', }}>Mark as Read</Text>
                                        </Pressable>
                                    </View>
                                </View>
                            </Pressable>
                        </View>
                    )
                }
                keyExtractor={item => item.id}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#f9f7f8',
        paddingHorizontal: 10,
    },
    notificationItem:{
        padding: 10, 
        borderBottomWidth: 1, 
        borderColor: '#ccc',
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
        borderRadius: 3,
    },
    butttonStyle:{
        // backgroundColor: '',
        // paddingVertical: 5,
        borderRadius: 15,
        width: 100,
        alignItems: 'center',
    },
    isReadIcon:{
        borderRadius: 5, 
        marginHorizontal: 20,  
        width: 10, 
        height: 10, 
        alignItems:'center', 
        justifyContent:'center'
    }
})
export default NotificationsScreen;