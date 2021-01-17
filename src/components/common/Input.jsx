import React from "react";

const Input = ({ name, label, error, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input {...rest} name={name} id={name} className="form-control" />
      {error &&
        error.map((item, idx) => (
          <div key={idx} className="alert alert-danger">
            {item}
          </div>
        ))}
    </div>
  );
};

export default Input;
