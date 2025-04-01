import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  Pressable,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';

const RegisterScreen = () => {
  const [email, setEmail] = useState('');
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{}}>
      <View style={{padding: 13}}>
        <Text style={{fontSize: 16, fontWeight: '500'}}>
          You're Almost There
        </Text>

        <View style={{flexDirection: 'column', gap: 16, marginVertical: 40}}>
          <Text>Enter Email</Text>

          <TextInput
            value={email}
            onChangeText={setEmail}
            style={{
              padding: 20,
              borderColor: '#D0D0D0',
              borderWidth: 1,
              borderRadius: 10,
            }}
          />
          <Pressable
            onPress={() => navigation.navigate('Password')}
            style={{
              padding: 15,
              backgroundColor: email?.length > 4 ? '#2dcf30' : '#E0E0E0',
              borderRadius: 8,
            }}>
            <Text style={{textAlign: 'center'}}>Next</Text>
          </Pressable>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text
              style={{textAlign: 'center', fontWeight: '500', fontSize: 15}}>
              I agree to recieve updates over Whatsapp
            </Text>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 15,
                color: 'gray',
                marginTop: 20,
              }}>
              By Signing up, you agree to the terms of service and privacy
              policy
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({});
