import React from "react";
import Card from "../components/Card";
import axios from "axios";
import AppContext from "./context";

function Orders() {
    const {onAddToFavorite, onAddToCart} = React.useContext(AppContext);
    const [orders, setOrders] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        (async () => {
            try {
                const {data} = await axios.get('https://67153ecc33bc2bfe40b9e441.mockapi.io/orders');
                setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []));
                setIsLoading(false);
            } catch(error) {
                alert('mistake');
                console.log(error(error))
            }
        })();
    }, []);

    return (
        <div className="content p-40">
            <div className="title">
                <h1>My orders</h1>
            </div>

            <div className="d-flex flex-wrap">
                {(isLoading ? Array(8).fill(null) : orders).map((obj, index) => (
                    <Card
                        key={index}
                        onFavorite={(obj) => onAddToFavorite(obj)}
                        onPlus={() => onAddToCart(obj)}
                        loading={isLoading}  
                        title={obj?.name}        
                        description={obj?.description}
                        price={obj?.price} 
                        imageUrl={obj?.img}
                        id={obj?.id}
                    />
                    ))
                }
            </div>
        </div>
    )
}

export default Orders;