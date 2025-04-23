import React, { useState } from 'react';
import GlassCard from '../../components/glassCard/GlassCard';
import './Signup.css';
import { Link, useNavigate } from 'react-router';
import { useFormState } from 'react-dom';
import { createNewUser } from '../../utils/api';
import { useGlobalStore } from '../../hooks/useGlobalStore'

function Signup() {
  const [userInputs, setUserInput] = useState({ full_name: '', email: '' });
  const [error, setError] = useState(false);
  const {store, dispatch} = useGlobalStore();
  const navigate = useNavigate();

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const user = {
      name: userInputs.full_name,
      email: userInputs.email,
    };
    try {
      const newUserResponse = await createNewUser(user);
      console.log('Created a user as: ', newUserResponse);

      dispatch({
        type: 'SET_USER_ID',
        payload: { user_id: newUserResponse.id },
      });
      dispatch({ type: 'SET_AUTH', payload: { isAuthenticated: true } });
      navigate('/home');
    } catch (e) {
      console.log(e);
      setError(true);
    }
  };

  return (
    <div className="text-light d-flex justify-content-center align-items-center mt-5">
      <GlassCard>
        <h2 className="text-center my-4">Register Account</h2>
        <form onSubmit={handleOnSubmit}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control p-4"
              id="fullname"
              aria-describedby="full name"
              placeholder="full name..."
              onChange={(e) =>
                setUserInput({ ...userInputs, full_name: e.target.value })
              }
              value={userInputs.full_name}
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              className="form-control p-4"
              id="email"
              placeholder="email..."
              onChange={(e) =>
                setUserInput({ ...userInputs, email: e.target.value })
              }
              value={userInputs.email}
            />
          </div>
          {error ? (
            <>
              <p className="text-center text-danger">
                Something wrong happened! Try again...
              </p>
            </>
          ) : (
            <></>
          )}
          <h6 className="text-center">Already a member?</h6>
          <div className="text-center mb-5">
            <Link className="text-decoration-none fs-5 fw-bold" to="/login">
              Login
            </Link>
          </div>
          <div className="text-center">
            <button type="submit" className="btn btn-primary mb-4">
              Sign Up
            </button>
          </div>
        </form>
      </GlassCard>
    </div>
  );
}

export default Signup;
