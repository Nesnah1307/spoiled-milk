import React, { useState, useEffect } from 'react';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';

import { getMe, deleteFood } from '../utils/API';
import Auth from '../utils/auth';
import { removeFood } from '../utils/localStorage';

const SavedFoods = () => {
  const [userData, setUserData] = useState({});

  // use this to determine if `useEffect()` hook needs to run again
  const userDataLength = Object.keys(userData).length;

  useEffect(() => {
    const getUserData = async () => {
      try {
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
          return false;
        }

        const response = await getMe(token);

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
  }, [userDataLength]);

  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeleteFood = async (foodName) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const response = await deleteFood(foodName, token);

      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      const updatedUser = await response.json();
      setUserData(updatedUser);
      // upon success, remove book's id from localStorage
      removeFood(foodName);
    } catch (err) {
      console.error(err);
    }
  };

  // if data isn't here yet, say so
  if (!userDataLength) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>Viewing your food!</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {userData.myFood.length
            ? `Viewing ${userData.myFood.length} saved ${userData.myFood.length === 1 ? 'food' : 'foods'}:`
            : 'You have no saved food!'}
        </h2>
        <CardColumns>
          {userData.myFood.map((book) => {
            return (
              <Card key={food.foodName} border='dark'>
                {book.image ? <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' /> : null}
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
};

export default SavedFoods;
