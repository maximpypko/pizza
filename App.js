import { StyleSheet, Text, View } from 'react-native';
import { mockItemData } from './utils/mock-data';
import ItemPizza from './components/ItemPizza';

export default function App() {
  return (
    <View style={styles.container}>
      <ItemPizza item={mockItemData} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    backgroundColor: '#DFF3E8',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
