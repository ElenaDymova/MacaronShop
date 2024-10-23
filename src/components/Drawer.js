function Drawer({ onClose, onRemove, items = [] }) {
    return (
        <div className="overlay">
            <div className="drawer">
                <h2 className="d-flex justify-between mb-30">Shopping cart 
                    <img onClick={onClose} className="removeBtn cu-p" src="/img/btn-remove.svg" alt="remove"/>
                </h2>

                {
                    items.length > 0 ? 
                    <div>
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
                            <button className="pinkButton">Place an order <img src="/img/arrow.svg" alt="arrow"/> </button>
                        </div>
                    </div> :
                    <div className="cartEmpty d-flex align-center justify-center flex-column flex">
                        <img className="mb-20" width="120px" height="120px" src="/img/empty-cart.svg" alt="Empty cart"/>
                        <h2>Empty shopping cart</h2>
                        <p className="opacity-6">Add at least 1 dessert to place an order</p>
                        <button onClick={onClose} className="pinkButton">
                            <img src="/img/arrow.svg" alt="Arrow"/>
                            Go back
                        </button>
                    </div>
                }

            </div>
        </div>
    )
}

export default Drawer;