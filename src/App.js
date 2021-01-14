import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

/*  COMPONENTS   */
import Header from './components/root/Header';
import Footer from './components/root/Footer';
import Homepage from './components/pages/Homepage';
import SearchResult from './components/pages/SearchResult';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Cart from './components/pages/Cart'
import Compra from './components/pages/Compra'

/* ERRORS */
import Error404 from './components/error/Error404';
import ProductPage from './components/pages/ProductPage';

export default class App extends Component {
  render() {
    return (
      <Router>
        <Header />
        <div className="container-fluid" id="main-container">
          <Switch>
            <Route path='/' exact component={Homepage} />
            <Route path='/product/:id' exact component={ProductPage} />
            <Route path='/search/:term' component={SearchResult} />
            <Route path='/login' component={Login} />
            <Route path='/signup' component={Signup} />
            <Route path='/carrito' component={Cart} />
            <Route path='/compra/:id' component={Compra}  />
            <Route path='*' component={Error404} />
          </Switch>
        </div>
        <Footer />
      </Router>
    )
  }
}
