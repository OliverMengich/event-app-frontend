import { StatusBar } from 'expo-status-bar';
import { StyleSheet,SafeAreaView,PermissionsAndroid,Platform, Image,Dimensions, Text, View, Pressable, TextInput } from 'react-native';
import Icon  from 'react-native-vector-icons/MaterialCommunityIcons';
import { useState } from 'react';
import { useQueryClient,useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { CONSTS } from '../constants';
import * as DocumentPicker from 'expo-document-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
const { width, height } = Dimensions.get('window');
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system'
import * as ImagePicker from 'expo-image-picker';
export default function NewEventScreen({navigation}) {
    function handleNavigation(){
        navigation.goBack();
    }
    const [newEventData, setNewEventData] = useState({
        name: '',
        date: '',
        ticketPrice: 0,
        speakerId: '',
        poster: '',
        description: '',
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
        setNewEventData({
            ...newEventData,
            [ key ]: key==='ticketPrice'? parseFloat(value): value,
        });
    }
    const queryClient = useQueryClient();
    const speakers = queryClient.getQueryData(['speakers']);
    let user = undefined;
    user = queryClient.getQueryData(['user']);
    if (user===undefined) {
        user = queryClient.getQueryData(['register']);
    }
    function handleNewEvent(){
        newEvent.mutate(newEventData);
    }
    // console.log('Logged in user is: ',user);
    const newEvent= useMutation({
        mutationFn: async (newEventData) => {
            try {
                console.log('New newEventData: ',newEventData);
                const formData = new FormData();
                
                formData.append('poster',{
                    uri: newEventData.poster,
                    name: newEventData.poster.split('/').pop(),
                    type: 'image/jpeg',
                });
                const newObj = {
                    name: newEventData.name,
                    date: newEventData.date,
                    ticketPrice: newEventData.ticketPrice,
                    description: newEventData.description,
                }
                formData.append('request', JSON.stringify(newObj))
                
                const response = await fetch(CONSTS.BACKEND_URL + '/new-event', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: 'Bearer ' + user.access_token,
                    },
                    body: formData,
                });
                const response4 = await response.json();
                console.log('Response for upload',response4);
                
            } catch (error) {
              console.error('Error sending file:', error);
            }
          },
        onSuccess: (data) => {
            console.log('data',data);
            queryClient.invalidateQueries({queryKey: ['events']});
            navigation.navigate('Events');
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
            setNewEventData({
                ...newEventData,
                poster: res.uri,
            });
        });
    }
    function selectImage (){
        ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1,1],
            quality: 1,
        })
        .then((result)=>{
            if(!result.canceled){
                console.log(result.assets[0].uri,'is assets')
                setNewEventData({
                    ...newEventData,
                    poster: result.assets[0].uri,
                });
            }
        })
    }
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style='auto' />
            <Text style={styles.boldText}>Create An event</Text>
            <View style={{width: '100%', alignItems:'center'}}>
                <View style={{width:'100%'}}>
                    <Text>Event Name</Text>
                    <TextInput 
                        style={styles.textInputStyle} 
                        placeholder='Enter Event Name'
                        onChangeText={(text)=>handleTextChange('name',text)} 
                    />
                </View> 
                <View style={{width:'100%'}}>
                    <Text>Date</Text>
                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode='date'
                        onConfirm={(date)=>handleTextChange('date',date)}
                        onCancel={()=>handleTextChange('date','')}
                    />
                    <Pressable 
                        onPress={()=>setDatePickerVisibility(!isDatePickerVisible)}>
                        <Text style={styles.textStyle}>
                            {newEventData.date ? new Date(newEventData.date).toDateString() : 'Select Date'}
                        </Text>
                    </Pressable>
                </View>
                <View style={{width:'100%'}}>
                    <Text>Description</Text>
                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode='date'
                        onConfirm={(date)=>handleTextChange('date',date)}
                        onCancel={()=>handleTextChange('date','')}
                    />
                    <TextInput 
                        style={styles.textInputStyle} 
                        placeholder='Event Description'
                        keyboardType='visible-password'
                        onChangeText={(text)=>handleTextChange('description',text)} 
                    />
                </View>
                <View style={{width:'100%'}}>
                    <Text>Speaker (Optional)</Text>
                    <TextInput 
                        style={styles.textInputStyle} 
                        placeholder='Enter Speaker name'
                        keyboardType='visible-password'
                        onChangeText={(text)=>handleTextChange('speakerId',text)} 
                    />
                </View>
                <View style={{width:'100%'}}>
                    <Text>Event Poster</Text>
                    <Pressable onPress={selectImage} style={styles.buttonStyle}>
                        <Text style={styles.textcolor}>Choose File</Text>
                    </Pressable>
                </View>
                <View style={{width:'100%'}}>
                    <Text>Ticket Price</Text>
                    <TextInput 
                        keyboardType='numeric'
                        style={styles.textInputStyle} 
                        placeholder='Enter Price, 0 for free'
                        onChangeText={(text)=>handleTextChange('ticketPrice',parseFloat(text))} 
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
        marginTop: height*0.1,
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
