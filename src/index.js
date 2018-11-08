import React from 'react';
import ReactDOM from 'react-dom';

import 'semantic-ui-css/semantic.min.css';
import './index.css';

import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Home from './scenes/Home';
import Project from './scenes/Project';
import NotFound from './scenes/NotFound';
import Page from './scenes/Page';
import CreateProject from './scenes/CreateProject';

import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import AddVersion from './scenes/AddVersion';
import Profile from './scenes/Profile';
import EditProject from './scenes/EditProject';
ReactDOM.render(
    <BrowserRouter>
        <div id="app">
            <Navbar />
            <main>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/author/:id" component={Profile} />
                    <Route exact path="/project/create" component={CreateProject} />
                    <Route exact path="/project/:id" component={Project} />
                    <Route exact path="/project/:id/edit" component={EditProject} />
                    <Route exact path="/version/add" component={AddVersion} />
                    <Route exact path="/version/:id" component={Project} />
                    <Route exact path="/project/:id/page/:num" component={Page} />
                    <Route exact path="/404" component={NotFound} />
                    <Redirect to="/404" />
                </Switch>
            </main>
            <Footer />
        </div>
    </BrowserRouter>
, document.getElementById('root'));
