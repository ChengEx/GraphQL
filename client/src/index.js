
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import ApolloProvider from './ApolloProvider.js';
import './index.css';

ReactDOM.render(
    ApolloProvider,
    document.getElementById('root')
);
reportWebVitals();