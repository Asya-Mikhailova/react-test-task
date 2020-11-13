import React, { useEffect } from 'react';
import _ from 'lodash';
import { fetchProfiles } from '../redux';
import { useDispatch, useSelector } from 'react-redux';
import {
  loadingSelector,
  approvedProfilesSelector,
  profilesSelector,
  errorSelector,
} from '../redux/profiles/profilesSelectors';

import {ProfilesItem} from "./ProfilesItem";

import './Sidebar.scss';

export const Sidebar = () => {
  const loading = useSelector(loadingSelector);
  const error = useSelector(errorSelector);
  const profiles = useSelector(profilesSelector);
  const approvedProfileCategories = useSelector(approvedProfilesSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProfiles());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
      <div className="profiles">
        { _.map(profiles, (profile)=>(
        <ProfilesItem className="profiles__profile" key={profile.id} profile={profile}/>
        ))}

      </div>
  );
};
