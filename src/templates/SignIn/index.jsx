import { useEffect, useCallback } from 'react';

import { SignInForm } from '../../components/SignInForm'
import { Banner } from '../../components/Banner'

import { getAuth, onAuthStateChanged } from "firebase/auth";

import { useLocation, useNavigate } from 'react-router-dom';

import './styless.css';

export const SignIn = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;

  const signInCheck = useCallback(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate('/')
      }
    });
  }, [navigate]);

  useEffect(() => {
    signInCheck();
    if (state != null) {
      alert(state)
    }
  }, [signInCheck, state]);

  return (<div className='container-login'>
    <Banner />
    <SignInForm />
  </div>
  )
}