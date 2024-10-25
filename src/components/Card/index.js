import React from 'react';
import styles from './Card.module.scss';
import ContentLoader from "react-content-loader";
import AppContext from '../../pages/context';

function Card({ id, onClickFavorite, title, description, imageUrl, price, onPlus, favorited = false, loading = false}) {
    const [isFavorite, setIsFavorite] = React.useState(favorited);
    const {isItemAdded} = React.useContext(AppContext);

    const onClickPlus = () => {
        onPlus({id, title, imageUrl, price});
    }

    const onTapFavorite = () => {
        onClickFavorite({id, title, imageUrl, price});
        setIsFavorite(!isFavorite);
    }

    return (
    <div className={styles.card}>
        {
            loading ? <ContentLoader 
            speed={2}
            width={150}
            height={265}
            viewBox="0 0 150 265"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
        >
            <rect x="28" y="44" rx="0" ry="0" width="30" height="0" /> 
            <rect x="73" y="97" rx="0" ry="0" width="1" height="0" /> 
            <rect x="89" y="111" rx="0" ry="0" width="0" height="1" /> 
            <rect x="0" y="0" rx="10" ry="10" width="150" height="112" /> 
            <rect x="0" y="126" rx="5" ry="5" width="150" height="15" /> 
            <rect x="0" y="147" rx="5" ry="5" width="100" height="15" /> 
            <rect x="-1" y="193" rx="5" ry="5" width="80" height="25" /> 
            <rect x="114" y="188" rx="10" ry="10" width="32" height="32" />
        </ContentLoader> :         
        <>
            <div className={styles.favorite}>
                <img src={isFavorite ? "/img/heart-liked.svg" : "/img/heart-unliked.svg"}  alt='Unliked' onClick={onTapFavorite}/>
            </div>
            <img width={133} height={112} src={imageUrl} alt="Macarons"/>
            <h5>{title}</h5>
            <h6>{description}</h6>
            <div className="d-flex justify-between align-center">
                <div className="d-flex flex-column">
                <span>Price:</span>
                <b>{price}</b>
                </div>
                <img className={styles.plus} onClick={onClickPlus} 
                    src={isItemAdded(id) ? "/img/btn-checked.svg" : "/img/btn-plus.svg"} 
                    alt="Plus"
                />
            </div>
        </>
        }
    </div>
    )
}

export default Card;