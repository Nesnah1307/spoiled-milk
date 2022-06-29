import React, { useState, useEffect } from 'react';
import './index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft, faCircle, faCheckCircle, faPlus } from '@fortawesome/free-solid-svg-icons';
import moment from  "moment";



const App = () => {

    const [items, setItems] = useState([
        { itemName: 'item 1', quantity: 1, isSelected: false },
        { itemName: 'item 2', quantity: 3, isSelected: true },
        { itemName: 'item 3', quantity: 2, isSelected: false },
    ]);

    return (
        <div className='item-list'>
            {items.map((item, index) => (
                <div className='item-container'>
                    <div className='item-name'>
                        {item.isSelected ? (
                            <>
                                <FontAwesomeIcon icon={faCheckCircle} />
                                <span className='completed'>{item.itemName}</span>
                            </>
                        ) : (
                            <>
                                <FontAwesomeIcon icon={faCircle} />
                                <span>{item.itemName}</span>
                            </>
                        )}
                    </div>
                    <div className='quantity'>
                        <button>
                            <FontAwesomeIcon icon={faChevronLeft} />
                        </button>
                        <span> {item.quantity} </span>
                        <button>
                            <FontAwesomeIcon icon={faChevronRight} onClick={() => handleQuantityIncrease(index)} />
                        </button>
                    </div>
                    <div className='total'>Total: {totalItemCount}</div>
                    <div className='experation date'>
                        {item.isSelected ? (
                            <>
                                <FontAwesomeIcon icon={faCheckCircle} />
                                <span className='completed'>{expiration.date}</span>
                            </>
                        ) : (
                            <>
                                <FontAwesomeIcon icon={faCircle} />
                                <span>{expiration.date}</span>
                            </>
                        )}
                    </div>
                </div>
            ))}
        </div>

    )
};

const handleAddButtonClick = () => {
    const newItem = {
        itemName: inputValue,
        quantity: 1,
        isSelected: false,
    };

    calculateTotal()

    const newItems = [...items, newItem];

    setItems(newItems);
    setInputValue('');
};


const handleQuantityIncrease = (index) => {
    const newItems = [...items];

    newItems[index].quantity++;

    setItems(newItems);
    calculateTotal();
};

const handleQuantityDecrease = (index) => {
	const newItems = [...items];

	newItems[index].quantity--;

	setItems(newItems);
    calculateTotal();
};

const [totalItemCount, setTotalItemCount] = useState(6);

const calculateTotal = () => {
	const totalItemCount = items.reduce((total, item) => {
		return total + item.quantity;
	}, 0);

	setTotalItemCount(totalItemCount);
};

export default App;