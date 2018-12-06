import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import 'semantic-ui-css/semantic.min.css';
import './index.css';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { persistor, store } from './store';

import Footer from './components/Footer';
import Navbar from './components/Navbar';

import Home from './scenes/Home';
import Login from './scenes/Login';
import Signup from './scenes/Signup';
import Project from './scenes/Project';
import NotFound from './scenes/NotFound';
import Page from './scenes/Page';
import CreateProject from './scenes/CreateProject';
import AddVersion from './scenes/AddVersion';
import Profile from './scenes/Profile';
import EditProject from './scenes/EditProject';

ReactDOM.render((
    <Provider store={store}>
      <PersistGate loading={(() => <div>Loading</div>)()} persistor={persistor}>
        <BrowserRouter>
            <div id="app">
                <Navbar />
                <main>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/author/:id" component={Profile} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/project/create" component={CreateProject} />
                        <Route exact path="/project/:id" component={Project} />
                        <Route exact path="/project/:id/edit" component={EditProject} />
                        <Route exact path="/signup" component={Signup} />
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
      </PersistGate>
    </Provider>
), document.getElementById('root'));

