import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';

import Ionicons from '@react-native-vector-icons/ionicons';
import AntDesign from '@react-native-vector-icons/ant-design';
import SimpleLineIcons from '@react-native-vector-icons/simple-line-icons';

import HomeScreen from '../screens/HomeScreen';
import PlayScreen from '../screens/PlayScreen';
import BookScreen from '../screens/BookScreen';
import ProfileScreen from '../screens/ProfileScreen';
import VenueInfoScreen from '../screens/VenueInfoScreen';

const StackNavigator = () => {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();

  function BottomTabs() {
    return (
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarActiveTintColor: 'green',
            tabBarIcon: ({focused}) =>
              focused ? (
                <Ionicons name="home-outline" size={24} color="green" />
              ) : (
                <Ionicons name="home-outline" size={24} color="#989898" />
              ),
          }}
        />
        <Tab.Screen
          name="Play"
          component={PlayScreen}
          options={{
            tabBarActiveTintColor: 'green',
            tabBarIcon: ({focused}) =>
              focused ? (
                <AntDesign name="usergroup-add" size={24} color="green" />
              ) : (
                <AntDesign name="usergroup-add" size={24} color="#989898" />
              ),
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Book"
          component={BookScreen}
          options={{
            tabBarActiveTintColor: 'green',
            tabBarIcon: ({focused}) =>
              focused ? (
                <SimpleLineIcons name="book-open" size={24} color="green" />
              ) : (
                <SimpleLineIcons name="book-open" size={24} color="#989898" />
              ),
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarActiveTintColor: 'green',
            tabBarIcon: ({focused}) =>
              focused ? (
                <Ionicons name="person-outline" size={24} color="green" />
              ) : (
                <Ionicons name="person-outline" size={24} color="#989898" />
              ),
            headerShown: false,
          }}
        />
      </Tab.Navigator>
    );
  }

  const AuthStack = () => {
    return <Stack.Navigator></Stack.Navigator>;
  };

  function MainStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={BottomTabs}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Venue"
          component={VenueInfoScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    );
  }

  return (
    <NavigationContainer>
      <MainStack />
    </NavigationContainer>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});
