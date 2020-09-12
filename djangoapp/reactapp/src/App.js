import React from 'react';
import { Route, BrowserRouter as Router } from "react-router-dom";
import Home from './components/home';
import Record from './components/record';
import {GlobalProvider} from './GlobalContext';

import 'semantic-ui-css/semantic.min.css';
import './styles/app.css';

function App() {
  return (
    <GlobalProvider>
      <div className="app">
        <Router>
          <Route path='/prep' component={Record}/>
          <Route path='/' exact component={Home}/>
        </Router>
      </div>
    </GlobalProvider>
  );
}

export default App;
