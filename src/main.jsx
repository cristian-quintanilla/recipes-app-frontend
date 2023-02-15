import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import RecipesApp from './RecipesApp';
import './main.css';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
		<BrowserRouter>
			<RecipesApp />
		</BrowserRouter>
	</React.StrictMode>,
);
