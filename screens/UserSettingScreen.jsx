import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
function UserSettingScreen({navigation}) {
    navigation.setOptions({
        header: ()=>(
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 10}}>
                <Icon name="menu" size={30} color="#262739" onPress={()=>navigation.goBack()} />
                <Text style={{fontSize: 20, fontWeight: 'bold', color: '#262739'}}>Settings</Text>
                <Text></Text>
            </View>
        ),
    });
    return (
        <View style={styles.container}>
            
            <View style={styles.detailsRole}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Icon name="bell" size={20} color="#262739" />
                    <Text>Language</Text>
                </View>
                <Text>English</Text>
            </View>
            <View style={styles.detailsRole}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Icon name="bell" size={20} color="#262739" />
                    <Text>Notifications</Text>
                </View>
                <Switch  />
            </View>
            <View style={styles.detailsRole}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Icon name="bell" size={20} color="#262739" />
                    <Text>Location</Text>
                </View>
                <Switch  />
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
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
})
export default UserSettingScreen;