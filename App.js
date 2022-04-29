import { StyleSheet, Text, View, FlatList } from 'react-native';
import Post from './Post';

export default function App() {
  const dummyData = [
    {
      user: 'Thomas5236',
      answer: 'Fosizzle',
      number: 4,
    },
    {
      user: 'George1234',
      answer: 'This is a dumbie answer',
      number: 0,
    },
    {
      user: 'Angelina02184',
      answer: 'He touching the grass',
      number: 2,
    },
    {
      user: 'Sam20954',
      answer: 'Keep him from your daughters',
      number: -3,
    },
    {
      user: 'Eggert294',
      answer: 'Guy is a menace',
      number: 1,
    },
    {
      user: 'Eggert294',
      answer: 'Guy is a menace',
      number: 1,
    },
    {
      user: 'Eggert294',
      answer: 'Guy is a menace',
      number: 1,
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.questionofday}>
        <Text style={styles.question}>Is Austin Pham down bad?</Text>
      </View>
      <FlatList
        data={dummyData}
        renderItem={(item) => {
          console.log(item);
          return (
            <Post
              user={item.item.user}
              answer={item.item.answer}
              number={item.item.number}
              keyExtractor={(item) => item.user}
            />
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  question: {
    fontSize: 20,
  },
  questionofday: {
    backgroundColor: '#D3D3D3',
    width: '100%',
    padding: 40,
    borderRadius: 14,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  container: {},
});
