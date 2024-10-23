import Card from '../components/Card';

function Home({ items, cartItems, searchValue, setSearchValue, onChangeSearchInput, onAddToFavorite, onAddToCart }) {
    return (
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
                    onClickFavorite = {(product) => onAddToFavorite(obj)}
                    onPlus = {(product) => onAddToCart(obj)}
                    added={cartItems.some(item => Number(item.id) === Number(obj.id))}
                    id={obj.id}
                />
                ))
            }
            </div>
        </div>
    )
}

export default Home;