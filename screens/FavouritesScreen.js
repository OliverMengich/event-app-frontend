import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import EventItemComponent from '../components/EventItem.component';
function FavouritesScreen() {
    return (
        <View style={{ flex: 1,  }}>
            <Text style={styles.boldText}>Favourites Screen</Text>
            <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                <EventItemComponent />
                <EventItemComponent />
                <EventItemComponent />
                <EventItemComponent />
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