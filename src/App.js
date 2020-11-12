import React from 'react';
import {Provider} from 'react-redux';
import store from './redux/store';
import './App.scss';
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';
import {CategoriesContainer} from './components/CategoriesContainer';
import {ProfilesContainer} from "./components/ProfilesContainer";


function App() {
    return (
        <Provider store={store}>
            <Router>
                <Switch>
                    <Route exact path="/">
                        <h1>HOME</h1>
                    </Route>
                    <Route path="/categories">
                        <CategoriesContainer/>
                    </Route>
                    <Route path="/profiles">
                        <ProfilesContainer/>
                    </Route>
                </Switch>

            </Router>

        </Provider>



    );
}

export default App;
