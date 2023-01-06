import { useEffect, useState } from 'react'
import { TouchableOpacity, Image } from 'react-native'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { addToFavourite, removeFromFavourite } from '../redux/FavoutiteSlice'
export default function Heart({ width, height, id, name, price, image }) {
  //Redux
  const dispatch = useDispatch()
  const addProduct = () => dispatch(addToFavourite({ id, name, price, image }))
  const removeProduct = () => dispatch(removeFromFavourite({ id }))
  const products = useSelector((state) => state.favourite.products)

  function getHeartStyle() {
    const product = products.find((product) => product.id === id)
    if (product) {
      setHeartBtn('#F8F32B')
      setHeartImage(require('../images/tabBar/favourteBtnFocused.png'))
    } else {
      setHeartBtn('black')
      setHeartImage(require('../images/tabBar/favouriteBtn.png'))
    }
  }

  useEffect(() => {
    getHeartStyle()
  }, [products])

  const [heartBtn, setHeartBtn] = useState('black')
  const [heartImage, setHeartImage] = useState(
    require('../images/tabBar/favouriteBtn.png')
  )

  const actionProduct = () => {
    if (heartBtn === 'black') {
      addProduct()
    } else {
      removeProduct()
    }
  }

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => {
        actionProduct()
      }}
    >
      <Image
        source={heartImage}
        resizeMode="contain"
        style={{ width: width, height: height, tintColor: heartBtn }}
      />
    </TouchableOpacity>
  )
}
