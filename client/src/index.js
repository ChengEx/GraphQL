
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import reducers from './reducers';
//import ApolloProvider from './ApolloProvider.js';
import './index.css';

import App from './App';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/react-hooks';
import { setContext } from 'apollo-link-context'; 

const httpLink = createHttpLink({
    uri:'http://localhost:5000/'
})

const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = JSON.parse(localStorage.getItem('profile'));
    // return the headers to the context so httpLink can read them
    console.log("fkingToken", token?.login?.token);
    return {
      headers: {
        ...headers,
        authorization: token?.login?.token ? `Bearer ${token?.login?.token}` : "",
      }
    }
  });

const client = new ApolloClient({
    ssrMode: false,
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
    // headers: {
    //   'Content-Type': 'application/json',
    //   'Access-Control-Allow-Origin': '*',
    //   'Access-Control-Allow-Credentials': true,
    // },
    defaultOptions: {
      query: {
          fetchPolicy: 'network-only',
          errorPolicy: 'all',
      },
    }
    //   mutate: {
    //       errorPolicy: 'all',
    //   },
    // },
})

// const client = new ApolloClient({
//     link: httpLink,
//     cache: new InMemoryCache()
// })



const store = createStore(reducers, compose(applyMiddleware(thunk)));

ReactDOM.render(
    
    <ApolloProvider client={client}>
      <Provider store={store}>     
        <App/>
      </Provider>
    </ApolloProvider>
    
   ,
    document.getElementById('root')
);
reportWebVitals();