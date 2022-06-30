import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft, faCircle, faCheckCircle, faPlus } from '@fortawesome/free-solid-svg-icons';
import ReactDatePicker from 'react-datepicker';



const AddFood = () => {

    const [foodName, setFoodName] = useState('')
    const [quantity, setQuantity] = useState(1)
    const [exDate, setExDate] = useState(new Date());


    const handleAddButtonClick = () => {
        console.log({foodName, quantity,exDate});
        
    };


    const handleQuantityIncrease = (index) => {
        setQuantity(quantity + 1);
    };

    const handleQuantityDecrease = (index) => {
        setQuantity(quantity - 1);
    };

    const handleNameChange = (event) => {
        setFoodName(event.target.value);
    };

    return (
        <>
        <div className ="foodName">
            <p>type in your food and select experation date</p>
            <input type="text" value = {foodName} onChange={handleNameChange}  />
            
        </div>
        <div className='quantity'>
            <button>
                <FontAwesomeIcon icon={faChevronLeft} onClick={handleQuantityDecrease}  />
            </button>
            <span> {quantity} </span>
            <button>
                <FontAwesomeIcon icon={faChevronRight} onClick={handleQuantityIncrease} />
            </button>
        </div>
        <ReactDatePicker selected={exDate} onChange={(date) => setExDate(date)} />
        <button onClick={handleAddButtonClick}>
            Add Food
        </button>
        </>
    )


};

export default AddFood;


