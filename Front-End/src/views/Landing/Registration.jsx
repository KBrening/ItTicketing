import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Joi from 'joi';
import Input from '../../components/Input';
import './Registration.css';

function Registration() {
  const history = useHistory();
  const [data, setData] = useState({
    username: '',
    firstName: '',
    lastName: '',
    password: '',
    passwordConfirm: '',
    email: '',
    emailConfirm: '',
    phone: '',
  });

  const [errors, setErrors] = useState({
    usernameError: '',
    passwordError: '',
    passwordConfirmError: '',
    emailError: '',
    emailConfirmError: '',
    phoneError: '',
  });

  const updateField = (e) => {
    setData({
      ...data,
      [e.target.id]: e.target.value,
    });
  };

  const signUpUser = (e) => {
    e.preventDefault();
    const regSchema = Joi.object({
      // need requierments for userinfo
      // how long should a password be same for username and such
      
      // not sure if should be on submit or on change??
      username: Joi.string().regex(/[a-zA-Z1-9]/).required().label('Username'),
      firstName: Joi.string().regex(/[a-zA-Z]/).required().label('First Name'),
      lastName: Joi.string().regex(/[a-zA-Z]/).required().label('Last Name'),
      password: Joi.string().regex(/[a-zA-Z1-9]/).required().label('Password'),
      passwordConfirm: Joi.string().valid(Joi.ref('password')).required().strict().label('Password Confirm'),
      email: Joi.string().required().label('Email'),
      emailConfirm: Joi.string().valid(Joi.ref('email')).required().strict().label('Email Confirm'),
      phone: Joi.string().regex(/^\d{3}-\d{3}-\d{4}$/).required().label('Phone'),
    }).options({ abortEarly: false });

    const result = regSchema.validate(data);
    if (result.error === undefined) {
      // make call to server to make new user and send back to Login
      history.push('/login');
    } else {
      const errs = result.error.details.map(({ message, path }) => (
        { path, message: message.replace(/['"]/g, '') }
      ));
      const temp = {};
      errs.forEach((element) => {
        temp.[element.path] = element.message;
      });
      setErrors({ ...temp });
    }
  };

  return (
    <main id="registration-page">
      <form id="container" onSubmit={signUpUser}>
        <h3>Sign up for an Account</h3>
        <Input
          id="username"
          name="Username"
          value={data.username}
          onChange={updateField}
          error={errors.username}
        />
        <div id="name-inputs">
          <Input
            id="firstName"
            name="First Name"
            value={data.firstName}
            onChange={updateField}
            error={errors.firstName}
          />
          <Input
            id="lastName"
            name="Last Name"
            value={data.lastName}
            onChange={updateField}
            error={errors.lastName}
          />
        </div>
        <Input
          type="password"
          id="password"
          name="Password"
          value={data.password}
          mask=""
          onChange={updateField}
          error={errors.password}
        />
        <Input
          type="password"
          id="passwordConfirm"
          name="Password Confirm"
          value={data.passwordConfirm}
          mask=""
          onChange={updateField}
          error={errors.passwordConfirm}
        />
        <Input
          type="email"
          id="email"
          name="Email"
          value={data.email}
          onChange={updateField}
          error={errors.email}
        />
        <Input
          type="email"
          id="emailConfirm"
          name="Email Confirm"
          value={data.emailConfirm}
          onChange={updateField}
          error={errors.emailConfirm}
        />
        <Input
          type="tel"
          id="phone"
          name="Phone"
          value={data.phone}
          mask="999-999-9999"
          onChange={updateField}
          error={errors.phone}
        />
        <button className="button" type="submit">Sign Up</button>
      </form>
    </main>
  );
}

export default Registration;