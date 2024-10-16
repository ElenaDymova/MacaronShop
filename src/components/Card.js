function Card() {
    return (
    <div className="card">
        <img width={133} height={112} src="/img/macarons/macaron2.png" alt="Macarons"/>
        <h5>Облепиха, розмарин</h5>
        <h6>Сезонный вкус: молочный шоколад, отборные свежие бананы</h6>
        <div className="d-flex justify-between align-center">
            <div className="d-flex flex-column">
            <span>Price:</span>
            <b>12$</b>
            </div>
            <button className="button">
            <img width={11} height={11} src="/img/plus.svg" alt="Plus"/>
            </button>
        </div>
    </div>
    )
}

export default Card;