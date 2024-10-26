import React from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../pages/context';

function Header(props) {
    const { cartItems } = React.useContext(AppContext);
    const totalPrice = cartItems.reduce((sum, obj) => obj.price + sum, 0);

    return (
        <header className="d-flex justify-between align-center p-40">
            <Link to="/">
                <div className="d-flex align-center">
                    <img width={50} height={50} src="img/logo.svg" alt="logo"/>
                    <div>
                        <h3 className="text-uppercase">MACARON SHOP</h3>
                        <p className="opacity-5">Shop for desserts made from natural ingredients</p>
                    </div>
                </div>
            </Link>
            <ul className="d-flex">
            <li onClick={props.onClickCart} className="mr-30 cu-p">
                <img width={18} height={18} src="img/cart.svg" alt="cart"/>
                <span>{totalPrice}$</span>
            </li>
            <li className="mr-20 cu-p">
                <Link to="/favorites">
                    <img width={18} height={18} src="img/like.svg" alt="heart"/>
                </Link>
            </li>
            <li>
                <Link to="/orders">
                    <img width={18} height={18} src="img/user.svg" alt="user"/>
                </Link>
            </li>
            </ul>
        </header>
    )
}

export default Header;