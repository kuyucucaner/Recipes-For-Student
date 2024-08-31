import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProfile } from '../features/auth/auth-slice';
import '../styles/profile.css'; // Import your styles

const Profile = () => {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getProfile()); // Fetch user profile on component mount
  }, [dispatch]);

  if (loading) return <div className='loading'>Loading...</div>;
  if (error) return <div className='error'>Error: {error}</div>;

  return (
    <section className='profile'>
    <div className='profile-section'>
      {user ? (
        <div className='profile-info'>
          <h1 className='profile-username'>Name : {user.username}</h1>
          <p className='profile-email'>Email: {user.email}</p>
          {/* Add more user information here if needed */}
        </div>
      ) : (
        <div className='no-data'>No user data available</div>
      )}
    </div>
    </section>
  );
};

export default Profile;
