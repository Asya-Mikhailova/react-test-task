import React, { useEffect } from 'react';
import { fetchProfiles } from '../redux';
import { useDispatch, useSelector } from 'react-redux';
import {
  loadingSelector,
  approvedProfilesSelector,
  profilesSelector,
  errorSelector,
} from '../redux/profiles/profilesSelectors';

export const ProfilesContainer = () => {
  const loading = useSelector(loadingSelector);
  const error = useSelector(errorSelector);
  const profiles = useSelector(profilesSelector);
  const approvedProfileCategories = useSelector(approvedProfilesSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProfiles());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <h1>PROFILE IS WORKING</h1>;
};
