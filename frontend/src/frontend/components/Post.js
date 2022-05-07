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
      <View style={styles.leftContainer}>
        <Text style={styles.username}>{props.user}</Text>
        <Text style={styles.answer}>{props.answer}</Text>
      </View>
      <View style={styles.rightContainer}>
        <Text>Up</Text>
        <Text style={[styles.number, getColor(props.number)]}>
          {props.number}
        </Text>
        <Text>Down</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  number: {
    fontSize: 35,
    margin: 10,
  },
  answer: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  username: {
    marginBottom: 30,
    fontWeight: 'bold',
    fontSize: 15,
  },
  rightContainer: {
    flex: 2,
    padding: 6,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftContainer: {
    flex: 8,
  },
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'row',
    padding: 30,
    borderColor: 'grey',
    borderBottomWidth: 1,
  },
});
