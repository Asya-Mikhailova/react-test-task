import React from 'react';
import {NavLink} from "react-router-dom";

import './ProfilesItem.scss'

export const ProfilesItem = ({profile, className})=>(
    <NavLink exact to={`/categories/${profile.id}`} className={className} activeClassName="active" key={profile.id}>
        <h3>{profile.name}</h3>
        <p className="profile-item__description">{profile.description}</p>
    </NavLink>
)

