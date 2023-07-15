import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import Icon  from 'react-native-vector-icons/MaterialCommunityIcons';
const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
const date = new Date();
function EventItemComponent(props) {
    return (
        <View style={styles.rowItem}>
            <Text style={styles.normalText}>{date.getDate()+'th '+monthNames[date.getMonth()]+' '+date.getFullYear()}</Text>
            <Text style={styles.boldText}>React Native Event</Text>
            <View style={{flexDirection: 'row',alignItems: 'center',}}>
                <Icon size={20} name="map-marker-outline" />
                <Text style={styles.normalText}>Strathmore, Main Hall</Text>
            </View>
            <Text style={{backgroundColor:'#90EE90', color:'#fff',fontWeight:'bold', paddingVertical:5, width:40}}>FREE</Text>
            <View style={styles.row}>
                <Icon size={25} name="heart" color={'red'} />
                <Pressable style={styles.butttonStyle}>
                    <Text style={{color: 'white'}}>Register</Text>
                </Pressable>
            </View>
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
        // width: '60%',
        padding: 10,
        marginHorizontal: 10
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
        backgroundColor: '#262739',
        borderRadius: 7,
        paddingVertical: 2,
        paddingHorizontal: 10,
    },
    addButton:{position: 'absolute', bottom: 30, right: 20, backgroundColor: 'red', borderRadius: 50, padding: 10},
    eventsSection:{
        marginVertical: 10,
        paddingVertical: 1,
    }
})
export default EventItemComponent;