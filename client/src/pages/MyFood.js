import React, { useState, useEffect } from 'react';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';

import { QUERY_ME_BASIC, QUERY_FOODS } from '../utils/queries';
import { REMOVE_FOOD } from '../utils/mutations';
import { useQuery } from '@apollo/client';
// import { getMe, deleteFood } from '../utils/API';
import Auth from '../utils/auth';
// import { removeFood } from '../utils/localStorage';

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import AddFood from '../components/addFood';


const MyFoods = () => {
  const [userData, setUserData] = useState({});
  const [foodName, setFoodName] = useState('')
    const [quantity, setQuantity] = useState(1)
    const [exDate, setExDate] = useState(new Date());


  const loggedIn = Auth.loggedIn();
  // use this to determine if `useEffect()` hook needs to run again
  // const userDataLength = Object.keys(userData).length;

  // useEffect(() => {
    const getUserData = async () => {
      try {
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
          return false;
        }

        const response = await QUERY_ME_BASIC(token);

        if (!response.ok) {
          throw new Error('something went wrong!');
        }

        const user = await response.json();
        setUserData(user);
      } catch (err) {
        console.error(err);
      }
    };

    getUserData();
  // }, [userDataLength];
  const handleQuantityIncrease = (index) => {
    setQuantity(quantity + 1);
};

const handleQuantityDecrease = (index) => {
    setQuantity(quantity - 1);
};

const handleNameChange = (event) => {
    setFoodName(event.target.value);
};
  

  // create function that accepts the book's mongo _id value as param and deletes the book from the database
const handleDeleteFood = async (foodName) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const response = await REMOVE_FOOD(foodName, token);

      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      const updatedUser = await response.json();
      setUserData(updatedUser);
      // upon success, remove book's id from localStorage
      REMOVE_FOOD(foodName);
 } catch (err) {
      console.error(err);
    }};
  const handleAddButtonClick = () => {
    console.log({foodName, quantity,exDate});
    localStorage.setItem('food', JSON.stringify({foodName, quantity,exDate}))
};


  // if data isn't here yet, say so
  //if (!userDataLength) {
  // return <h2>LOADING...</h2>;
  //}

  return (
    <>
      <AddFood foodName ={foodName} quantity={quantity} exDate={exDate} handleAddButtonClick ={handleAddButtonClick}/> 
      <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>Viewing your food!</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {userData.MyFood && userData.myFood.length
            ? `Viewing ${userData.myFood.length} saved ${userData.myFood.length === 1 ? 'food' : 'foods'}:`
            : 'You have no saved food!'}
        </h2>
        <CardColumns>
          {userData.MyFood && userData.myFood.map((food) => {
            return (
              <Card key={food.foodName} border='dark'>
                <Card.Body>
                  <Card.Title>{food.name}</Card.Title>
                  <Button className='btn-block btn-danger' onClick={() => handleDeleteFood(food.foodName)}>
                    Delete this Food!
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
//   return (
//     <>
//       <Jumbotron fluid className='text-light bg-dark'>
//         <Container>
//           <h1>Viewing your food!</h1>
//         </Container>
//       </Jumbotron>
//       <Container>
//         <h2>
//           {userData.myFood.length
//             ? `Viewing ${userData.myFood.length} saved ${userData.myFood.length === 1 ? 'food' : 'foods'}:`
//             : 'You have no saved food!'}
//         </h2>
//         <CardColumns>
//           {userData.myFood.map((food) => {
//             return (
//               <Card key={food.foodName} border='dark'>
//                 <Card.Body>
//                   <Card.Title>{food.name}</Card.Title>
//                   <Button className='btn-block btn-danger' onClick={() => handleDeleteFood(food.foodName)}>
//                     Delete this Food!
//                   </Button>
//                 </Card.Body>
//               </Card>
//             );
//           })}
//         </CardColumns>
//       </Container>
//     </>
//   );
// };

// return (
//   <main>
//     <div className="flex-row justify-space-between">
//       {loggedIn && (
//         <div className="col-12 mb-3">
//           {/* <ThoughtForm /> */}
//         </div>
//       )}
//       {/* <div className={`col-12 mb-3 ${loggedIn && 'col-lg-8'}`}>
//         {loading ? (
//           <div>Loading...</div>
//         ) : (
//           <ThoughtList
//             thoughts={thoughts}
//             title="Some Feed for Thought(s)..."
//           />
//         )}
//       </div> */}
//       {loggedIn && userData ? (
//         <div className="col-12 col-lg-3 mb-3">
//         </div>
//       ) : null}
//     </div>
//   </main>
// );
};


export default MyFoods;
