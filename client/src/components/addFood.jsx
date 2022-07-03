import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft, faCircle, faCheckCircle, faPlus } from '@fortawesome/free-solid-svg-icons';
import ReactDatePicker from 'react-datepicker';
import { ADD_FOOD } from '../utils/mutations';
import { useMutation } from '@apollo/client';



const AddFood = () => {

        const [foodName, setFoodName] = useState('')
        const [quantity, setQuantity] = useState(1)
        const [expiration, setExDate] = useState(new Date());
        const [addFood, {data, loading, error}] = useMutation(ADD_FOOD);


    const handleAddButtonClick = () => {
        addFood({variables:{foodName, quantity,expiration}});

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
            <p>type in your food and select expiration date</p>
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
        <ReactDatePicker selected={expiration} onChange={(date) => setExDate(date)} />
        <button onClick={handleAddButtonClick}>
            Add Food
        </button>
        </>
    )


};

export default AddFood;


