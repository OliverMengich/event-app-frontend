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
            <Text style={styles.boldText}>{name}</Text>
            <Text style={styles.normalText}>{jobTitle}</Text>
            <Pressable onPress={handlePress} android_ripple={{color:'#f5f5f5'}} style={styles.buttonStyle}>
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
    },
    imageStyle:{
        width: 60, 
        height: 60, 
        borderRadius: 20
    },
    buttonStyle:{
        backgroundColor: '#4285f4', 
        width: '100%', 
        alignItems:'center',
        marginVertical: 10, 
        paddingVertical: 10
    },
});

export default SpeakerComponent;