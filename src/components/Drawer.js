function Drawer({ onClose, items = [] }) {
    return (
        <div className="overlay">
            <div className="drawer">
                <h2 className="d-flex justify-between mb-30">Shopping cart 
                <img onClick={onClose} className="removeBtn cu-p" src="/img/btn-remove.svg" alt="remove"/>
                </h2>

                <div className="items">
                    {items.map((obj) => (
                        <div className="cartItem d-flex align-center mb-20">
                            <div style={{ backgroundImage: `url(${obj.img})` }} className="cartItemImg"></div>
                            <div className="mr-20">
                            <p className="mb-5">{obj.name}</p>
                            <b>{obj.price}</b>
                            </div>
                            <img className="removeBtn" src="/img/btn-remove.svg" alt="remove"/>
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

            </div>
        </div>
    )
}

export default Drawer;