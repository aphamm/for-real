import { StyleSheet, Text, View } from 'react-native';


export default function Post(props) {
  function getColor(num) {
    if (num > 0) {
      return {
        color: 'green',
      };
    }

    if (num < 0) {
      return {
        color: 'red',
      };
    }

    return {
      color: 'grey',
    };
  }

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.answer}>{props.answer}</Text>
        <View style={styles.userandtime}>
          <Text style={styles.username}>{props.user}</Text>
          <Text style={styles.username}> - </Text>
          <Text style={styles.time}>5 mins ago</Text>
        </View>
      </View>
      
      <View style={styles.numberContainer}>
        <Text>∧</Text>
        <Text style={[styles.number, getColor(props.number)]}>{props.number}</Text>
        <Text>∨</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  
  
  container: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'row',
    padding: 30,
    borderColor: 'grey',
    borderBottomWidth: 1,
  },
  textContainer: {
    flex: 8,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  numberContainer: {
    flex: 2.5,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userandtime: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  number: {
    fontSize: 26,
  },
  answer: {
    fontSize: 14,
    marginBottom: 15,
  },
  username: {
    fontWeight: 'bold',
    fontSize: 12,
  },
  time: {
    fontSize: 10,
    color: 'grey',
  },
});
