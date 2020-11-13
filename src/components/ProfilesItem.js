import React from 'react';
import _ from 'lodash';

import './ProfilesItem.scss'



export const ProfilesItem = ({profile})=>{
    return(
        <div className="profile-item">
            <h3>{profile.name}</h3>
            <p className="profile-item__description">{profile.description}</p>
        </div>
        )
}