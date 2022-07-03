import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AddFood from './components/addFood';
import Navbar from './components/Navbar';
import MyFoods from './pages/MyFood';
//import SearchBooks from './pages/SearchBooks';

function App() {
  return (
    <Router>
      <>
        <Navbar />
        <Switch>
          {/* <Route exact path='/' component={SearchBooks} /> */}
          <Route exact path='/' component={MyFoods} />
          <Route render={() => <h1 className='display-2'>Wrong page!</h1>} />
        </Switch>
      </>
    </Router>
  );
}

export default App;