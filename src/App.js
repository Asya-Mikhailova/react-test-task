import React from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter as Router} from "react-router-dom";
import store from './redux/store';
import './App.scss';

import {ProfilesPage} from "./pages/ProfilesPage";


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
