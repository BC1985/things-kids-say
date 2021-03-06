import React from "react";

const TextArea = props => {
  return (
    <div>
      <label htmlFor={props.name} className="col-form-label childish-font">
        {props.title}
      </label>
      <textarea
        validation={props.validation}
        title={props.title}
        className="form-control shadow-sm mb-3"
        placeholder={props.placeholder}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        type={props.type}
      />
    </div>
  );
};

TextArea.defaultProps = {
  placeholder: "",
  name: "",
  type: "text",
  value: "",
};
export default TextArea;
