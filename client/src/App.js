import React from 'react';
import { Router, Switch, Route} from 'react-router-dom';
import { createBrowserHistory } from "history";
import Items from  './components/items/Items';
import ItemDetail from './components/items/ItemDetail';
import GenericNotFound from './components/layout/GenericNotFound';
import Nav from './components/layout/Nav';
import Register from './components/register/Register';
import Login from './components/login/Login';
import './App.css';   
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  const history = createBrowserHistory();

  return (
    <Router history={history}>
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
            <Route path="/register" exact component={Register} />
            <Route path="/login" exact component={Login} />
            <Route component={GenericNotFound}/> 
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
