import React from "react";
import Info from "./Info";
import AppContext from "../pages/context";
import axios from "axios";

// const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function Drawer({ onClose, onRemove, items = [] }) {
    const {cartItems, setCartItems} = React.useContext(AppContext);
    const [isOrderCompleted, setIsOrderComplited] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const [orderId, setOrderId] = React.useState(null);

    const clearCartInMockAPI = async () => {
        try {
            // Удаляем каждый элемент корзины по его id
            await Promise.all(cartItems.map((item) => 
                axios.delete(`https://66c4b6a6b026f3cc6cf06c1e.mockapi.io/cart/${item.id}`)
            ));
            setCartItems([]); // Очищаем локальное состояние корзины
        } catch (error) {
            console.error("Error clearing the cart in MockAPI:", error);
        }
    };
    
    const onClickOrder = async () => {
        try {
            setIsLoading(true);
            const { data } = await axios.post('https://67153ecc33bc2bfe40b9e441.mockapi.io/orders', {
                items: cartItems,
            });
            setOrderId(data.id);
            console.log("Order placed:", cartItems);
    
            setIsOrderComplited(true);
            await clearCartInMockAPI(); 
        } catch (error) {
            alert("Some mistake!");
            console.log(error);
        }
        setIsLoading(false);
    };


    return (
        <div className="overlay">
            <div className="drawer">
                <h2 className="d-flex justify-between mb-30">Shopping cart 
                    <img onClick={onClose} className="removeBtn cu-p" src="/img/btn-remove.svg" alt="remove"/>
                </h2>

                {
                    items.length > 0 ? 
                    <div className="d-flex flex-column flex">
                        <div className="items">
                            {items.map((obj) => (
                                <div key={obj.id} className="cartItem d-flex align-center mb-20">
                                    <div style={{ backgroundImage: `url(${obj.img})` }} className="cartItemImg"></div>
                                    <div className="mr-20">
                                    <p className="mb-5">{obj.name}</p>
                                    <b>{obj.price}</b>
                                    </div>
                                    <img onClick={() => onRemove(obj.id)} className="removeBtn" src="/img/btn-remove.svg" alt="remove"/>
                                </div>
                            ))}
                        </div>
                        <div className="cartTotalBlock">
                            <ul>
                                <li>
                                <span>Итого:</span>
                                <div></div>
                                <b>200$</b>
                                </li>
                                <li>
                                <span>Tax 5%:</span>
                                <div></div>
                                <b>10$</b>
                                </li>
                            </ul>
                            <button disabled={isLoading} onClick={onClickOrder} className="pinkButton">Place an order <img src="/img/arrow.svg" alt="arrow"/> </button>
                        </div>
                    </div> :
                    <Info 
                        title={isOrderCompleted ? "The order has been placed" : "Empty shopping cart" }
                        description={isOrderCompleted ? `Your order #${orderId} will be delivered by courier soon`  : "Add at least 1 dessert to place an order" }
                        image={isOrderCompleted ? "/img/completed-order.svg" : "/img/empty-cart.svg"}/>
                }

            </div>
        </div>
    )
}

export default Drawer;