import React from 'react';
import styles from './Card.module.scss';

function Card({ onClickFavorite, title, description, imageUrl, price, onPlus }) {
    const [isAdded, setIsAdded] = React.useState(false);

    const onClickPlus = () => {
        onPlus({title, imageUrl, price});
        setIsAdded(!isAdded);
    }

    return (
    <div className={styles.card}>
        <div className={styles.favorite}>
            <img src="/img/heart-unliked.svg" alt='Unliked' onClick={onClickFavorite}/>
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
                src={isAdded ? "/img/btn-checked.svg" : "/img/btn-plus.svg"} 
                alt="Plus"
            />
        </div>
    </div>
    )
}

export default Card;