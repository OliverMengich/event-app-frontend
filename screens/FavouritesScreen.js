import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import EventItemComponent from '../components/EventItem.component';
export const EVENTS = [
    {
        id: '1',
        title: 'React Native Meetup',
        image: 'https://picsum.photos/200/300',
        date: new Date(),
        price: 2000,
        location: 'Lagos, Nigeria',
        description: 'Join us for a React Native meetup as we discuss the latest in React Native and how to build amazing apps with it.',
        favourite: false,
    },
    {
        id: '2',
        title: 'AngularJS Meetup',
        image: 'https://picsum.photos/200/300',
        date: new Date('2021-05-12'),
        price: 2000,
        location: 'Strathmore, Kenya',
        description: 'AngularJS meetup as we discuss the latest in AngularJS and how to build amazing apps with it',
        favourite: true,

    },
    {
        id: '3',
        title: 'VueJS Meetup',
        image: 'https://picsum.photos/200/300',
        date: new Date('2022-10-22'),
        price: 1000,
        location: 'Nairobi, Kenya',
        description: 'Join us for a VueJS meetup as we discuss the latest in VueJS and how to build amazing apps with it.',
        favourite: false,
    }
]
function FavouritesScreen({navigation}) {
    function handleNavigation(){
        navigation.navigate('EventDetails')
    }
    return (
        <View style={{ flex: 1,  }}>
            <Text style={styles.boldText}>Favourite Events</Text>
            <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                <FlatList
                    data={EVENTS}
                    renderItem={({item}) => (
                        <EventItemComponent
                            title={item.title}
                            image={item.image}
                            date={item.date}
                            handleNavigation={handleNavigation}
                            price={item.price}
                            description={item.description}
                            location={item.location}
                        />)
                    }
                    keyExtractor={item => item.id}
                    numColumns={2}
                />
            </View>
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