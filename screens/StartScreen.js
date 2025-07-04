import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  Pressable,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import MapView, {Marker} from 'react-native-maps';
import {useNavigation} from '@react-navigation/native';

const StartScreen = () => {
  const mapView = useRef(null);
  const [coordinates] = useState([
    {
      latitude: 12.9716,
      longitude: 77.5946,
    },
    {
      latitude: 13.0451,
      longitude: 77.6269,
    },
  ]);
  const BANGALORE_COORDS = {
    latitude: 12.967,
    longitude: 77.594,
  };
  const navigation = useNavigation();

  const generateCircularPoints = (center, radius, numPoints) => {
    const points = [];
    const angleStep = (2 * Math.PI) / numPoints;

    for (let i = 0; i < numPoints; i++) {
      const angle = i * angleStep;
      const latitude = center.latitude + (radius / 111) * Math.cos(angle);
      const longitude =
        center.longitude +
        (radius / (111 * Math.cos(center.latitude))) * Math.sin(angle);
      points.push({latitude, longitude});
    }

    return points;
  };
  const numPoints = 6;
  const radius = 5;

  const user = [
    {
      image: 'https://randomuser.me/api/portraits/men/1.jpg',
      description: 'Hey!',
    },
    {
      image: 'https://randomuser.me/api/portraits/women/1.jpg',
      description: 'Playing Today',
    },
    {
      image: 'https://randomuser.me/api/portraits/men/2.jpg',
      description: "I'm always",
    },
    {
      image: 'https://randomuser.me/api/portraits/women/2.jpg',
      description: 'At 8pm?',
    },
    {
      image: 'https://randomuser.me/api/portraits/men/3.jpg',
      description: 'User 5: Nulla volutpat aliquam velit.',
    },
  ];
  const circularPoints = generateCircularPoints(
    BANGALORE_COORDS,
    radius,
    numPoints,
  );
  const users = [
    {
      image:
        'https://images.pexels.com/photos/7208625/pexels-photo-7208625.jpeg?auto=compress&cs=tinysrgb&w=800',
      id: '1',
      latitude: '13.1295',
      longitude: '79.5977',
      name: 'sujan',
      description: 'Hey!',
    },
    {
      image:
        'https://images.pexels.com/photos/2913125/pexels-photo-2913125.jpeg?auto=compress&cs=tinysrgb&w=800',
      id: '2',
      latitude: '13.155',
      longitude: '77.6070',
      name: 'suhas',
      description: "let's play",
    },
    {
      image:
        'https://images.pexels.com/photos/1042140/pexels-photo-1042140.jpeg?auto=compress&cs=tinysrgb&w=800',
      id: '3',
      latitude: '13.0977',
      longitude: '77.5839',
      name: 'ashish',
      description: "I'm always",
    },
    {
      image:
        'https://images.pexels.com/photos/4307678/pexels-photo-4307678.jpeg?auto=compress&cs=tinysrgb&w=800',
      id: '4',
      latitude: '13.0490',
      longitude: '77.5936',
      name: 'abhi',
      description: 'At 8pm?',
    },
    {
      image:
        'https://images.pexels.com/photos/1379031/pexels-photo-1379031.jpeg?auto=compress&cs=tinysrgb&w=800',
      id: '5',
      latitude: '13.0623',
      longitude: '77.5871',
      name: 'akash',
      description: 'Hey!',
    },
    {
      image:
        'https://images.pexels.com/photos/3264235/pexels-photo-3264235.jpeg?auto=compress&cs=tinysrgb&w=800',
      id: '6',
      latitude: '13.0354',
      longitude: '77.5988',
      name: 'Preetham',
      description: 'What up?',
    },
  ];

  // please give me com.google.android.geo.API_KEY
  useEffect(() => {
    mapView.current.fitToCoordinates(circularPoints, {
      edgePadding: {
        top: 70,
        bottom: 70,
        left: 70,
        right: 70,
      },
    });
  }, []);

  return (
    <>
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <MapView
          ref={mapView}
          style={{width: '100%', height: 400}}
          initialRegion={{
            latitude: BANGALORE_COORDS.latitude,
            longitude: BANGALORE_COORDS.longitude,
            latitudeDelta: 0.2,
            longitudeDelta: 0.1,
          }}>
          {circularPoints.map((point, index) => {
            const user = users[index % users.length];
            return (
              <Marker key={index} coordinate={point}>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: 33,
                    height: 33,
                    backgroundColor: 'yellow',
                    borderRadius: 20,
                  }}>
                  <Image
                    source={{uri: user.image}}
                    style={{
                      width: 30,
                      height: 30,
                      resizeMode: 'cover',
                      borderRadius: 15,
                    }}
                  />
                </View>
              </Marker>
            );
          })}
        </MapView>

        <View
          style={{
            marginTop: 35,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: '500',
              width: '50%',
              textAlign: 'center',
            }}>
            Find Player in Your neighbourhood
          </Text>

          <Text style={{marginTop: 20, color: 'gray', fontSize: 15}}>
            Just like you did as a Kid!
          </Text>
        </View>

        <Pressable
          style={{
            marginTop: 25,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => navigation.navigate('Login')}>
          <Text style={{color: 'gray', fontSize: 16}}>
            Already have an account? Login
          </Text>
        </Pressable>

        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 12,
          }}>
          <Image
            style={{width: 83, height: 45, resizeMode: 'contain'}}
            source={{
              uri: 'https://i.ibb.co/1SbPJL6/Sportify.jpg',
            }}
          />
        </View>
      </SafeAreaView>

      <View
        style={{
          padding: 10,

          backgroundColor: 'white',
          marginTop: 'auto',
        }}>
        <Pressable
          onPress={() => navigation.navigate('Register')}
          style={{
            marginTop: 'auto',
            backgroundColor: '#1ec921',
            padding: 12,
            borderRadius: 7,
            marginBottom: 20,
          }}>
          <Text style={{textAlign: 'center', fontSize: 16, color: 'white'}}>
            READY, SET, GO
          </Text>
        </Pressable>
      </View>
    </>
  );
};

export default StartScreen;

const styles = StyleSheet.create({});
