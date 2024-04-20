import { StyleSheet } from 'react-native';

import { Text } from 'react-native-paper';
import EditScreenInfo from '@/components/EditScreenInfo';
import { View } from '@/components/Themed';

export default function Habits() {
  return (
    <View style={styles.container}>
      <Text>Habits</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
