import React from 'react';
import ReactDOM from 'react-dom';

import 'semantic-ui-css/semantic.min.css';

import './index.css';


import Navbar from './components/Navbar';
import Home from './scenes/Home';
import NotFound from './scenes/NotFound';

import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
ReactDOM.render(
    <BrowserRouter>
        <div id="app">
            <Navbar />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/404" component={NotFound} />
                <Redirect to="/404" />
            </Switch>            
        </div>
    </BrowserRouter>
, document.getElementById('root'));
