import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import Dashboard from './container/Layout/Layout';
import RolesAndRates from './components/RolesAndRates/RolesAndRates';

const App = () => {

  return (
    <div className="App" >
      <Dashboard></Dashboard>
      <Route path='/roles' component={RolesAndRates} />
    </div >

  );
}

export default App;
