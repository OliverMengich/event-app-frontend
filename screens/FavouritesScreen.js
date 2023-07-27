import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import EventItemComponent from '../components/EventItem.component';
import { useQueryClient } from '@tanstack/react-query';
function FavouritesScreen({navigation}) {
    function handleNavigation(id){
        navigation.navigate('EventDetails',{
            eventId: id
        })
    }
    const queryClient = useQueryClient();
    let user;
    user = queryClient.getQueryData(['user']);
    if (!user) {
        console.log('User not present')
        user = queryClient.getQueryData(['register']);
        console.log('====================================');
        console.log(user);
        console.log('====================================');
    }
    console.log('User',user);
    const favouriteEvents = user.favourites;

    return (
        <View style={{ flex: 1,  }}>
            <Text style={styles.boldText}>Favourite Events</Text>
            {/* <View style={{flexDirection: 'row', flexWrap: 'wrap'}}> */}
            {
                favouriteEvents.length === 0 && <Text style={{textAlign: 'center'}}>No favourite events</Text>
            }
                <FlatList
                    data={favouriteEvents}
                    renderItem={({item}) => (
                        <EventItemComponent
                            title={item.title}
                            image={item.image}
                            date={item.date}
                            handleNavigation={()=>handleNavigation(item.id)}
                            price={item.price}
                            id={item.id}
                            description={item.description}
                            location={item.location}
                            favourite={item.favourite}
                        />
                        )
                    }
                    keyExtractor={item => item.id}
                    numColumns={2}
                />
            {/* </View> */}
        </View>
    );
}
const styles = StyleSheet.create({
    boldText:{
        fontWeight: 'bold',
        fontSize: 20,
    },
})
export default FavouritesScreen;