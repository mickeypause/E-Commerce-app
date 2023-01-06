import 'react-native-gesture-handler'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import TabBarNav from './navigation/TabBarNav'
import { Provider } from 'react-redux'
import Store from './redux/Store'

export default function appWrapper() {
  return (
    <Provider store={Store}>
      <App />
    </Provider>
  )
}

function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <TabBarNav />
      </NavigationContainer>
      <StatusBar style="dark" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
})
