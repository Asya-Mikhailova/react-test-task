import React, {useEffect} from 'react';
import { fetchProfiles } from '../redux';
import { useDispatch, useSelector} from 'react-redux';
import { profilesSelector} from '../redux/profiles/profilesSelectors';

import {Sidebar} from '../components/Sidebar';
import {CategoriesContainer} from "../components/CategoriesContainer";
import {Route, Switch} from "react-router-dom";

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
                    <Route exact path="/" component={CategoriesContainer}/>
                    <Route exact path="/categories/:id" component={CategoriesContainer}/>
                </Switch>
        </React.Fragment>
    )
}

