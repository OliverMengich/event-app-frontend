import React from 'react';
import { StyleSheet, Text, View,Image, TextInput,FlatList, Pressable, ScrollView } from 'react-native';
import Icon  from 'react-native-vector-icons/MaterialCommunityIcons';
import SpeakerComponent from '../components/Speaker.component';
import EventItemComponent from '../components/EventItem.component';
import {EVENTS} from './FavouritesScreen'
export default function HomeScreen({navigation}) {
    function handleNavigation(id){
        console.log('Id',id);
        navigation.navigate('EventDetails',{
            eventId: id
        })
    }
    return (
        <View style={styles.container}>
            <View style={{marginTop: 60}}>
                <Text style={styles.boldText}>Find Trending events</Text>
                <View style={[styles.rowContainer,{marginTop:30}]}>
                    <TextInput style={styles.textInputStyle} placeholder="Search" />
                    <Icon size={25} name="filter-variant-remove" />
                </View>
            </View>
            <View>
                <Text style={styles.boldText}>Categories</Text>

                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    {/* <View style={styles.rowContainer}> */}
                        <View style={styles.categoryItem}>
                            <Icon size={35} name="music" />
                            <View style={{alignItems:'center'}}>
                                <Text style={[styles.normalText,{fontSize: 20}]}>Concerts</Text>
                                <Text>22 Events</Text>
                            </View>
                        </View>
                        <View style={styles.categoryItem}>
                            <Icon size={25} name="food" />
                            <View>
                                <Text style={[styles.normalText,{fontSize: 20}]}>Food</Text>
                                <Text>22 Events</Text>
                            </View>
                        </View>
                        <View style={styles.categoryItem}>
                            <Icon size={25} name="weight-lifter" />
                            <Text style={styles.normalText}>Fitness</Text>
                        </View>
                        <View style={styles.categoryItem}>
                            <Icon size={25} name="laptop" />
                            <Text style={styles.normalText}>Tech</Text>
                        </View>
                    {/* </View> */}
                </ScrollView>
            </View>
            <View style={styles.eventsSection}>
                <View style={styles.rowContainer}>
                    <Text style={styles.boldText}>Popular Events</Text>
                    {/* <Icon size={25} name="dots-horizontal" /> */}
                    <Text style={{color:'#4285f4'}}>Show all</Text>
                </View>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    {
                        EVENTS.map((event)=>(
                            <EventItemComponent 
                                id={event.id}
                                title={event.title} 
                                image={event.image}
                                date={event.date}
                                handleNavigation={()=>handleNavigation(event.id)} 
                                price={event.price}
                                location={event.location}
                                description={event.description}
                                favourite={event.favourite}
                            />
                        ))
                    }
                </ScrollView>
            </View>
            <View style={styles.eventsSection}>
                <View style={styles.rowContainer}>
                    <Text style={styles.boldText}>Speakers</Text>
                    <Icon size={25} name="dots-horizontal" />
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <SpeakerComponent/>
                    <SpeakerComponent/>
                    <SpeakerComponent/>
                </View>
            </View>
            <Pressable android_ripple={{color:'#f5f5f5'}}  style={styles.addButton}>
                <Icon size={25} name="plus" color={'white'} />
            </Pressable>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f7f8',
        paddingHorizontal:10,
        position: 'relative'
    },
    rowContainer: {
        flexDirection: 'row',
        width:'100%', 
        justifyContent:'space-between', 
        // paddingHorizontal: 20,
        alignItems:'center',
        paddingVertical: 10
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
        width: 200,
        // padding: 10,
        marginHorizontal: 10
    },
    categoryItem:{
        backgroundColor: '#fff',
        borderRadius: 10,
        marginVertical: 10,
        // width: '30%',
        flexDirection: 'row',
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
    },
    addButton:{position: 'absolute', bottom: 30, right: 20, backgroundColor: 'red', borderRadius: 50, padding: 10},
    eventsSection:{
        marginVertical: 10,
        paddingVertical: 1,
    }
});