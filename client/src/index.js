import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import { 
  ApolloClient, 
  InMemoryCache,
  useQuery,
  gql
} from '@apollo/client'
import { ApolloProvider } from '@apollo/client/react';

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache()
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App/>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);