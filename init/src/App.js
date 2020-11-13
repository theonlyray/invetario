import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './assets/css/App.css';

//components
import NavBar from './components/NavBar';
import Categories from './components/Categories';
import Products from './components/Products';
import Sales from './components/Sales';
import SeeSales from './components/SeeSales';
import About from './components/About';

function App() {
  return (
    <Router>
      <div className="container p-4">
        <NavBar/> 
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/categories" component={Categories}/>
          <Route path="/products" component={Products}/>
          <Route path="/sales" component={Sales}/>
          <Route path="/see_sales" component={SeeSales}/>
          <Route path="/about" component={About}/>
        </Switch>
      </div>
    </Router>
  );
}

const Home = () =>(
  <div>
    <h1>App index gral HOME</h1>
  </div>
);

export default App;
