import { StyleSheet, Text, View, FlatList } from 'react-native';
import Navigator from './src/frontend/routes/NavStack';
import Feed from './src/frontend/Screens/Feed';

export default function App() {
  return <Navigator />;
}

const styles = StyleSheet.create({});
