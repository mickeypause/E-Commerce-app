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
import { removeAllProductsFromFavourite } from '../../redux/FavoutiteSlice'
import Heart from '../../components/Heart'
export default function CartScreen({ navigation }) {
  // Redux
  const products = useSelector((state) => state.favourite.products)
  const dispatch = useDispatch()

  return (
    <SafeAreaView>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Favourite</Text>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            Alert.alert(
              `Remove all items from Favourite`,
              'Are you sure, you want to remove all items?',
              [
                {
                  text: 'Cancel',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                {
                  text: 'Yes',
                  onPress: () => dispatch(removeAllProductsFromFavourite([])),
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
                    style={{ marginTop: '2%' }}
                    onPress={() => {}}
                  >
                    <Heart width={30} height={30} id={id} img={item.image} />
                  </TouchableOpacity>
                </View>
                <View style={styles.infoContainer}>
                  <Text style={styles.productName}>{item.name}</Text>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.productPrice}>{item.price} $</Text>
                  </View>
                </View>
              </View>
            </View>
          )
        })}
      </ScrollView>
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
    alignSelf: 'center',
  },
})
