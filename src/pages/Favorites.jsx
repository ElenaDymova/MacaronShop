import Card from "../components/Card";

function Favorites({ items, onAddToFavorite }) {
    return (
        <div className="content p-40">
            <div className="d-flex align-center justify-between mb-40">
                <h1>Мои закладки</h1>
            </div>

            <div className="d-flex flex-wrap">
                {items
                    .map((obj, index) => (
                    <Card 
                        key={index}
                        id={obj.id}
                        title={obj.name}
                        description={obj.description}
                        price={obj.price} 
                        imageUrl = {obj.img}
                        favorited={true}
                        onClickFavorite={onAddToFavorite}
                    />
                    ))
                }
            </div>
        </div>
    )
}

export default Favorites;