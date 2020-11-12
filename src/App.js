import React from 'react';
import {Provider} from 'react-redux';
import store from './redux/store';
import './App.scss';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import {CategoriesContainer} from './components/CategoriesContainer';
import {ProfilesContainer} from "./components/ProfilesContainer";


function App() {
    return (
        <Provider store={store}>
            <Router>
                <Route exact path="/" component={CategoriesContainer}/>
                <Route exact path="/categories/:id" component={CategoriesContainer}/>
            </Router>
        </Provider>
    );
}

export default App;
