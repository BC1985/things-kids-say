import React, { useState } from "react";
import InputField from "../InputFields/InputField";

function SignIn(props) {
  const [input, setInput] = useState({});
  const [isEmailError, setIsEmailError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [isPasswordError, setIsPasswordError] = useState(false);
  const { email, password, username } = input;

  const postUser = async user => {
    try {
      const res = await fetch("http://localhost:5000/users/add", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const data = await res.json();
      if (Object.keys(data).includes("errors")) {
        // errors from the backend
        const { email, password, username } = data.errors;
        const emailErrors = email;
        const passwordError = password;
        const usernameError = username;
        // if there are errors, store in the state and display in UI
        setIsPasswordError(passwordError);
        setUsernameError(usernameError);
        setIsEmailError(emailErrors);
      } else {
        // if no errors, redirect to homepage and log in user
        props.logInUser();
        props.history.push("/");
      }
      localStorage.setItem("jwt token", data.token);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const credentials = {
        email: String(email).trim(),
        password: String(password).trim(),
        username: String(username).trim(),
      };
      postUser(credentials);
    } catch (err) {
      throw new Error(err);
    }
  };
  const handleChange = e => {
    const { name, value } = e.target;
    setInput(input => ({ ...input, [name]: value }));
  };
  // Enable sumbmit button only when both fields are populated
  const enabled = email && password;
  return (
    <>
      <div className="container">
        <h1 className="childish-font p-3 pt-5">Sign up to post quote</h1>
        <form className="form-group" onSubmit={handleSubmit}>
          <div className="d-flex flex-column col-sm-8">
            <InputField
              name="email"
              title="Email"
              placeholder="ex: me@mydomain.com"
              value={email}
              className={`form-control shadow-sm mb-3 ${
                isEmailError && "border-danger"
              }`}
              onChange={handleChange}
            />
            <p className="font-weight-light text-danger">{isEmailError}</p>
            <InputField
              name="password"
              title="Password"
              type="password"
              value={password}
              className={`form-control shadow-sm mb-3 ${
                isPasswordError && "border-danger"
              }`}
              onChange={handleChange}
            />
            <p className="font-weight-light text-danger">{isPasswordError}</p>
            <InputField
              name="username"
              title="Username"
              value={username}
              className={`form-control shadow-sm mb-3 ${
                usernameError && "border-danger"
              }`}
              onChange={handleChange}
            />
            <p className="font-weight-light text-danger">{usernameError}</p>
            <button
              type="submit"
              disabled={!enabled}
              className="btn btn-outline-primary font-weight-bold col-sm-4 mt-3"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default SignIn;
