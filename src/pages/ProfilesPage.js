import React, {useEffect} from 'react';
import { fetchProfiles } from '../redux';
import {Provider, useDispatch, useSelector} from 'react-redux';
import {approvedProfilesSelector, profilesSelector} from '../redux/profiles/profilesSelectors';

import {Sidebar} from '../components/Sidebar';
import {CategoriesContainer} from "../components/CategoriesContainer";
import {BrowserRouter as Router, Route} from "react-router-dom";

export const ProfilesPage = () => {
    const profiles = useSelector(profilesSelector);
    const approvedProfileCategories = useSelector(approvedProfilesSelector);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProfiles());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <React.Fragment>
            <Router>
                <Sidebar profiles={profiles}/>
                <Route exact path="/" component={CategoriesContainer}/>
                <Route exact path="/categories/:id" component={CategoriesContainer}/>
            </Router>
        </React.Fragment>

    )
}

