import React from 'react';
import Card from './components/Card';
import Header from './components/Header';
import Drawer from './components/Drawer';

function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [cartOpened, setCartOpened] = React.useState(false);

  React.useEffect(() => {
    fetch('https://66c4b6a6b026f3cc6cf06c1e.mockapi.io/items').then(res => {
      return res.json();
    }).then(json => {
      setItems(json);
    });
  }, [])

  const onAddToCart = (obj) => {
    setCartItems(prev => [...prev, obj]);
  }

  return (
    <div className="wrapper clear">
      {cartOpened ? <Drawer items={cartItems} onClose = {() => setCartOpened(false)}/> : null}
      <Header onClickCart = {() => setCartOpened(true)}/>

      <div className="content p-40">
        <div className="d-flex align-center justify-between mb-40">
          <h1>All desserts</h1>
          <div className="search-block d-flex">
            <img src="/img/search.svg" alt="Search"/>
            <input placeholder="Поиск..."/>
          </div>
        </div>

        <div className="d-flex flex-wrap">
          {items.map((obj) => (
              <Card 
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
