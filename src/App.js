import React from 'react';
import axios from 'axios';
import Card from './components/Card';
import Header from './components/Header';
import Drawer from './components/Drawer';

function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [cartOpened, setCartOpened] = React.useState(false);

  React.useEffect(() => {
    axios.get('https://66c4b6a6b026f3cc6cf06c1e.mockapi.io/items').then(res => {
      setItems(res.data)
    });
    axios.get('https://66c4b6a6b026f3cc6cf06c1e.mockapi.io/cart').then(res => {
      setCartItems(res.data)
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

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  }

  return (
    <div className="wrapper clear">
      {cartOpened ? <Drawer onRemove={onRemoveItem} items={cartItems} onClose = {() => setCartOpened(false)}/> : null}
      <Header onClickCart = {() => setCartOpened(true)}/>

      <div className="content p-40">
        <div className="d-flex align-center justify-between mb-40">
          <h1>{searchValue ? `search by: "${searchValue}"` : 'All desserts'}</h1>
          <div className="search-block d-flex">
            <img src="/img/search.svg" alt="Search"/>
            {searchValue && (
              <img 
                onClick={() => setSearchValue('')}
                className="removeBtn clear cu-p" 
                src="/img/btn-remove.svg" 
                alt="Clear"
              />)}
            <input onChange={onChangeSearchInput} value={searchValue} placeholder="Поиск..."/>
          </div>
        </div>

        <div className="d-flex flex-wrap">
          {items
            .filter(item => 
              item.name.toLowerCase().includes(searchValue.toLowerCase()) || 
              item.description.toLowerCase().includes(searchValue.toLowerCase()) 
            )
            .map((obj, index) => (
              <Card 
                key={index}
                title={obj.name}
                description={obj.description}
                price={obj.price} 
                imageUrl = {obj.img}
                onClickFavorite = {() => console.log('добавили в закладки')}
                onPlus = {(product) => onAddToCart(obj)}
              />
            ))
          }
        </div>


      </div>
    </div>
  );
}

export default App;
