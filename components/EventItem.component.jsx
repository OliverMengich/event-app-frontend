import React, { useEffect } from 'react';
import { View, Text, Pressable, StyleSheet, Image } from 'react-native';
import Icon  from 'react-native-vector-icons/MaterialCommunityIcons';
const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
import {EVENTS} from '../screens/FavouritesScreen'
function EventItemComponent({handleNavigation,date, ...otherProps}) {
    const {title, description, location, price, id,favourite, image,} = otherProps;
    
    function handleFavorite(){
        // setIsPressed(!isPressed); 
        const event = EVENTS.find((e)=>e.id===id);
        event.favourite= !event.favourite
        console.log(event);
    }
    
    return (
        <View style={styles.rowItem}>
            <Pressable onPress={handleNavigation} android_ripple={{color: '#f5f5f5'}} style={{}}>
            <View style={{position:'relative'}}>
                <Image
                    style={{height: 150, width: '100%',borderTopLeftRadius: 10, borderTopRightRadius: 10}}
                    source={{
                        uri: image,
                    }}
                />
                <View style={{position: 'absolute', top: 5, right: 5}}>
                    <Pressable onPress={handleFavorite} android_ripple={{color: '#f5f5f5'}}  >
                        <Icon size={25} name={favourite?"heart": "heart-outline" } color={favourite ? 'red' : 'white'} />
                    </Pressable>
                </View>
            </View>
            <View style={{padding: 10}}>
                <Text style={styles.normalText}>{date.getDate()+'th '+monthNames[date.getMonth()]+' '+date.getFullYear()}</Text>
                <Text style={styles.boldText}>{title}</Text>
                <View style={{flexDirection: 'row',alignItems: 'center',}}>
                    <Icon size={20} name="map-marker-outline" />
                    <Text style={styles.normalText}>{location}</Text>
                </View>
                <Text style={styles.normalText}>{description.slice(0,22)}...</Text>
                <View style={styles.row}>
                    <Text >Price: {price}</Text>
                    <Pressable android_ripple={{color:'#f5f5f5'}}  style={styles.butttonStyle}>
                        <Text style={{color: 'white'}}>Register</Text>
                    </Pressable>
                </View>
            </View>
            </Pressable>
        </View>
    );
}
const styles = StyleSheet.create({
    row:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    rowItem:{
        backgroundColor: '#fff',
        borderRadius: 10,
        marginVertical: 10,
        // width: '50%',
        // padding: 10,
        marginHorizontal: 5
    },
    boldText:{
        fontWeight: 'bold',
        fontSize: 20,
    },
    normalText:{
        fontWeight: 'normal',
        fontSize: 16,
        marginVertical: 5,
        color: '#262739'
    },
    butttonStyle:{
        backgroundColor: '#4285f4',
        paddingVertical: 5,
        paddingHorizontal: 20,
    },
    addButton:{position: 'absolute', bottom: 30, right: 20, backgroundColor: 'red', borderRadius: 50, padding: 10},
    eventsSection:{
        marginVertical: 10,
        paddingVertical: 1,
    },
    buttonPressed:{
        opacity: 0.6,
    },
})
export default EventItemComponent;