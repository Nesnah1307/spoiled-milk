export const getSavedFoodNames = () => {
  const savedFoodNames = localStorage.getItem('saved_foods')
    ? JSON.parse(localStorage.getItem('saved_foods'))
    : [];

  return savedFoodNames;
};

export const saveFoodNames = (foodNameArr) => {
  if (foodNameArr.length) {
    localStorage.setItem('saved_foods', JSON.stringify(foodNameArr));
  } else {
    localStorage.removeItem('saved_foods');
  }
};

export const removeFood = (foodName) => {
  const savedFoodNames = localStorage.getItem('saved_foods')
    ? JSON.parse(localStorage.getItem('saved_foods'))
    : null;

  if (!savedFoodNames) {
    return false;
  }

  const updatedSavedFoodNames = savedFoodNames?.filter((savedFoodName) => savedFoodName !== foodName);
  localStorage.setItem('saved_foods', JSON.stringify(updatedSavedFoodNames));

  return true;
};