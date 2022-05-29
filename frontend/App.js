import { StyleSheet, Text, View, FlatList } from 'react-native';
import Navigator from './src/frontend/routes/NavStack';
import Feed from './src/frontend/Screens/Feed';
import Profile from './src/frontend/Screens/Profile';

import {UserContextProvider} from './src/context/userContext';

export default function App() {
  
  return (
    <UserContextProvider>
    <Navigator />
    </UserContextProvider>
    
    
    );
}

const styles = StyleSheet.create({});
