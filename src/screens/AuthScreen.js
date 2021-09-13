import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import { useMutation } from "@apollo/client";

import { Button, FormInput, FormRules } from "../components";
import { LOGIN_MUTATION, SIGNUP_MUTATION } from "../graphql/mutations";
import { useGlobalContext, useTitle } from "../hooks";
import {
  INITIAL_AUTH_ERROR_STATE,
  INITIAL_USER_STATE,
  LOGIN_SCHEMA,
  SIGNUP_SCHEMA
} from "../utils/constants";


function AuthScreen({ isLoginForm }) {
  const history = useHistory();
  const { isLogged, userLogin } = useGlobalContext();
  useTitle(isLoginForm ? "Login" : "Register");

  // Form state
  const [user, setUser] = useState(INITIAL_USER_STATE);

  // Validation error state
  const [error, setError] = useState(INITIAL_AUTH_ERROR_STATE);


  useEffect(() => {
    setUser(INITIAL_USER_STATE);
    setError(INITIAL_AUTH_ERROR_STATE);
  }, [isLoginForm]);


  // Redirect for logged user
  if (isLogged) {
    history.push("/");
  }


  // GraphQL MUTATIONS
  const [login] = useMutation(LOGIN_MUTATION, {
    variables: user,
    onCompleted: ({tokenAuth}) => {
      userLogin(tokenAuth.token, user.username);
      history.push("/redirect");
    },
    onError: ({message}) => {
      setError({...INITIAL_AUTH_ERROR_STATE, login: message});
    }
  });

  const [signup] = useMutation(SIGNUP_MUTATION, {
    variables: user,
    onCompleted: ({signUp}) => {
      userLogin(signUp.token, user.username);
      history.push("/redirect");
    },
    onError: ({message}) => {
      if (/UNIQUE|univoco/) {
        message = "Username already exists"
      }
      setError({...INITIAL_AUTH_ERROR_STATE, signup: message});
    }
  });


  // VALIDATION
  function handleError(err) {
    if (err.includes("password")) {
      setError({...INITIAL_AUTH_ERROR_STATE, password: err});
    } else {
      setError({...INITIAL_AUTH_ERROR_STATE, username: err});
    }
  }

  function handleLogin(event) {
    event.preventDefault();
    LOGIN_SCHEMA.validate({...user})
      .then(() => {
        login();
      })
      .catch(({errors}) => {
        handleError(errors[0]);
      })
  }

  function handleSignup(event) {
    event.preventDefault();
    SIGNUP_SCHEMA.validate({...user})
      .then(() => {
        signup();
      })
      .catch(({errors}) => {
        handleError(errors[0]);
      })
  }


  // onChange - Input
  function handleChange(e) {
    const {name, value} = e.target;
    setUser({...user, [name]: value});
  }


  return (
    <div className="container mt-5">
      <div className="text-center my-3">
        <h3>{ isLoginForm ? "Login:" : "Register:" }</h3>
        <h4 className="upper text-danger">
          <em className="upper form-error">
            { error.login ? error.login : "" }
            { error.signup ? error.signup : "" }
          </em>
        </h4>
      </div>
      <div className="row justify-content-center">
        <div className="col-lg-4 col-md-6 col-sm-12">

          <form className="needs-validation" noValidate>
            <FormInput
              type='text'
              name='username'
              label='Username'
              value={ user.username }
              handleChange={ handleChange }
              error={ error.username ? error.username : false }
            />
            {
              isLoginForm ? "" :
              <FormRules type="user" />
            }
            <FormInput
              type='password'
              name='password'
              label='Password'
              value={ user.password }
              handleChange={ handleChange }
              error={ error.password ? error.password : false }
            />
            {
              isLoginForm ? "" :
              <><FormRules />
              <FormInput
                type='password'
                name='password2'
                label='Repeat password'
                value={ user.password2 }
                handleChange={ handleChange }
                error={ error.password ? error.password : false }
              /></>
            }

            <div className="text-center mt-5 mb-0">
              {
                isLoginForm ?
                <p>Don't have an account? <Link to="/signup">Register</Link> here</p>
                :
                <p>Already have an account? <Link to="/login">Login</Link> here</p>
              }
            </div>

            <div className="text-center my-5">
              <Button
                text={ isLoginForm ? "login" : "register" }
                onClick={ isLoginForm ? handleLogin : handleSignup }
                bgColor={ isLoginForm ? "primary" : "danger" }
                type="submit"
              />
            </div>
          </form>

        </div>
      </div>
    </div>
  );
};


export default AuthScreen;