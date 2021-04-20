import React, { useState } from "react";
import { apiService } from "../../Services/apiServices";
import InputField from "../InputFields/InputField";

function SignIn(props) {
  const [input, setInput] = useState({});
  const [isEmailError, setIsEmailError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [isPasswordError, setIsPasswordError] = useState(false);
  const [isPasswordRepeatError, setIsPasswordRepeatError] = useState("");
  const { email, password, username, passwordRepeat } = input;
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const postUser = async user => {
    try {
      const data = await apiService.postUser(user)
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
        localStorage.setItem("jwt token", data.token);
        props.logInUser()
        props.history.push("/");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (password !== passwordRepeat) {
        setIsPasswordRepeatError(`passwords don't match`);
      } else {
        const credentials = {
          email: String(email).trim(),
          password: String(password).trim(),
          username: String(username).trim(),
        };
        postUser(credentials);
      }
    } catch (err) {
      throw new Error(err);
    }
  };
  const handleChange = e => {
    const { name, value } = e.target;
    setInput(input => ({ ...input, [name]: value }));
  };

  const isVisible = isPasswordVisible ? "text" : "password";
  
  const toggleVisibile = () => {
    setIsPasswordVisible(visible => !visible);
  };

  // Enable sumbmit button only when both fields are populated
  const enabled = email && password && passwordRepeat && username;
  return (
    <>
      <div className="container">
        <h1 className="childish-font p-3 pt-5">Sign up to post quote</h1>
        <form className="form-group" onSubmit={handleSubmit}>
          <div
            className="d-flex flex-column col-sm-8"
            style={{ position: "static" }}
          >
            <InputField
              name="email"
              title="Email"
              placeholder="ex: me@mydomain.com"
              value={email}
              className={`${isEmailError && "border-danger"}`}
              onChange={handleChange}
            />
            <p className="font-weight-light text-danger">{isEmailError}</p>
            <InputField
              name="password"
              title="Password"
              type={isVisible}
              value={password}
              className={`${isPasswordError && "border-danger"}`}
              onChange={handleChange}
            />
            <div>
              <input
                type="checkbox"
                onClick={toggleVisibile}
                className="mr-2"
                id="show-password"
                style={{ cursor: "pointer" }}
              />
              <label
                htmlFor="show-password"
                className="text-muted form-check-label"
              >
                Show Password
              </label>
            </div>
            <InputField
              name="passwordRepeat"
              title="Repeat password"
              type="password"
              value={passwordRepeat}
              className={`${isPasswordRepeatError && "border-danger"}`}
              onChange={handleChange}
            />
            <p className="font-weight-light text-danger">
              {isPasswordRepeatError}
            </p>
            <p className="font-weight-light text-danger">{isPasswordError}</p>
            <InputField
              name="username"
              title="Username"
              value={username}
              className={`${usernameError && "border-danger"}`}
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
