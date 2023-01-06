import { createStackNavigator } from '@react-navigation/stack'

import DetailProductScreen from '../screens/product/DetailProductScreen'
import HomeScreen from '../screens/main/HomeScreen'
const Stack = createStackNavigator()

export default function StackNav() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DetailProduct"
        component={DetailProductScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}
