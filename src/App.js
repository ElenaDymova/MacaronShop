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
    axios.get('https://66c4b6a6b026f3cc6cf06c1e.mockapi.io/items').then(res => {
      setItems(res.data)
    });
    axios.get('https://66c4b6a6b026f3cc6cf06c1e.mockapi.io/cart').then(res => {
      setCartItems(res.data)
    });
    axios.get('https://67153ecc33bc2bfe40b9e441.mockapi.io/favorites').then(res => {
      setFavorites(res.data)
    });
  }, [])

  const onAddToCart = (obj) => {
    axios.post('https://66c4b6a6b026f3cc6cf06c1e.mockapi.io/cart', obj);
    setCartItems(prev => [...prev, obj]);
  }

  const onRemoveItem = (id) => {
    axios.delete(`https://66c4b6a6b026f3cc6cf06c1e.mockapi.io/cart/${id}`);
    setCartItems(prev => prev.filter(item => item.id !== id));
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
              searchValue={searchValue} 
              setSearchValue={setSearchValue}
              onChangeSearchInput={onChangeSearchInput}
              onAddToFavorite={onAddToFavorite}
              onAddToCart={onAddToCart} 
            />
          }
        />
      </Routes>

      <Routes>
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
