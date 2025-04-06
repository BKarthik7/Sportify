import {
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React from 'react';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import Ionicons from '@react-native-vector-icons/ionicons';
import venues from '../data/venues.data';
import VenueCard from '../components/VenueCard';

const BookScreen = () => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#f5f5f5'}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 12,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
          <Text>Shivaji Nagar</Text>
          <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />
        </View>
        <View style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
          <Ionicons name="chatbox-outline" size={24} color="black" />
          <Ionicons name="notifications-outline" size={24} color="black" />

          <Image
            style={{width: 30, height: 30, borderRadius: 15}}
            source={{
              uri: 'https://assets.leetcode.com/users/BKarthik7/avatar_1730491299.png',
            }}
          />
        </View>
      </View>
      <View
        style={{
          marginHorizontal: 12,
          backgroundColor: '#e8e8e8',
          padding: 12,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderRadius: 25,
        }}>
        <TextInput placeholder="Search for Venues" />
        <Ionicons name="search" size={24} color="gray" />
      </View>
      <Pressable
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 10,
          padding: 13,
        }}>
        <View
          style={{
            padding: 10,
            borderRadius: 10,
            backgroundColor: '#e0e0e0',
            borderWidth: 1,
          }}>
          <Text>Sports and Availability</Text>
        </View>
        <View
          style={{
            padding: 10,
            borderRadius: 10,
            backgroundColor: '#e0e0e0',
            borderWidth: 1,
          }}>
          <Text>Favorites</Text>
        </View>
        <View
          style={{
            padding: 10,
            borderRadius: 10,
            backgroundColor: '#e0e0e0',
            borderWidth: 1,
          }}>
          <Text>Offers</Text>
        </View>
      </Pressable>
      <FlatList
        data={venues}
        renderItem={({item}) => <VenueCard item={item} />}
        contentContainerStyle={{paddingBottom: 20}}
      />
    </SafeAreaView>
  );
};

export default BookScreen;

const styles = StyleSheet.create({});
