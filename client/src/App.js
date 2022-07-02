import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddFood from './components/addFood';
import Navbar from './components/Navbar';
import MyFoods from './pages/MyFood';
//import SearchBooks from './pages/SearchBooks';


function App() {
  return (
    <Router>
      <>
        <Navbar />
        <Routes>
          {/* <Route exact path='/' component={SearchBooks} /> */}
          <Route exact path='/' component={MyFoods} />
          <Route render={() => <h1 className='display-2'>Wrong page!</h1>} />
        </Routes>
      </>
    </Router>
  );
}

export default App;
