import React from 'react';
import { View,Text,Image, StyleSheet, Pressable } from 'react-native';
function SpeakerComponent({name,id, jobTitle, image, navigation}) {
    function handlePress(){
        navigation.navigate('SpeakerProfile',{
            speakerId: id,
        });
    }
    return (
        <View style={styles.itemContainer}>
            <Image 
                source={{
                    uri: image,
                }} 
                style={styles.imageStyle}
            />
            <View style={{paddingHorizontal: 10, marginVertical: 1}}>
                <Text style={styles.boldText}>{name}</Text>
                <Text style={styles.normalText}>{jobTitle}</Text>
                <Pressable onPress={handlePress} android_ripple={{color:'#f5f5f5'}} style={styles.buttonStyle}>
                    <Text style={{color: '#fff'}}>View</Text>
                </Pressable>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    itemContainer: {
        backgroundColor: '#fff', 
        width: '100%',
        marginHorizontal:5, 
        borderRadius: 7,
        // , 
        alignItems: 'center'
    },
    boldText:{
        fontWeight: 'bold',
        fontSize: 16,
    },
    normalText:{
        fontSize: 12,
        color: '#666',
        // marginBottom: 10,
    },
    imageStyle:{
        width: '100%', 
        height: 100, 
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    buttonStyle:{
        backgroundColor: '#4285f4', 
        width: 100, 
        alignItems:'center',
        marginBottom: 10, 
        padding: 10,
        borderRadius: 20
    },
});

export default SpeakerComponent;