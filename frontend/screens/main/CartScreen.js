import {
  View,
  Text,
  Image,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Alert,
} from 'react-native'
import { TouchableHighlight } from 'react-native-gesture-handler'
import { useSelector, useDispatch } from 'react-redux'
import { MaterialIcons } from '@expo/vector-icons'

import { AntDesign } from '@expo/vector-icons'
import {
  increment,
  removeProductFromCart,
  decrement,
  deleteAllProductsFromCart,
} from '../../redux/CartSlice'
import { useState } from 'react'
export default function CartScreen({ navigation }) {
  // Redux
  const products = useSelector((state) => state.cart.products)
  const dispatch = useDispatch()

  const [modalVisible, setModalVisible] = useState(false)

  function getTotalPrice() {
    let price = 0
    products.forEach((product) => {
      price += product.finalPrice
    })
    return price
  }
  return (
    <SafeAreaView>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Cart</Text>
        <TouchableOpacity
          onPress={() => {
            Alert.alert(
              `Remove all items from Cart`,
              'Are you sure, you want to remove all items?',
              [
                {
                  text: 'Cancel',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                {
                  text: 'Yes',
                  onPress: () => dispatch(deleteAllProductsFromCart([])),
                },
              ]
            )
          }}
        >
          <MaterialIcons
            name="more-horiz"
            size={50}
            color="black"
            style={styles.headerMoreBtn}
          />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={{ height: '100%' }}
        contentContainerStyle={{ paddingBottom: '21%' }}
      >
        {products.map((item) => {
          const id = item.id
          const price = item.price
          return (
            <View style={styles.productContainer}>
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    height: '50%',
                    width: '100%',
                    justifyContent: 'center',
                  }}
                >
                  <Image
                    source={{ uri: `${item.image}` }}
                    resizeMode="contain"
                    style={styles.productImage}
                  />
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => {
                      setModalVisible(true)
                    }}
                  >
                    <MaterialIcons name="more-horiz" size={30} color="black" />
                  </TouchableOpacity>
                </View>
                <View style={styles.infoContainer}>
                  <Text style={styles.productName}>{item.name}</Text>
                  <View style={{ flexDirection: 'row' }}>
                    <Modal
                      animationType="fade"
                      visible={modalVisible}
                      transparent={true}
                      onRequestClose={() => {
                        setModalVisible(!modalVisible)
                      }}
                    >
                      <View style={styles.modalContainer}>
                        <TouchableOpacity
                          style={{
                            width: '100%',
                            height: '100%',
                            position: 'absolute',
                          }}
                          onPress={() => {
                            setModalVisible(!modalVisible)
                          }}
                        >
                          <View></View>
                        </TouchableOpacity>
                        <View style={styles.optionsContainer}>
                          <TouchableOpacity
                            onPress={() => {
                              dispatch(removeProductFromCart({ id, price }))
                              setModalVisible(!modalVisible)
                            }}
                          >
                            <Text>Delete</Text>
                          </TouchableOpacity>
                          <TouchableOpacity>
                            <Text>Add to favourite</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </Modal>
                    <View
                      style={{
                        flexDirection: 'row',
                        marginTop: '5%',
                        alignItems: 'center',
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => {
                          dispatch(decrement({ id }))
                        }}
                      >
                        <AntDesign
                          name="minuscircleo"
                          size={24}
                          color="white"
                        />
                      </TouchableOpacity>
                      <Text
                        style={{ color: '#F8F32B', marginHorizontal: '10%' }}
                      >
                        {item.quantity}
                      </Text>
                      <TouchableOpacity
                        onPress={() => {
                          dispatch(increment({ id }))
                        }}
                      >
                        <AntDesign name="pluscircle" size={24} color="yellow" />
                      </TouchableOpacity>
                    </View>

                    <Text style={styles.productPrice}>{item.finalPrice} $</Text>
                  </View>
                </View>
              </View>
            </View>
          )
        })}
      </ScrollView>
      <View style={styles.footerContainer}>
        <Text style={styles.footerText}>Total amount</Text>
        <Text style={styles.totalAmount}>{getTotalPrice()} $</Text>
        <TouchableOpacity
          onPress={() => {
            console.log('But')
          }}
        >
          <View style={styles.buyContainer}>
            <Text style={styles.buyText}>Buy</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  // Header
  headerContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: '5%',
  },
  headerText: {
    fontSize: 30,
    fontWeight: '600',
  },
  headerMoreBtn: {},

  // Footer
  footerContainer: {
    width: '95%',
    height: '7%',
    backgroundColor: 'black',
    position: 'absolute',
    bottom: '7%',
    borderRadius: 15,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: '12%',
    zIndex: 1,
  },
  footerText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  totalAmount: {
    color: '#F8F32B',
    fontSize: 16,
    fontWeight: '600',
  },
  buyContainer: {
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#F8F32B',
    padding: '7%',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 200,
  },
  buyText: {
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
  },

  // Product
  productContainer: {
    width: '90%',
    borderRadius: 15,
    backgroundColor: 'white',
    marginHorizontal: '5%',
    marginBottom: '10%',
    height: 200,
    alignSelf: 'center',
  },
  productImage: {
    width: '80%',
    alignSelf: 'center',
    height: '80%',
    zIndex: 2,
    padding: '10%',
  },
  infoContainer: {
    height: '49.5%',
    backgroundColor: 'black',
    borderRadius: 15,
    padding: '5%',
    marginHorizontal: '1.5%',
  },
  productName: {
    fontWeight: '600',
    fontSize: 20,
    color: 'white',
  },
  productPrice: {
    marginTop: '5%',
    color: '#F8F32B',
    marginLeft: '48%',
    alignSelf: 'center',
  },

  // Modal
  optionsContainer: {
    backgroundColor: '#F8F32B',
    height: '8%',
    width: '30%',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: '66%',
    marginTop: '27%',
    borderRadius: 15,
  },
  modalContainer: {
    height: '100%',
  },
})
