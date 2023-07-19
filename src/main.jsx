import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { BrowserRouter } from 'react-router-dom';

import RecipesApp from './RecipesApp';
import { store } from './store/store';

import './main.css';
import './index.css';

// Apollo Client setup
const client = new ApolloClient({
  uri: 'https://recipes-app-backend.onrender.com/graphql',
  cache: new InMemoryCache(),
	headers: {
		authorization: 'Token ' + localStorage.getItem('token'),
	}
});

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
	  <ApolloProvider client={ client }>
			<Provider store={ store }>
				<BrowserRouter>
					<RecipesApp />
				</BrowserRouter>
			</Provider>
		</ApolloProvider>
	</React.StrictMode>
);
