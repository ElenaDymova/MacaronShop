import React from 'react';
import { Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Header from './components/Header/Header';
import Drawer from './components/Drawer/Drawer';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Orders from './pages/Orders';
import AppContext from './pages/context';


function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [cartOpened, setCartOpened] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const cartResponse = await axios.get('https://66c4b6a6b026f3cc6cf06c1e.mockapi.io/cart');
        const favoritesResponse = await axios.get('https://67153ecc33bc2bfe40b9e441.mockapi.io/favorites');
        const itemsResponse = await axios.get('https://66c4b6a6b026f3cc6cf06c1e.mockapi.io/items');

        setIsLoading(false);

        setCartItems(cartResponse.data);
        setFavorites(favoritesResponse.data);
        setItems(itemsResponse.data);
      } catch (error){
        alert('mistake')
      }
    }

    fetchData();
  }, []);

  const onAddToCart = async (obj) => {
    try {
      const itemToAdd = { ...obj, parentId: obj.id }; // Добавляем parentId к объекту
      console.log(itemToAdd); // Проверяем, что parentId добавлен
      const findItem = cartItems.find((item) => Number(item.parentId) === Number(obj.id));

      if(findItem) {
        setCartItems(prev => prev.filter(i => Number(i.parentId) !== Number(obj.id)));
        await axios.delete(`https://66c4b6a6b026f3cc6cf06c1e.mockapi.io/cart/${findItem.id}`);
      } else {
        setCartItems(prev => [...prev, itemToAdd]);
        const {data} = await axios.post('https://66c4b6a6b026f3cc6cf06c1e.mockapi.io/cart', itemToAdd);
        setCartItems(prev => prev.map(item => {
          if(item.parentId === data.parentId) {
            return {
              ...item,
              id: data.id
            }
          }
          return item;
        }));
      }
    } catch (error) {
      alert('error when adding to the cart');
      console.error(error);
    }
  
  }

  const onRemoveItem = async (id) => {
    try {
      console.log('Removing item from cart:', id); // Логируем удаление
      // Удаляем из API
      await axios.delete(`https://66c4b6a6b026f3cc6cf06c1e.mockapi.io/cart/${id}`)
          .then(() => {
              // Удаляем из состояния после успешного удаления из API
              setCartItems(prev => prev.filter((item) => Number(item.id) !== Number(id)));
              console.log(`Item with id ${id} removed from state`);
          })
          .catch((error) => console.error(`Error removing item with id ${id}:`, error));
    } catch(error) {
      alert('error when deleting from the trash');
      console.error(error);
    }
  }


  const onAddToFavorite = async (obj) => {
    try {
      if (!obj.id) {
        console.error('Object does not have an ID:', obj);
        return;
      }
  
      const isFavorite = favorites.find(favObj => Number(favObj.id) === Number(obj.id));
  
      if (isFavorite) {
        await axios.delete(`https://67153ecc33bc2bfe40b9e441.mockapi.io/favorites/${obj.id}`);
        setFavorites(prev => prev.filter(i => Number(i.id) !== Number(obj.id)));
      } else {
        const { data } = await axios.post('https://67153ecc33bc2bfe40b9e441.mockapi.io/favorites', obj);
        setFavorites((prev) => [...prev, data])
      }
    } catch (error) {
      console.error('Error in onAddToFavorite:', error);
    }
  }

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  }

  const isItemAdded = (id) => {
    return cartItems.some(item => Number(item.parentId) === Number(id));
  }

  return (
    <AppContext.Provider value={{items, cartItems, favorites, isItemAdded, onAddToFavorite, setCartOpened, setCartItems, onAddToCart}}>
      <div className="wrapper clear">
        <Drawer 
          onRemove={onRemoveItem} 
          items={cartItems} 
          onClose = {() => setCartOpened(false)} 
          opened={cartOpened}
        />

        <Header onClickCart = {() => setCartOpened(true)}/>

        <Routes>
          <Route 
            path='/' 
            element={
              <Home 
                items={items} 
                cartItems={cartItems}
                searchValue={searchValue} 
                setSearchValue={setSearchValue}
                onChangeSearchInput={onChangeSearchInput}
                onAddToFavorite={onAddToFavorite}
                onAddToCart={onAddToCart} 
                isLoading={isLoading}
              />
            }
          />

          <Route 
              path='/favorites' 
              element={
                <Favorites />
              }
          />

          <Route 
            path='/orders' 
            element={
              <Orders />
            }
          />
        </Routes>

      </div>
    </AppContext.Provider>
  );
}

export default App;
