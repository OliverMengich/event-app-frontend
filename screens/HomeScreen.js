import React from 'react';
import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native';
import Icon  from 'react-native-vector-icons/MaterialCommunityIcons';
const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
const date = new Date();
export default function HomeScreen(props) {
    return (
        <View style={styles.container}>
            {/* <View style={{flexDirection: 'row',width:'100%', justifyContent:'space-between', paddingHorizontal:10}}>
                <Icon size={25} name="menu" />
                <Icon size={25} name="bell-outline" />
            </View> */}
            <View style={{marginVertical: 60}}>
                <Text style={styles.boldText}>Find Trending events</Text>
                <View style={[styles.rowContainer,{marginTop:30}]}>
                    <TextInput style={styles.textInputStyle} placeholder="Search" />
                    <Icon size={25} name="filter-variant-remove" />
                </View>
            </View>
            <View>
                <View style={styles.rowContainer}>
                    <Text style={styles.boldText}>Popular Events</Text>
                    <Icon size={25} name="dots-horizontal" />
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View style={styles.rowItem}>
                        <Text style={styles.normalText}>{date.getDate()+'th '+monthNames[date.getMonth()]+' '+date.getFullYear()}</Text>
                        <Text style={styles.boldText}>React Native Event</Text>
                        <View style={{flexDirection: 'row',alignItems: 'center',}}>
                            <Icon size={20} name="map-marker-outline" />
                            <Text style={styles.normalText}>Strathmore, Main Hall</Text>
                        </View>
                        <View style={styles.row}>
                            <Icon size={25} name="heart" color={'red'} />
                            <Pressable style={styles.butttonStyle}>
                                <Text style={{color: 'white'}}>Register</Text>
                            </Pressable>
                        </View>
                    </View>
                    
                </View>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f7f8',
        paddingHorizontal:10,

    },
    rowContainer: {
        flexDirection: 'row',
        width:'100%', 
        justifyContent:'space-between', 
        // paddingHorizontal: 20,
        alignItems:'center',
    },
    row:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    rowItem:{
        backgroundColor: '#fff',
        borderRadius: 10,
        marginVertical: 10,
        width: '60%',
        padding: 10,
        marginHorizontal: 10
    },
    textInputStyle:{
        height: 40,
        borderColor: 'gray',
        // borderWidth: .5,
        borderRadius: 10,
        paddingHorizontal:10,
        width:'60%',
        backgroundColor: '#fff'
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
    }
});