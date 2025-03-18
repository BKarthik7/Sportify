import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import Ionicons from '@react-native-vector-icons/ionicons';
import {set} from 'mongoose';

const PlayScreen = () => {
  const [option, setOption] = useState('My Sports');
  const [sport, setSport] = useState('Badminton');
  return (
    <SafeAreaView>
      <View style={{padding: 12, backgroundColor: '#223536'}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginRight: 5,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
            <Text style={{fontSize: 16, fontWeight: '500', color: 'white'}}>
              Shivaji Nagar
            </Text>
            <MaterialIcons name="keyboard-arrow-down" size={24} color="white" />
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
            <Ionicons name="chatbox-outline" size={24} color="white" />
            <Ionicons name="notifications-outline" size={24} color="white" />
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
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
            marginVertical: 13,
            marginRight: 1,
          }}>
          <Pressable onPress={() => setOption('Calender')}>
            <Text
              style={{
                fontWeight: '500',
                fontSize: 15,
                color: option == 'Calender' ? '#12e04c' : 'white',
              }}>
              Calender
            </Text>
          </Pressable>
          <Pressable onPress={() => setOption('My Sports')}>
            <Text
              style={{
                fontWeight: '500',
                fontSize: 15,
                color: option == 'My Sports' ? '#12e04c' : 'white',
              }}>
              My Sports
            </Text>
          </Pressable>
          <Pressable onPress={() => setOption('Other Sports')}>
            <Text
              style={{
                fontWeight: '500',
                fontSize: 15,
                color: option == 'Other Sports' ? '#12e04c' : 'white',
              }}>
              Other Sports
            </Text>
          </Pressable>
        </View>

        <View style={{marginVertical: 7}}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <Pressable
              onPress={() => setSport('Badminton')}
              style={{
                paddingHorizontal: 10,
                paddingVertical: 6,
                marginRight: 10,
                borderColor: 'white',
                borderRadius: 8,
                borderWidth: sport == 'Badminton' ? 0 : 1,
                backgroundColor:
                  sport == 'Badminton' ? '#1dbf22' : 'transparent',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{color: 'white', fontWeight: '600', fontSize: 15}}>
                Badminton
              </Text>
            </Pressable>
            <Pressable
              onPress={() => setSport('Cricket')}
              style={{
                paddingHorizontal: 10,
                paddingVertical: 6,
                marginRight: 10,
                borderColor: 'white',
                borderRadius: 8,
                borderWidth: sport == 'Cricket' ? 0 : 1,
                backgroundColor: sport == 'Cricket' ? '#1dbf22' : 'transparent',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{color: 'white', fontWeight: '600', fontSize: 15}}>
                Cricket
              </Text>
            </Pressable>
            <Pressable
              onPress={() => setSport('Cycling')}
              style={{
                paddingHorizontal: 10,
                paddingVertical: 6,
                marginRight: 10,
                borderColor: 'white',
                borderRadius: 8,
                borderWidth: sport == 'Cycling' ? 0 : 1,
                backgroundColor: sport == 'Cycling' ? '#1dbf22' : 'transparent',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{color: 'white', fontWeight: '600', fontSize: 15}}>
                Cycling
              </Text>
            </Pressable>
            <Pressable
              onPress={() => setSport('Running')}
              style={{
                paddingHorizontal: 10,
                paddingVertical: 6,
                marginRight: 10,
                borderColor: 'white',
                borderRadius: 8,
                borderWidth: sport == 'Running' ? 0 : 1,
                backgroundColor: sport == 'Running' ? '#1dbf22' : 'transparent',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{color: 'white', fontWeight: '600', fontSize: 15}}>
                Running
              </Text>
            </Pressable>
          </ScrollView>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 10,
          backgroundColor: 'white',
        }}>
        <Pressable>
          <Text style={{fontWeight: 'bold'}}>Create Game</Text>
        </Pressable>
        <View style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
          <Pressable>
            <Text style={{fontWeight: 'bold'}}>Filter</Text>
          </Pressable>
          <Pressable>
            <Text style={{fontWeight: 'bold'}}>Sort</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PlayScreen;

const styles = StyleSheet.create({});
