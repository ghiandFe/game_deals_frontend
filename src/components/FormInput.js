import React from "react";


// Input for username and password
function FormInput({ type, name, label, handleChange, value, error=false }) {
  return (
    <React.Fragment>
      <Label name={ name } text={ label } />
      <input
        type={ type }
        className="form-control mt-1"
        value={ value }
        name={ name }
        id={ name }
        onChange= { handleChange }
        required
      />
      <p className="fs-6 upper mt-0 mb-2 text-left text-danger">
        <em className="form-error">{ error ? error : ""}</em>
      </p>
    </React.Fragment>
  );
}

// Select for filters and sort
function FormSelect({ name, label, options, onChange, defaultValue }) {
  return (
    <React.Fragment>
      <Label name={ name } text={ label } />
      <select
        id={ name }
        className="form-select form-select-lg mb-3"
        defaultValue={ defaultValue }
        onChange={ onChange }
      >
        {
          Object.keys(options).map((key, i) => {
            return <option key={ i } value={ key }>{ options[key] }</option>;
          })
        }
      </select>
    </React.Fragment>
  );
}


// Username and password rules
function FormRules({type}) {
  return (
    <div
      className={`alert alert-${ type === "user" ? "secondary" : "warning"}`}>
      {
        type === "user" ?
        <>
          Username must be at least 4 characters<br />
          Username is case sensitive
        </>
        :
        <>
          <h6>Choose a STRONG password!</h6>
          Password must be at least 8 characters<br />
          Password must contain at least 1 uppercase letter<br />
          Password must contain at least 1 lowercase letter<br />
          Password must contain at least 1 number<br />
          Password must contain at least 1 symbol<br />
        </>
      }
    </div>
  );
}


// Label for 
function Label({ name, text }) {
  return <label htmlFor={ name } className="mt-3 text-left">{ text }:</label>;
}


export { FormInput, FormRules, FormSelect };