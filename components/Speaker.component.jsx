import React from 'react';
import { View,Text,Image, StyleSheet, Pressable } from 'react-native';
function SpeakerComponent(props) {
    return (
        <View style={styles.itemContainer}>
            <Image source={require('../assets/icon.png')} style={{width: 60, height: 60, borderRadius: 20}}/>
            <Text style={styles.boldText}>Oliver Kipkemei</Text>
            <Text style={styles.normalText}>Web Developer @Microsoft</Text>
            <Pressable android_ripple={{color:'#f5f5f5'}}  style={{backgroundColor: '#4285f4', width: '100%',alignItems:'center',marginVertical: 10, paddingVertical: 10}}>
                <Text style={{color: '#fff'}}>View</Text>
            </Pressable>
        </View>
    );
}
const styles = StyleSheet.create({
    itemContainer: {
        backgroundColor: '#fff', 
        width: '100%',
        marginHorizontal:5, 
        borderRadius: 7,
        padding:16, 
        alignItems: 'center'
    },
    boldText:{
        fontWeight: 'bold',
        fontSize: 16,
    },
    normalText:{
        fontSize: 12,
        color: '#666',
        marginBottom: 10,
    }
});

export default SpeakerComponent;