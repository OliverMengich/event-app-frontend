import { StatusBar } from 'expo-status-bar';
import { StyleSheet,SafeAreaView, Image, Text, View, Pressable, TextInput } from 'react-native';
import Icon  from 'react-native-vector-icons/MaterialCommunityIcons';
import { useState } from 'react';
import { useQueryClient,useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { CONSTS } from '../constants';
import * as DocumentPicker from 'expo-document-picker';
export default function NewLocationScreen({navigation}) {
    function handleNavigation(){
        navigation.goBack();
    }
    const [newLocation, setNewLocation] = useState({
        name: '',
        address: '',
        latitude: 0.0,
        longitude: 0.0,
        files: [],
    });
    navigation.setOptions({
        headerLeft: () => (
            <Pressable onPress={handleNavigation} >
                <Icon name='chevron-left' size={25}  />
            </Pressable>
        ),
        headerTitle:''
    });
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const handleTextChange = (key,value) => {
        console.log(key,value);
        setNewLocation({
            ...newLocation,
            [ key ]: value,
        });
    }
    const queryClient = useQueryClient();
    const speakers = queryClient.getQueryData(['speakers']);
    const user = queryClient.getQueryData(['user']);
    console.log('speakers',speakers, user);
    // console.log('newLocation',data);
    function handleNewEvent(){
        newEvent.mutate(formData);
    }
    const formData = new FormData();
    formData.append('name', newLocation.name);
    formData.append('date', newLocation.date);
    formData.append('ticketPrice', newLocation.ticketPrice);
    formData.append('speaker', newLocation.speaker);
    formData.append('file',{
        uri: newLocation.poster,
        name: 'image.jpg',
        type: 'image/jpeg',
    });
    console.log('formData is: ',formData);
    const newEvent= useMutation({
        mutationFn: async (newLocation) => {
            console.log('newLocation',newLocation);
            axios.post(`${CONSTS.BACKEND_URL}/new-location`,{...newLocation},{
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${user.access_token}`,
                }
            })
            .then((res)=>{
                console.log('res',res);
            })
            .catch((err)=>{
                console.log('Error encountered',err)
            });
        },
        onSuccess: (data) => {
            console.log('data',data);
            queryClient.invalidateQueries({queryKey: ['events']});
            // navigation.navigate('Events');
        },
        onError: (error) => {
            console.log('error',error.message);
        }
    }); 
    function handleChooseFile(){
        DocumentPicker.getDocumentAsync({
            type: 'image/*',
            copyToCacheDirectory: true,
        }).then((res)=>{
            console.log(res);
            setNewLocation({
                ...newLocation,
                poster: res.uri,
            });
        });
    }
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar  style='auto' />
            <Text style={styles.boldText}>New Location</Text>
            <View style={{width: '100%', alignItems:'center'}}>
                <View style={{width:'100%'}}>
                    <Text>Location Name</Text>
                    <TextInput 
                        style={styles.textInputStyle} 
                        placeholder='Enter Location Name'
                        onChangeText={(text)=>handleTextChange('name',text)} 
                    />
                </View> 
                <View style={{width:'100%'}}>
                    <Text>Address </Text>
                    <TextInput 
                        style={styles.textInputStyle} 
                        placeholder='Enter Address'
                        keyboardType='visible-password'
                        onChangeText={(text)=>handleTextChange('address',text)} 
                    />
                </View>
                <View style={{width:'100%'}}>
                    <Text>Event Poster</Text>
                    <Pressable onPress={handleChooseFile} style={styles.buttonStyle}>
                        <Text style={styles.textcolor}>Choose File</Text>
                    </Pressable>
                </View>
                <View style={{width:'100%'}}>
                    <Text>Latitude</Text>
                    <TextInput 
                        keyboardType='numeric'
                        style={styles.textInputStyle} 
                        placeholder='Enter Latitude'
                        onChangeText={(text)=>handleTextChange('latitude',text)} 
                    />
                </View>
                <View style={{width:'100%'}}>
                    <Text>Longitude</Text>
                    <TextInput 
                        keyboardType='numeric'
                        style={styles.textInputStyle} 
                        placeholder='Enter Longitude'
                        onChangeText={(text)=>handleTextChange('longitude',text)} 
                    />
                </View>
                
                <Pressable onPress={handleNewEvent} style={styles.buttonStyle}>
                    <Text style={styles.textcolor}>Create</Text>
                </Pressable>
            
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f7f8',
        paddingHorizontal:10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textInputStyle: {
        height: 40,
        borderColor: 'gray',
        borderBottomWidth: 1,
        width: '100%',
        paddingHorizontal: 10,
        marginVertical: 10,
    },
    textStyle: {
        // height: 40,
        borderColor: 'gray',
        borderBottomWidth: 1,
        width: '100%',
        padding: 10,
        marginVertical: 10,
    },
    buttonStyle:{
        backgroundColor: '#ef544f',
        paddingVertical: 10,
        borderRadius: 25,
        width: '40%',
        alignItems: 'center',
        marginVertical: 10,
        justifyContent: 'center',
    },
    boldText:{
        fontWeight: 'bold',
        fontSize: 20,
    },
    textcolor:{
        color: '#fff',
        alignSelf: 'center',
    },
    forgotPasswordText:{
        color: '#7597ce',
        alignSelf: 'center',
        marginVertical: 10,
    },
    signInOptionIcon:{backgroundColor:'#fff', borderRadius: 15, padding:5, marginHorizontal:5}
});
