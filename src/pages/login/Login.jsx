import React, { useState } from 'react';
import GlassCard from '../../components/glassCard/GlassCard';
import '../signup/Signup.css';
import { Link, useNavigate } from 'react-router';
import { fetchUserByEmail, fetchContacts } from '../../utils/api';
import { useGlobalStore } from '../../hooks/useGlobalStore';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const { store, dispatch } = useGlobalStore();
  const [error, setError] = useState(false);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    try {
      const getUserByEmailResponse = await fetchUserByEmail(email);
      console.log('Get User By Email Response: ',getUserByEmailResponse);
      dispatch({
        type: 'SET_USER_ID',
        payload: { user_id: getUserByEmailResponse.id },
      });
      dispatch({ type: 'SET_AUTH', payload: { isAuthenticated: true } });

      // fetch contacts...
      const getContactsResponse = await fetchContacts(getUserByEmailResponse.id);
      console.log('Fetched Contacts: ', getContactsResponse)
      dispatch({type: 'SET_CONTACTS', payload: getContactsResponse});

      navigate('/home');
    } catch (e) {
      console.log(e);
      setError(true);
    }
  };

  return (
    <div className="text-light d-flex justify-content-center align-items-center mt-5">
      <GlassCard>
        <h2 className="text-center my-4">Login to your account</h2>
        <form onSubmit={handleOnSubmit}>
          <div className="mb-3">
            <input
              type="email"
              className="form-control p-4"
              id="email"
              placeholder="email..."
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          {error ? (
            <>
              <p className="text-danger text-center m-2">
                Looks like there is no account with given email! Try Again...
              </p>
            </>
          ) : (
            <></>
          )}
          <h6 className="text-center">Dont have an account yet?</h6>
          <div className="text-center mb-5">
            <Link className="text-decoration-none fs-5 fw-bold" to="/signup">
              Sign Up
            </Link>
          </div>
          <div className="text-center">
            <button type="submit" className="btn btn-primary mb-4">
              Login
            </button>
          </div>
        </form>
      </GlassCard>
    </div>
  );
}

export default Login;
