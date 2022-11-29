import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import RecipesApp from './RecipesApp';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
		<BrowserRouter>
			<RecipesApp />
		</BrowserRouter>
	</React.StrictMode>,
);
