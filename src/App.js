import React from "react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './componets/Navbar/index';
import Home from './componets/Factory/Home';
import About from './page/About';
import AllProjects from './page/AllProjects';
import Ambassadors from './page/Ambassadors'
import Details from './componets/Factory/Details';
import MyProjects from './page/MyProjects';
import FormCreate from "./page/FormCreate";
import DetailRecer from "./page/DetailRecer";


function App() {

    return ( 
        <Router >
            <Navbar/>
                <Switch >
                    <Route path = '/'exact component = { Home }/>
                    <Route path = '/allprojects'component = { AllProjects }/> 
                    {/* <Route path = '/ambassadors'component = { Ambassadors }/> */}
                    <Route path = '/about'component = { About }/> 
                    <Route path = '/formcreate'component = { FormCreate }/> 
                    <Route path = '/myproject'component = { MyProjects }/>
                    <Route path = "/details/:id?"component = { Details }/>
                    <Route path = "/detailRever/:id?"component = { DetailRecer }/>

                    <Route > 404 Not Found! </Route> 
                </Switch > 
        </Router>
    );
}

export default App;