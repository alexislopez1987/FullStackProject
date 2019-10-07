import React from 'react';
import { Button } from 'reactstrap';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Items from  './components/items/Items';
import ItemDetail from './components/items/ItemDetail';
import logo from './logo.svg';
import Nav from './components/layout/Nav';
import './App.css'; 
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <div className="container">
        <div className="row">
          <div className="col">
            <Nav />
          </div>
        </div>
        
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/items" component={Items} />
            <Route path="/item/:id" component={ItemDetail} />
          </Switch>    
      </div>
    </Router>
  );
}

const Home = () => (
  <div>
    <h1>Home Page</h1>
  </div>
);

export default App;
