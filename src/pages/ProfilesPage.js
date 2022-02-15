import _ from 'lodash';
import React, {useEffect} from 'react';
import {Route, Switch, Redirect} from "react-router-dom";
import { useDispatch, useSelector} from 'react-redux';

import {Sidebar} from '../components/Sidebar';
import {CategoriesContainer} from "../components/CategoriesContainer";
import { profilesSelector} from '../redux/profiles/profilesSelectors';
import { fetchProfiles } from '../redux';

export const ProfilesPage = () => {
    const profiles = useSelector(profilesSelector);
    const defaultProfile= _.find(profiles, profile=>profile.name==="Default");

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProfiles());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const id = defaultProfile? defaultProfile.id:'';

    return (
        <React.Fragment>
                <Sidebar profiles={profiles} />
                <Switch>
                    <Route exact path="/" component={CategoriesContainer}>
                        <Redirect to={`/categories/${id}`}/>
                    </Route>
                    <Route exact path="/categories/:id" component={CategoriesContainer}/>
                </Switch>
        </React.Fragment>
    )
}

