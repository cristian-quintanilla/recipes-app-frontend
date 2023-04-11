import React from 'react';
import ReactDOM from 'react-dom/client';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { BrowserRouter } from 'react-router-dom';

import RecipesApp from './RecipesApp';
import './main.css';
import './index.css';

// Apollo Client setup
const client = new ApolloClient({
  uri: 'https://recipes-app-backend.onrender.com/graphql',
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <ApolloProvider client={client}>
		<React.StrictMode>
			<BrowserRouter>
				<RecipesApp />
			</BrowserRouter>
		</React.StrictMode>
	</ApolloProvider>,
);
