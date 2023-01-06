import { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Modal,
} from 'react-native'
import { Searchbar } from 'react-native-paper'
import axios from 'axios'
export default function SearchBar({ navigation }) {
  const [input, setInput] = useState('')
  const [productList, setProductsList] = useState([])

  const searhFor = async (input) => {
    if (input.length >= 1) {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/products/?search=${input}`
        )
        setProductsList(response.data)
      } catch (err) {
        console.info(err)
      }
    } else {
      setProductsList([])
    }
  }

  return (
    <View>
      <Searchbar
        placeholder="Search"
        onChangeText={(value) => {
          setInput(value)
          searhFor(value)
        }}
        value={input}
        style={{ marginHorizontal: '2.5%', backgroundColor: 'white' }}
        elevation={0}
        selectionColor={'black'}
      />
      <View style={{ marginHorizontal: '2.5%', backgroundColor: 'white' }}>
        {productList.slice(0, 3).map((product) => {
          return (
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {
                navigation.navigate('DetailProduct', {
                  name: product.name,
                  price: product.price,
                  image: product.image,
                  description: product.description,
                  id: product.id,
                })
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: '2.5%',
                  marginLeft: '2.5%',
                  borderTopColor: 'black',
                  borderTopWidth: 0.2,
                }}
              >
                <Image
                  source={{ uri: `${product.image}` }}
                  style={{ width: 100, height: 100 }}
                  resizeMode="contain"
                />
                <Text
                  style={{ fontSize: 16, fontWeight: '600', marginLeft: '5%' }}
                >
                  {product.name}
                </Text>
              </View>
            </TouchableOpacity>
          )
        })}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({})
