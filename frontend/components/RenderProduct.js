import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native'

export default function RenderProduct({ productList, navigation }) {
  const renderItem = ({ item }) => {
    return (
      <View style={styles.productContainer}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            navigation.navigate('DetailProduct', {
              name: item.name,
              price: item.price,
              image: item.image,
              description: item.description,
              id: item.id,
            })
          }}
        >
          <View>
            <Image
              source={{ uri: `${item.image}` }}
              resizeMode="contain"
              style={styles.productImage}
            />
            <View style={styles.infoContainer}>
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productPrice}>{item.price} $</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
  return (
    <FlatList
      style={styles.productListContainer}
      data={productList}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      numColumns={2}
    />
  )
}

const styles = StyleSheet.create({
  productListContainer: {
    marginTop: '2.5%',
    alignSelf: 'center',
  },
  productContainer: {
    width: '45%',
    borderRadius: 15,
    backgroundColor: 'white',
    marginHorizontal: '2.5%',
    marginBottom: '10%',
    height: 200,
  },
  productImage: {
    width: 100,
    alignSelf: 'center',
    height: '50%',
  },
  infoContainer: {
    height: '49.5%',
    backgroundColor: 'black',
    borderRadius: 15,
    padding: '10%',
    marginHorizontal: '1.5%',
  },
  productName: {
    position: 'absolute',
    top: '20%',
    left: '10%',
    fontWeight: '600',
    fontSize: 15,
    color: 'white',
  },
  productPrice: {
    marginTop: '30%',
    fontWeight: '600',
    color: '#F8F32B',
  },
})
