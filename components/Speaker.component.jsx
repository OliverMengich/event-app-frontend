import React from 'react';
import { View,Text,Image, StyleSheet, Pressable } from 'react-native';
function SpeakerComponent(props) {
    return (
        <View style={styles.itemContainer}>
            <Image source={require('../assets/icon.png')} style={{width: 60, height: 60, borderRadius: 20}}/>
            <Text style={styles.boldText}>Speaker</Text>
            <Text style={styles.normalText}>Web Developer @Microsoft</Text>
            <Pressable android_ripple={{color:'#f5f5f5'}}  style={{backgroundColor: '#4285f4', width: '100%',alignItems:'center', paddingVertical: 10}}>
                <Text style={{color: '#fff'}}>Hello</Text>
            </Pressable>
        </View>
    );
}
const styles = StyleSheet.create({
    itemContainer: {backgroundColor: '#fff', width: '40%',marginHorizontal:5, borderRadius: 4,paddingVertical:6, alignItems: 'center'},
    boldText:{
        fontWeight: 'bold',
        fontSize: 20,
    },
    normalText:{
        fontSize: 10,
        color: '#666',
    }
});

export default SpeakerComponent;