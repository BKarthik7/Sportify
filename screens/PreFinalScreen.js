import {Pressable, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useContext, useState} from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

import {AuthContext} from '../AuthContext';
import {getRegistrationProgress} from '../registrationUtils';

const PreFinalScreen = () => {
  const {token, setToken} = useContext(AuthContext);
  const [userData, setUserData] = useState();
  const navigation = useNavigation();

  const getAllScreenData = async () => {
    try {
      const screens = ['Register', 'Password', 'Name', 'Image'];
      let userData = {};
      for (const screenName of screens) {
        const screenData = await getRegistrationProgress(screenName);
        if (screenData) {
          userData = {...userData, ...screenData};
        }
      }
      setUserData(userData);
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };

  const registerUser = async () => {
    try {
      const response = await axios
        .post('http://10.20.19.137:8000/register/', userData)
        .then(response => {
          console.log('User registered successfully:', response);
          const token = response.data.token;
          AsyncStorage.setItem('token', token);
          setToken(token);
        });

      clearAllScreenData();
    } catch (error) {
      console.log('Error registering user:', error);
    }
  };

  const clearAllScreenData = async () => {};

  useEffect(() => {
    getAllScreenData();
  }, []);

  useEffect(() => {
    if (token) {
      navigation.replace('MainStack', {screen: 'Main'});
    }
  }, [token]);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{marginTop: 80}}>
        <Text
          style={{
            fontSize: 32,
            fontWeight: 'bold',
            fontFamily: 'GeezaPro-Bold',
            marginLeft: 20,
          }}>
          All set to register
        </Text>
        <Text
          style={{
            fontSize: 32,
            fontWeight: 'bold',
            fontFamily: 'GeezaPro-Bold',
            marginLeft: 20,
            marginTop: 10,
          }}>
          Setting up your profile for you
        </Text>
      </View>

      <Pressable
        onPress={registerUser}
        style={{
          backgroundColor: '#03C03C',
          padding: 15,
          marginTop: 'auto',
          marginBottom: 20,
          marginHorizontal: 20,
          borderRadius: 10,
        }}>
        <Text
          style={{
            textAlign: 'center',
            color: 'white',
            fontWeight: '600',
            fontSize: 15,
          }}>
          Finish Registering
        </Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default PreFinalScreen;

const styles = StyleSheet.create({});
