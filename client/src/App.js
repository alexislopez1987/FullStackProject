import React from 'react';
import { Router, Switch, Route} from 'react-router-dom';
import { createBrowserHistory } from "history";
import Items from  './components/items/Items';
import ItemDetail from './components/items/ItemDetail';
import GenericNotFound from './components/layout/GenericNotFound';
import Nav from './components/layout/Nav';
import Register from './components/register/Register';
import Login from './components/login/Login';
import Alerts from './components/layout/Alerts';
import Reload from './components/layout/Reload'
import './App.css';   
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import store from './store';
import PrivateRoute from './components/routing/PrivateRoute';
import CreateItem from './components/items/CreateItem';
import UpdateItem from './components/items/UpdateItem';

function App() {

  const history = createBrowserHistory();

  return (
    <Provider store={store}>
        <Router history={history}>
          <Reload />
          <Alerts />
          <div className="container">
            <div className="row">
              <div className="col">
                <Nav />
              </div>
            </div>
          
            <Switch>
              <Route path="/" exact component={Home} />
              <PrivateRoute path="/items" component={Items} />
              <PrivateRoute path="/item/:id" component={ItemDetail} />
              <PrivateRoute path="/createitem" component={CreateItem} />
              <PrivateRoute path="/updateitem/:id" component={UpdateItem} />
              <Route path="/register" exact component={Register} />
              <Route path="/login" exact component={Login} />
              <Route component={GenericNotFound}/> 
            </Switch>    
          </div>
      </Router>
    </Provider>
  );
}

const Home = () => (
  <div>
    <h1>Home Page</h1>
  </div>
);

export default App;
