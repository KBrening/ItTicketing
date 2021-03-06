import React from 'react';
import InputMask from 'react-input-mask';

import './Input.css';

const Input = ({
  name,
  error,
  ...rest
}) => (
  <>
    <InputMask
      className="input"
      name={name}
      {...rest}
    />
    {
      error
        ? <div className="input-error">{error}</div>
        : null
    }
  </>
);

export default Input;
