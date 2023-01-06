import { useEffect, useState } from 'react'
import {
  View,
  Text,
  TouchableHighlight,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Image,
  FlatList,
} from 'react-native'
import RenderProduct from '../../components/RenderProduct'
import SearchBar from '../../components/SearchBar'
import axios from 'axios'

export default function HomeScreen({ navigation }) {
  const productsUrl = 'http://127.0.0.1:8000/api/products/'
  const categoriesUrl = 'http://127.0.0.1:8000/api/categories/'
  const [productList, setProductsList] = useState([])

  const getProductList = async () => {
    try {
      const response = await axios.get(productsUrl)
      setProductsList(response.data)
    } catch (err) {
      console.info(err)
    }
  }

  useEffect(() => {
    getProductList()
  }, [])
  return (
    <SafeAreaView style={styles.safeArea}>
      <SearchBar navigation={navigation} />
      <View style={styles.container}>
        <ScrollView contentContainerStyle={{ paddingBottom: '30%' }}>
          <RenderProduct productList={productList} navigation={navigation} />
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#f4f4f4',
  },
  container: {
    marginTop: '5%',
    width: '100%',
    height: '100%',
    backgroundColor: '#f4f4f4',
  },
  searchBar: {
    width: '100%',
    height: '3%',
    backgroundColor: 'red',
  },
  salesContainer: {
    backgroundColor: 'green',
    width: '90%',
    height: 200,
    alignSelf: 'center',
    borderRadius: 15,
  },
  productListContainer: {
    marginTop: '10%',

    alignSelf: 'center',
  },
})
