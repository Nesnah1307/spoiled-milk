import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import SavedFoods from './pages/MyFood';
//import SearchBooks from './pages/SearchBooks';


function App() {
  return (
    <Router>
      <>
        <Navbar />
        <Switch>
          {/* <Route exact path='/' component={SearchBooks} /> */}
          <Route exact path='/saved' component={SavedFoods} />
          <Route render={() => <h1 className='display-2'>Wrong page!</h1>} />
        </Switch>
      </>
    </Router>
  );
}

export default App;
