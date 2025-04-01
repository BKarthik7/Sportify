import {use, useEffect} from 'react';
import {createContext, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';

const AuthContext = createContext();

const AuthProvider = ({children}) => {
  const [token, setToken] = useState('');
  const [userId, setUserId] = useState('');
  const [upcomingGames, setUpcomingGames] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem('token');
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId;
      setUserId(userId);
    };
  }, []);

  return <AuthContext.Provider>{children}</AuthContext.Provider>;
};

export {AuthContext, AuthProvider};
