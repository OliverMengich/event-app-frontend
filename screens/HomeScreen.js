import React, {useState} from 'react';
import { useQueries, useQueryClient } from '@tanstack/react-query';
import { StyleSheet, Text, View, TextInput, Pressable, ScrollView } from 'react-native';
import Icon  from 'react-native-vector-icons/MaterialCommunityIcons';
import SpeakerComponent from '../components/Speaker.component';
import EventItemComponent from '../components/EventItem.component';
// import axios from 'axios';
import { CONSTS } from '../constants';
export default function HomeScreen({navigation}) {
    const queryClient = useQueryClient();
    function handleNavigation(id){
        console.log('Id',id);
        navigation.navigate('EventDetails',{
            eventId: id
        })
    }
    
    const [toggle, setToggle] = useState(false);
    const resp = queryClient.getQueryData(['user'])
    console.log(resp, 'In homescreen')
    const [eventsQuery, speakersQuery] = useQueries({
        queries:[
            {
                queryKey: ['events'],
                queryFn: async () => {
                    const response = await fetch(`${CONSTS.BACKEND_URL}/events`);
                    return response.json();
                },
                networkMode: 'always',
            },
            {
                queryKey: ['speakers'],
                queryFn: async () => {
                    const response = await fetch(`${CONSTS.BACKEND_URL}/speakers`);
                    return response.json();
                },
                networkMode: 'always'
            }
        ]
    });
    console.log('Events',eventsQuery.data);
    console.log('Speakers',speakersQuery.data);
    return (
        <View style={styles.container}>
            <View style={{marginTop: 60}}>
                <Text style={styles.boldText}>Find Trending events</Text>
                <View style={[styles.rowContainer,{marginTop:30}]}>
                    <TextInput style={styles.textInputStyle} placeholder="Search" />
                    <Icon size={25} name="filter-variant-remove" />
                </View>
            </View>
            <View style={styles.eventsSection}>
                <View style={styles.rowContainer}>
                    <Text style={styles.boldText}>Popular Events</Text>
                    <Pressable onPress={()=>navigation.navigate('Events')} android_ripple={{color:'#f5f5f5'}} style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={{color:'#4285f4'}}>Show all</Text>
                    </Pressable>
                </View>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    {
                        eventsQuery.isFetching? (
                            <Text>Loading...</Text>
                        ):(
                            eventsQuery.data.map((event,id)=>(
                                <EventItemComponent
                                    key={id}
                                    id={event.id}
                                    title={event.title}
                                    image={event.image[0]}
                                    date={event.date}
                                    handleNavigation={()=>handleNavigation(event.id)}
                                    price={event.price}
                                    location={'fdf'}
                                    description={event.description}
                                    favourite={event.favourite}
                                />
                            ))
                        )
                    }
                </ScrollView>
            </View>
            <View style={styles.eventsSection}>
                <View style={styles.rowContainer}>
                    <Text style={styles.boldText}>Speakers</Text>
                    <Text style={{color:'#4285f4'}}>Show all</Text>
                </View>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    {
                        speakersQuery.isFetching? (
                            <Text>Loading...</Text>
                        ):(
                            speakersQuery.data.map((speaker,id)=>(
                                <SpeakerComponent key={id}
                                    id={speaker.id}
                                    name={speaker.name}
                                    image={speaker.image}
                                    jobTitle={speaker.jobTitle}
                                    navigation={navigation}
                                />
                            ))
                        )
                    }
                </ScrollView>
            </View>
            <View style={{position: 'absolute',alignItems: 'center', bottom: 30, right: 30,}}>
                {
                    toggle?(
                        <View>
                            <Pressable onPress={()=>{navigation.navigate('NewEvent');setToggle(!toggle)}} android_ripple={{color:'#f5f5f5'}}  style={{backgroundColor: '#fff',marginBottom: 10, padding: 10}}>
                                <Text>New Event</Text>
                            </Pressable>
                            <Pressable onPress={()=>{navigation.navigate('NewLocation');setToggle(!toggle)}} android_ripple={{color:'#f5f5f5'}}  style={{backgroundColor: '#fff',marginBottom: 10, padding: 10}}>
                                <Text>New Location</Text>
                            </Pressable>
                            
                        </View>
                    ):null
                }
                
                <Pressable onPress={()=>setToggle(!toggle)} android_ripple={{color:'#f5f5f5'}}  style={styles.addButton}>
                    <Icon style={toggle ?{transform: [{ rotate: '45deg' }]}:{}} size={25} name="plus" color={'white'} />
                </Pressable>
            </View>
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
    addButton:{
        backgroundColor: 'red', 
        borderRadius: 25,
        padding: 10,
        width: 50,
        height: 50,
        alignItems: 'center',
    },
    eventsSection:{
        marginVertical: 10,
        paddingVertical: 1,
    }
});