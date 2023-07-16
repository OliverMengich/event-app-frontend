import React from 'react';
import { View, Text, Pressable, StyleSheet, Image } from 'react-native';
import Icon  from 'react-native-vector-icons/MaterialCommunityIcons';
const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
// const date = new Date();
function EventItemComponent({handleNavigation,date, ...otherProps}) {
    const {title, description, location, price, image} = otherProps;
    const [isPressed, setIsPressed] = React.useState(false);
    function handleFavorite(){
        setIsPressed(!isPressed);
    }
    return (
        <View style={styles.rowItem}>
            <Pressable onPress={handleNavigation} android_ripple={{color: '#f5f5f5'}} style={{}}>
            <View style={{position:'relative'}}>
                <Image
                    style={{height: 150, width: '100%',borderTopLeftRadius: 10, borderTopRightRadius: 10}}
                    source={{
                        uri: 'https://picsum.photos/200/300',
                    }}
                />
                <View style={{position: 'absolute', top: 5, right: 5}}>
                    <Pressable onPress={handleFavorite} android_ripple={{color: '#f5f5f5'}}  >
                        <Icon size={25} name={isPressed?"heart": "heart-outline" } color={isPressed ? 'red' : 'white'} />
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
    },
    buttonPressed:{
        opacity: 0.6,
    },
})
export default EventItemComponent;