import { StatusBar } from 'expo-status-bar';
import { StyleSheet,SafeAreaView, Image,Dimensions, Text, View, Pressable, TextInput } from 'react-native';
import Icon  from 'react-native-vector-icons/MaterialCommunityIcons';
import { useState } from 'react';
import { useQueryClient,useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { CONSTS } from '../constants';
import * as DocumentPicker from 'expo-document-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
const { width, height } = Dimensions.get('window');
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
            [ key ]: value,
        });
    }
    const queryClient = useQueryClient();
    const speakers = queryClient.getQueryData(['speakers']);
    const user = queryClient.getQueryData(['user']);
    console.log('speakers',speakers, user);
    // console.log('newEventData',data);
    function handleNewEvent(){
        newEvent.mutate(formData);
    }
    const formData = new FormData();
    formData.append('name', newEventData.name);
    formData.append('date', newEventData.date);
    formData.append('ticketPrice', newEventData.ticketPrice);
    formData.append('speaker', newEventData.speaker);
    formData.append('file',{
        uri: newEventData.poster,
        name: 'image.jpg',
        type: 'image/jpeg',
    });
    console.log('formData is: ',formData);
    const newEvent= useMutation({
        mutationFn: async (newEventData) => {
            console.log('newEventData',newEventData);
            axios.post(`${CONSTS.BACKEND_URL}/new-event`,{...newEventData},{
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
            setNewEventData({
                ...newEventData,
                poster: res.uri,
            });
        });
    }
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar  style='auto' />
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
                    <Pressable onPress={handleChooseFile} style={styles.buttonStyle}>
                        <Text style={styles.textcolor}>Choose File</Text>
                    </Pressable>
                </View>
                <View style={{width:'100%'}}>
                    <Text>Ticket Price</Text>
                    <TextInput 
                        keyboardType='numeric'
                        style={styles.textInputStyle} 
                        placeholder='Enter Price, 0 for free'
                        onChangeText={(text)=>handleTextChange('ticketPrice',text)} 
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
        marginTop: height*0.2,
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
