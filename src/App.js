import React from "react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from'./componets/Navbar/index';
import Home from './componets/Factory/Home';
import Marketplace from './page/Marketplace';
import Breed from './page/Breed';
import Ambassadors from './page/Ambassadors'
// import Details from './componets/Factory/Details';
function App() {

  return (
  <Router>
    <Navbar />
    <Switch>
      <Route path='/' exact component={Home} />
      <Route path='/breed' component={Breed} />
      <Route path='/ambassadors' component={Ambassadors} />
      <Route path='/marketplace' component={Marketplace} />
      {/* <Route path="/details/:id?" component={Details} /> */}
      <Route>404 Not Found!</Route>
    </Switch>
  </Router>
  );
}

export default App;
