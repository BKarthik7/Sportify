import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Pressable,
  TextInput,
} from 'react-native';
import moment from 'moment';
import React, {useEffect, useState, useContext} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {BottomModal, ModalContent, SlideAnimation} from 'react-native-modals';
import {AuthContext} from '../AuthContext';

import Ionicons from '@react-native-vector-icons/ionicons';
import MaterialCommunityIcons from '@react-native-vector-icons/material-design-icons';
import Entypo from '@react-native-vector-icons/entypo';
import Feather from '@react-native-vector-icons/feather';
import FontAwesome from '@react-native-vector-icons/fontawesome';
import FontAwesome5 from '@react-native-vector-icons/fontawesome5';
import AntDesign from '@react-native-vector-icons/ant-design';

const CreateActivity = () => {
  const [sport, setSport] = useState('');
  const [area, setArea] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [timeInterval, setTimeInterval] = useState('');
  const [noOfPlayers, setNoOfPlayers] = useState(0);

  const [selected, setSelected] = useState('Public');
  const [taggedVenue, setTaggedVenue] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const navigation = useNavigation();
  const route = useRoute();
  const {userId} = useContext(AuthContext);

  const selectDate = date => {
    setModalVisible(false);
    setDate(date);
  };

  const generateDates = () => {
    const dates = [];
    for (let i = 0; i < 10; i++) {
      const date = moment().add(i, 'days');
      let displayDate;
      if (i === 0) {
        displayDate = 'Today';
      } else if (i === 1) {
        displayDate = 'Tomorrow';
      } else if (i === 2) {
        displayDate = 'Day after';
      } else {
        displayDate = date.format('Do MMMM');
      }
      dates.push({
        id: i.toString(),
        displayDate,
        dayOfWeek: date.format('dddd'),
        actualDate: date.format('Do MMMM'),
      });
    }
    return dates;
  };

  const createGame = async () => {
    try {
      const admin = userId;
      const time = timeInterval;
      const gameData = {
        sport,
        area: taggedVenue,
        date,
        time,
        admin,
        totalPlayers: noOfPlayers,
      };

      const response = await axios.post(
        'http://localhost:8000/creategame',
        gameData,
      );
      console.log('Game created:', response.data);
      if (response.status == 200) {
        Alert.alert('Success!', 'Game created Succesfully', [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'OK', onPress: () => navigation.goBack()},
        ]);

        setSport('');
        setArea('');
        setDate('');
        setTimeInterval('');
      }
    } catch (error) {
      console.error('Failed to create game:', error);
    }
  };

  const dates = generateDates();

  useEffect(() => {
    if (route.params?.taggedVenue) {
      setTaggedVenue(route.params.taggedVenue);
    }
  }, [route.params]);

  useEffect(() => {
    if (route.params?.timeInterval) {
      setTimeInterval(route.params.timeInterval);
    }
  }, [route.params]);

  return (
    <>
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <ScrollView>
          <View style={{marginHorizontal: 10, marginVertical: 15}}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </View>

          <View style={{padding: 10}}>
            <Text style={{fontSize: 25, fontWeight: 'bold'}}>
              Create Activity
            </Text>
            <Pressable
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 20,
                marginTop: 15,
                marginVertical: 10,
                marginRight: 1,
              }}>
              <MaterialCommunityIcons name="whistle" size={24} color="grey" />
              <View style={{flex: 1}}>
                <Text style={{fontSize: 17, fontWeight: '500'}}>Sport</Text>
                <TextInput
                  value={sport}
                  onChangeText={setSport}
                  placeholder="Eg Badminton | Tennis | Football"
                  placeholderTextColor="grey"
                  style={{
                    fontSize: 14,
                  }}
                />
              </View>
              <Ionicons name="arrow-forward" size={24} color="grey" />
            </Pressable>
            <Text style={{borderColor: '#E0E0E0', borderWidth: 1, height: 1}} />
            <Pressable
              onPress={() => navigation.navigate('TagVenue')}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 20,
                marginTop: 10,
                marginVertical: 10,
                marginRight: 1,
              }}>
              <Entypo name="location" size={24} color="grey" />
              <View style={{flex: 1}}>
                <Text style={{fontSize: 17, fontWeight: '500'}}>Area</Text>
                <TextInput
                  value={area ? area : taggedVenue}
                  onChangeText={setArea}
                  placeholder="Locality | Venue Name"
                  placeholderTextColor="grey"
                  style={{
                    fontSize: 14,
                  }}
                />
              </View>
              <Ionicons name="arrow-forward" size={24} color="grey" />
            </Pressable>
            <Text style={{borderColor: '#E0E0E0', borderWidth: 1, height: 1}} />
            <Pressable
              onPress={() => setModalVisible(!modalVisible)}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 20,
                marginTop: 10,
                marginVertical: 10,
                marginRight: 1,
              }}>
              <Feather name="calendar" size={24} color="grey" />
              <View style={{flex: 1}}>
                <Text style={{fontSize: 17, fontWeight: '500'}}>Date</Text>
                <TextInput
                  editable={false}
                  placeholder={date ? date : 'Pick a date'}
                  placeholderTextColor={date ? 'black' : 'grey'}
                  style={{
                    fontSize: 14,
                  }}
                />
              </View>
              <Ionicons name="arrow-forward" size={24} color="grey" />
            </Pressable>
            <Text style={{borderColor: '#E0E0E0', borderWidth: 1, height: 1}} />
            <Pressable
              onPress={() => navigation.navigate('Time')}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 20,
                marginTop: 10,
                marginVertical: 10,
                marginRight: 1,
              }}>
              <AntDesign name="clock-circle" size={24} color="grey" />
              <View style={{flex: 1}}>
                <Text style={{fontSize: 17, fontWeight: '500'}}>Time</Text>
                <TextInput
                  placeholder={timeInterval ? timeInterval : 'Pick exact time'}
                  placeholderTextColor={timeInterval ? 'black' : 'grey'}
                  style={{
                    fontSize: 14,
                  }}
                />
              </View>
              <Ionicons name="arrow-forward" size={24} color="grey" />
            </Pressable>
            <Text style={{borderColor: '#E0E0E0', borderWidth: 1, height: 1}} />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 20,
                marginTop: 7,
                marginVertical: 10,
              }}>
              <Feather name="activity" size={24} color="grey" />
              <View style={{marginTop: 5}}>
                <Text
                  style={{marginBottom: 10, fontSize: 15, fontWeight: '500'}}>
                  Activity Access
                </Text>
                <Pressable style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Pressable
                    onPress={() => setSelected('Public')}
                    style={
                      selected.includes('Public')
                        ? {
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 8,
                            backgroundColor: '#07bc0c',
                            width: 140,
                            justifyContent: 'center',
                            borderRadius: 3,
                            padding: 10,
                          }
                        : {
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 8,
                            backgroundColor: 'white',
                            width: 140,
                            justifyContent: 'center',
                            borderRadius: 3,
                            padding: 10,
                          }
                    }>
                    <Ionicons
                      name="earth"
                      size={24}
                      color={selected.includes('Public') ? 'white' : 'black'}
                    />
                    <Text
                      style={
                        selected.includes('Public')
                          ? {color: 'white', fontWeight: 'bold', fontSize: 15}
                          : {color: 'black', fontWeight: 'bold', fontSize: 15}
                      }>
                      Public
                    </Text>
                  </Pressable>
                  <Pressable
                    onPress={() => setSelected('Invite Only')}
                    style={
                      selected.includes('Invite Only')
                        ? {
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 8,
                            backgroundColor: '#07bc0c',
                            width: 140,
                            justifyContent: 'center',
                            borderRadius: 3,
                            padding: 10,
                          }
                        : {
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 8,
                            backgroundColor: 'white',
                            width: 140,
                            justifyContent: 'center',
                            borderRadius: 3,
                            padding: 10,
                          }
                    }>
                    <FontAwesome
                      name="lock"
                      size={24}
                      color={
                        selected.includes('Invite Only') ? 'white' : 'black'
                      }
                    />
                    <Text
                      style={
                        selected.includes('Invite Only')
                          ? {color: 'white', fontWeight: 'bold', fontSize: 15}
                          : {color: 'black', fontWeight: 'bold', fontSize: 15}
                      }>
                      Invite Only
                    </Text>
                  </Pressable>
                </Pressable>
              </View>
            </View>
            <Text
              style={{
                borderColor: '#E0E0E0',
                borderWidth: 1,
                height: 1,
                marginTop: 7,
              }}
            />
            <Text style={{marginTop: 20, fontSize: 16}}>Total Players</Text>
            <View
              style={{
                padding: 10,
                backgroundColor: '#F0F0F0',
                marginTop: 10,
                borderRadius: 6,
              }}>
              <View style={{marginVertical: 5}}>
                <View>
                  <TextInput
                    value={noOfPlayers}
                    onChangeText={setNoOfPlayers}
                    style={{
                      padding: 10,
                      backgroundColor: 'white',
                      borderWidth: 1,
                      borderColor: '#D0D0D0',
                    }}
                    placeholder="Total Players (including you)"
                  />
                </View>
              </View>
            </View>
            <Text
              style={{
                borderColor: '#E0E0E0',
                borderWidth: 1,
                height: 1,
                marginTop: 15,
              }}
            />
            <Text style={{marginTop: 20, fontSize: 16}}>Add Instructions</Text>
            <View
              style={{
                padding: 10,
                backgroundColor: '#F0F0F0',
                marginTop: 10,
                borderRadius: 6,
              }}>
              <View
                style={{
                  marginVertical: 5,
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 8,
                }}>
                <Ionicons name="bag-check" size={24} color="red" />

                <Text style={{flex: 1, fontStyle: 15, fontWeight: '500'}}>
                  Bring your own equipment
                </Text>

                <FontAwesome name="check-square" size={24} color="green" />
              </View>

              <View
                style={{
                  marginVertical: 5,
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 8,
                }}>
                <MaterialCommunityIcons
                  name="directions-fork"
                  size={24}
                  color="#FEBE10"
                />

                <Text style={{flex: 1, fontStyle: 15, fontWeight: '500'}}>
                  Cost Shared
                </Text>

                <FontAwesome name="check-square" size={24} color="green" />
              </View>

              <View
                style={{
                  marginVertical: 5,
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 8,
                }}>
                <FontAwesome5
                  iconStyle="solid"
                  name="syringe"
                  size={24}
                  color="green"
                />

                <Text style={{flex: 1, fontStyle: 15, fontWeight: '500'}}>
                  Covid Vaccinated players preferred
                </Text>

                <FontAwesome name="check-square" size={24} color="green" />
              </View>

              <TextInput
                style={{
                  padding: 10,
                  backgroundColor: 'white',
                  borderColor: '#D0D0D0',
                  borderWidth: 1,
                  marginVertical: 8,
                  borderRadius: 6,
                }}
                placeholder="Add Additional Instructions"
              />
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 20,
                marginTop: 15,
                marginVertical: 10,
              }}>
              <AntDesign name="setting" size={24} color="black" />
              <View style={{flex: 1}}>
                <Text style={{fontSize: 17, fontWeight: '500'}}>
                  Advanced Settings
                </Text>
              </View>
              <Ionicons name="arrow-forward" size={24} color="grey" />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>

      <Pressable
        style={{
          backgroundColor: '#07bc0c',
          marginTop: 'auto',
          marginBottom: 30,
          padding: 12,
          marginHorizontal: 10,
          borderRadius: 4,
        }}>
        <Text
          style={{
            textAlign: 'center',
            color: 'white',
            fontSize: 15,
            fontWeight: '500',
          }}>
          Create Activity
        </Text>
      </Pressable>

      <BottomModal
        onBackdropPress={() => setModalVisible(!modalVisible)}
        swipeDirection={['up', 'down']}
        swipeThreshold={200}
        modalAnimation={
          new SlideAnimation({
            slideFrom: 'bottom',
          })
        }
        onHardwareBackPress={() => setModalVisible(!modalVisible)}
        visible={modalVisible}
        onTouchOutside={() => setModalVisible(!modalVisible)}>
        <ModalContent
          style={{width: '100%', height: 400, backgroundColor: 'white'}}>
          <View>
            <Text
              style={{textAlign: 'center', fontSize: 16, fontWeight: 'bold'}}>
              Choose date/ time to rehost
            </Text>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 15,
                flexWrap: 'wrap',
                marginVertical: 20,
              }}>
              {dates?.map((item, index) => (
                <Pressable
                  key={item.id}
                  onPress={() => selectDate(item?.actualDate)}
                  style={{
                    padding: 10,
                    borderRadius: 10,
                    borderColor: '#E0E0E0',
                    borderWidth: 1,
                    width: '30%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text>{item?.displayDate}</Text>
                  <Text style={{color: 'gray', marginTop: 8}}>
                    {item?.dayOfWeek}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
        </ModalContent>
      </BottomModal>
    </>
  );
};

export default CreateActivity;

const styles = StyleSheet.create({});
