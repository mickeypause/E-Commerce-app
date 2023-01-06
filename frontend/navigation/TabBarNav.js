import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../screens/main/HomeScreen'
import StackNav from './StackNav'
import CartScreen from '../screens/main/CartScreen'
import FavouriteScreen from '../screens/main/FavouriteScreen'
import AccountScreen from '../screens/main/AccountScreen'
import { Image } from 'react-native'
const Tab = createBottomTabNavigator()

export default function TabBarNav() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconUrl
          let iconColor
          iconColor = focused ? '#F8F32B' : 'white'
          if (route.name === 'HomeTab') {
            iconUrl = focused
              ? require('../images/tabBar/homeBtnFocused.png')
              : require('../images/tabBar/homeBtn.png')
          } else if (route.name === 'Cart') {
            iconUrl = focused
              ? require('../images/tabBar/cartBtnFocused.png')
              : require('../images/tabBar/cartBtn.png')
          } else if (route.name === 'Favourite') {
            iconUrl = focused
              ? require('../images/tabBar/favourteBtnFocused.png')
              : require('../images/tabBar/favouriteBtn.png')
          } else if (route.name === 'Account') {
            iconUrl = focused
              ? require('../images/tabBar/accountBtnFocused.png')
              : require('../images/tabBar/accountBtn.png')
          }
          return (
            <Image
              source={iconUrl}
              style={{
                tintColor: iconColor,
                width: 30,
                height: 30,
                marginTop: '25%',
              }}
              resizeMode="contain"
            />
          )
        },
        tabBarStyle: {
          backgroundColor: 'black',
          borderWidth: 0,
          borderTopWidth: 0,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="HomeTab"
        component={StackNav}
        options={{ headerShown: false, title: '' }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{ headerShown: false, title: '' }}
      />
      <Tab.Screen
        name="Favourite"
        component={FavouriteScreen}
        options={{ headerShown: false, title: '' }}
      />
      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{ headerShown: false, title: '' }}
      />
    </Tab.Navigator>
  )
}
