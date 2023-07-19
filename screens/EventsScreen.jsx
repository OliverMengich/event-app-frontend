import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import EventItemComponent from '../components/EventItem.component';
import { EVENTS } from './FavouritesScreen';
function EventsScreen({route, navigation}) {
    function handleNavigation(id){
        navigation.navigate('EventDetails',{
            eventId: id
        })
    }
    return (
        <View style={{flex: 1}}>
            <Text style={styles.boldText}>All Events</Text>
            <FlatList
                data={EVENTS}
                renderItem={({item}) => (
                    <EventItemComponent
                        title={item.title}
                        image={item.image}
                        date={item.date}
                        handleNavigation={()=>handleNavigation(item.id)}
                        price={item.price}
                        description={item.description}
                        location={item.location}
                        favourite={item.favourite}
                    />
                    )
                }
                keyExtractor={item => item.id}
                numColumns={2}
            />
        </View>
    );
}
const styles = StyleSheet.create({
    boldText:{
        fontWeight: 'bold',
        fontSize: 20,
    },
})
export default EventsScreen;