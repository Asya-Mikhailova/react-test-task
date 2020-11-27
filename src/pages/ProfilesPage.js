import React, {useEffect} from 'react';
import { fetchProfiles } from '../redux';
import { useDispatch, useSelector} from 'react-redux';
import { profilesSelector} from '../redux/profiles/profilesSelectors';

import {Sidebar} from '../components/Sidebar';
import {CategoriesContainer} from "../components/CategoriesContainer";
import {Route, Switch, Redirect} from "react-router-dom";

export const ProfilesPage = () => {
    const profiles = useSelector(profilesSelector);



    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProfiles());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    return (
        <React.Fragment>
                <Sidebar profiles={profiles} />
                <Switch>
                    <Route exact path="/" component={CategoriesContainer}>
                        <Redirect to="/categories/5ce075ab-849b-4f5d-a792-a672d4abd08e"/>
                    </Route>
                    <Route exact path="/categories/:id" component={CategoriesContainer}/>
                </Switch>
        </React.Fragment>
    )
}

