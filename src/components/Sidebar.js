import React from 'react';
import _ from 'lodash';
import {ProfilesItem} from "./ProfilesItem";
import './Sidebar.scss';


export const Sidebar = ({profiles}) => {
  return (
      <div className="profiles">
        { _.map(profiles, (profile)=>(
        <ProfilesItem className="profile-item" key={profile.id} profile={profile}/>
        ))}
      </div>
  );
};
