import React from 'react';
import {Provider} from 'react-redux';
import store from './redux/store';
import './App.scss';

import {ProfilesPage} from "./pages/ProfilesPage";


function App() {
    return (
        <div className="container">
        <Provider store={store}>
            <ProfilesPage/>
        </Provider>
        </div>
    );
}

export default App;
