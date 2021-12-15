
import ReactDOM from 'react-dom';
import './index.css';

import ApolloProvider from './ApolloProvider';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(ApolloProvider,document.getElementById('root'));
serviceWorker.unregister();
//reportWebVitals();