import React from 'react';
import { Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Header from './components/Header';
import Drawer from './components/Drawer';
import Home from './pages/Home';
import Favorites from './pages/Favorites';

function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [cartOpened, setCartOpened] = React.useState(false);

  React.useEffect(() => {
    async function fetchData() {
      const cartResponse = await axios.get('https://66c4b6a6b026f3cc6cf06c1e.mockapi.io/cart');
      const favoritesResponse = await axios.get('https://67153ecc33bc2bfe40b9e441.mockapi.io/favorites');
      const itemsResponse = await axios.get('https://66c4b6a6b026f3cc6cf06c1e.mockapi.io/items');

  
      setCartItems(cartResponse.data);
      setFavorites(favoritesResponse.data);
      setItems(itemsResponse.data);
    }

    fetchData();
  }, []);

  const onAddToCart = (obj) => {
    console.log(obj);
    if(cartItems.find((item) => Number(item.id) === Number(obj.id))) {
      axios.delete(`https://66c4b6a6b026f3cc6cf06c1e.mockapi.io/cart/${obj.id}`);
      setCartItems(prev => prev.filter(i => Number(i.id) !== Number(obj.id)));
    } else {
      axios.post('https://66c4b6a6b026f3cc6cf06c1e.mockapi.io/cart', obj);
      setCartItems(prev => [...prev, obj]);
    }
  }

  const onRemoveItem = (id) => {
      console.log('Removing item from cart:', id); // Логируем удаление
      // Удаляем из API
      axios.delete(`https://66c4b6a6b026f3cc6cf06c1e.mockapi.io/cart/${id}`)
          .then(() => {
              // Удаляем из состояния после успешного удаления из API
              setCartItems(prev => prev.filter(item => Number(item.id) !== Number(id)));
              console.log(`Item with id ${id} removed from state`);
          })
          .catch((error) => console.error(`Error removing item with id ${id}:`, error));
  }


  const onAddToFavorite = async (obj) => {
    try {
      if (!obj.id) {
        console.error('Object does not have an ID:', obj);
        return;
      }
  
      const isFavorite = favorites.find(favObj => favObj.id === obj.id);
  
      if (isFavorite) {
        await axios.delete(`https://67153ecc33bc2bfe40b9e441.mockapi.io/favorites/${obj.id}`);
      } else {
        const { data } = await axios.post('https://67153ecc33bc2bfe40b9e441.mockapi.io/favorites', obj);
        setFavorites(prev => [...prev, data]);
      }
    } catch (error) {
      console.error('Error in onAddToFavorite:', error);
    }
  }

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  }

  return (
    <div className="wrapper clear">
      {cartOpened ? <Drawer onRemove={onRemoveItem} items={cartItems} onClose = {() => setCartOpened(false)}/> : null}
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
            />
          }
        />

        <Route 
            path='/favorites' 
            element={
              <Favorites items={favorites} onAddToFavorite={onAddToFavorite}/>
            }
        />
      </Routes>


    </div>
  );
}

export default App;
