import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {useRoute} from '@react-navigation/native';
import Ionicons from '@react-native-vector-icons/ionicons';
import FontAwesome from '@react-native-vector-icons/fontawesome';
import MaterialCommunityIcons from '@react-native-vector-icons/material-design-icons';
import Amenities from '../components/Amenities';

const VenueInfoScreen = () => {
  const route = useRoute();
  console.log(route?.params);
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView>
        <>
          <View>
            <Image
              style={{
                width: '100%',
                height: 200,
                resizeMode: 'cover',
              }}
              source={{
                uri: 'https://images.pexels.com/photos/3660204/pexels-photo-3660204.jpeg?auto=compress&cs=tinysrgb&w=800',
              }}
            />
          </View>
          <View style={{padding: 10}}>
            <Text>{route?.params?.name}</Text>
            <View
              style={{
                marginTop: 5,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 5,
              }}>
              <Ionicons name="time-outline" size={24} color="black" />
              <Text style={{fontSize: 15, fontWeight: '500'}}>
                6:00 AM - 11:00 PM
              </Text>
            </View>
            <View style={{flexDirection: 'row', gap: 5, marginVertical: 6}}>
              <Ionicons name="location-outline" size={24} color="black" />
              <Text style={{fontSize: 14, width: '80%', fontWeight: '500'}}>
                {route?.params?.location}
              </Text>
            </View>
          </View>
          <View
            style={{
              padding: 10,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
            }}>
            <View>
              <View style={{flexDirection: 'row'}}>
                {[0, 0, 0, 0, 0].map((en, i) => (
                  <FontAwesome
                    key={i}
                    style={{paddingHorizontal: 3}}
                    name={
                      i < Math.floor(route.params.rating) ? 'star' : 'star-o'
                    }
                    size={15}
                    color="#FFD700"
                  />
                ))}
                <Text>{route.params.rating} (9 ratings)</Text>
              </View>
              <Pressable
                style={{
                  marginTop: 6,
                  width: 160,
                  borderColor: '#686868',
                  borderWidth: 1,
                  padding: 10,
                  borderRadius: 5,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text>Rate Venue</Text>
              </Pressable>
            </View>
            <View>
              <View>
                <Text>100 Total Activities</Text>
              </View>
              <Pressable
                style={{
                  marginTop: 6,
                  width: 160,
                  borderColor: '#686868',
                  borderWidth: 1,
                  padding: 10,
                  borderRadius: 5,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text>1 Upcoming</Text>
              </Pressable>
            </View>
          </View>
          <Text style={{fontSize: 15, marginHorizontal: 10, fontWeight: '500'}}>
            Sports Available
          </Text>
          <ScrollView showsHorizontalScrollIndicator={false} horizontal>
            {route.params.sportsAvailable.map((item, index) => (
              <View
                key={index}
                style={{
                  borderColor: '#686868',
                  margin: 10,
                  padding: 20,
                  width: 130,
                  height: 90,
                  borderWidth: 1,
                  borderRadius: 5,
                }}>
                <MaterialCommunityIcons
                  style={{textAlign: 'center'}}
                  name={item.icon}
                  size={24}
                  color="gray"
                />
                <Text
                  style={{
                    fontSize: 13,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    marginTop: 10,
                  }}>
                  {item.name}
                </Text>
              </View>
            ))}
          </ScrollView>

          <Amenities />

          <View style={{marginHorizontal: 10}}>
            <Text style={{fontSize: 15, fontWeight: 'bold'}}>Activities</Text>
          </View>
        </>
      </ScrollView>
    </SafeAreaView>
  );
};

export default VenueInfoScreen;

const styles = StyleSheet.create({});
