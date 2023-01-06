import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addProductToCart } from '../../redux/CartSlice'
import Heart from '../../components/Heart'

export default function DetailProductScreen({ navigation, route }) {
  // Redux State
  const dispath = useDispatch()
  const addToCart = () =>
    dispath(addProductToCart({ id, name, price, image, quantity }))
  const products = useSelector((state) => state.cart.products)

  // Data from API
  const name = route.params.name
  const price = route.params.price
  const description = route.params.description
  const image = route.params.image
  const id = route.params.id
  const quantity = 1

  // Ui
  const [addToCartStatus, setAddToCartStatus] = useState(false)
  const [addToCartOpacity, setAddToCartOpacity] = useState(1)

  function getBtnStatus() {
    const product = products.find((product) => product.id === id)
    if (product) {
      setAddToCartStatus(true)
      setAddToCartOpacity(0.5)
    } else {
      setAddToCartStatus(false)
      setAddToCartOpacity(1)
    }
  }

  useEffect(() => {
    getBtnStatus()
  }, [products])

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          height: '5%',
          top: '13%',
          alignSelf: 'center',
          zIndex: 200,
        }}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            navigation.navigate('Home')
          }}
        >
          <Ionicons
            name="arrow-back-circle"
            size={'40%'}
            color="black"
            style={{ marginRight: '72%' }}
          />
        </TouchableOpacity>
        <Heart
          width={30}
          height={40}
          id={id}
          price={price}
          image={image}
          name={name}
        />
      </View>
      <View style={styles.productImageContainer}>
        <Image
          source={{ uri: `${image}` }}
          resizeMode="contain"
          style={{ width: '100%', height: '50%' }}
        />
      </View>
      <View style={styles.productInfoContainer}>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.productName}>{name}</Text>
          <Text style={styles.productPrice}>{price} $</Text>
        </View>
        <ScrollView style={{ marginTop: '5%', marginBottom: '34%' }}>
          <View>
            <Text style={styles.productAbout}>About {name}</Text>
            <Text style={styles.productDescription}>{description}</Text>
          </View>
        </ScrollView>
        <View
          style={{
            position: 'absolute',
            bottom: '10%',
            marginHorizontal: '5%',
            width: '100%',
            alignSelf: 'center',
          }}
        >
          <TouchableOpacity
            onPress={() => {
              console.log('Buy Now')
            }}
          >
            <View style={styles.buyNow}>
              <Text style={styles.buyNowText}>Buy Now</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={addToCartStatus}
            onPress={() => {
              addToCart()
            }}
          >
            <View style={[styles.addToCart, { opacity: addToCartOpacity }]}>
              <Text style={[styles.addToCartText]}>Add To Cart</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    zIndex: 1,
  },
  productInfoContainer: {
    backgroundColor: 'black',
    height: '45%',
    padding: '5%',
  },
  productImageContainer: {
    height: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  productName: {
    color: 'white',
    fontWeight: '600',
    fontSize: 20,
  },
  productPrice: {
    fontWeight: '600',
    fontSize: 20,
    color: '#F8F32B',
    right: 0,
    position: 'absolute',
  },
  productDescription: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
    marginTop: '4%',
  },
  productAbout: {
    color: 'white',
    fontWeight: '600',
    fontSize: 20,
  },
  buyNow: {
    backgroundColor: '#F8F32B',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '5%',
    zIndex: 200,
  },
  addToCart: {
    borderColor: '#F8F32B',
    borderWidth: 2,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addToCartText: {
    color: 'white',
    fontSize: 16,
    padding: '2%',
    fontWeight: '600',
  },
  buyNowText: {
    fontSize: 16,
    padding: '2%',
    fontWeight: '600',
  },
})
