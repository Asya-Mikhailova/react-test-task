import React from 'react';

import './ProfilesItem.scss'
import {NavLink, BrowserRouter as Router} from "react-router-dom";


export const ProfilesItem = ({profile, className})=>{


    return(
        <NavLink exact to={`/categories/${profile.id}`} className={className} activeClassName="active">
                    <h3>{profile.name}</h3>
                    <p className="profile-item__description">{profile.description}</p>
        </NavLink>
        )
}