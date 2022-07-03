import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddFood from './components/addFood';
import Navbar from './components/Navbar';
import MyFoods from './pages/MyFood';
//import SearchBooks from './pages/SearchBooks';

<<<<<<< HEAD
=======
const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

>>>>>>> f949443b3754bab5675a93f818a00e2bc93feb0b
function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
          <Navbar />
          <Routes>
            {/* <Route exact path='/' component={SearchBooks} /> */}
            <Route path='/myfood' element={<MyFoods></MyFoods>} />
            <Route render={() => <h1 className='display-2'>Wrong page!</h1>} />
          </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;