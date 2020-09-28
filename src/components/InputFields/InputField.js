import React from "react";

const InputField = props => {
  return (
    <div>
      <label htmlFor={props.name} className="col-form-label childish-font">
        {props.title}
      </label>
      <input
        validation={props.validation}
        title={props.title}
        className="form-control shadow-sm mb-3"
        placeholder={props.placeholder}
        name={props.name}
        pattern={props.pattern}
        maxLength={props.maxLength}
        min={props.min}
        value={props.value}
        onChange={props.onChange}
        type={props.type}
      />
    </div>
  );
};

InputField.defaultProps = {
  placeholder: "",
  name: "",
  type: "text",
  value: "",
};

export default InputField;
