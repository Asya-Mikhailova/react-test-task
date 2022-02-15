import React from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter as Router} from "react-router-dom";

import {ProfilesPage} from "./pages/ProfilesPage";
import store from './redux/store';

import './App.scss';



function App() {
    return (
        <div className="container">
        <Provider store={store}>
            <Router>
                <ProfilesPage/>
            </Router>
        </Provider>
        </div>
    );
}

export default App;
