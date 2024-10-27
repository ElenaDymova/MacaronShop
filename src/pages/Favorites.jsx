import React from "react";
import Card from "../components/Card";
import AppContext from "./context";

function Favorites() {
    const {favorites, onAddToFavorite} = React.useContext(AppContext);
  
    return (
        <div className="content p-40">
            <div className="title">
                <h1>Мои закладки</h1>
            </div>

            <div className="d-flex flex-wrap">
                {favorites
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