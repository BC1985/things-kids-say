import React, { useState } from "react";

function SignIn(props) {
  const [email, setEmail] = useState("groot@123.com");
  const [password, setPassword] = useState("Groot123$");
  const [isEmailError, setIsEmailError] = useState("");
  const [isPasswordError, setIsPasswordError] = useState(false);

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
      if (!res.ok) {
        // errors from the backend
        const emailErrors = data.errors.email;
        const passwordError = data.errors.password;
        // if there are errors, store in the state and display in UI
        setIsPasswordError(passwordError);
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
      const credentials = { email: email.trim(), password: password.trim() };
      postUser(credentials);
    } catch (err) {
      throw new Error(err);
    }
  };
  // Enable sumbmit button only when both fields are populated
  const enabled = email && password;
  return (
    <>
      <div className="container">
        <h1 className="childish-font p-3 pt-5">Sign up to post quote</h1>
        <form className="form-group" onSubmit={handleSubmit}>
          <div className="d-flex flex-column col-sm-8">
            <label className="col-form-label">Email</label>
            <input
              placeholder="ex: me@mydomain.com"
              type="text"
              value={email}
              className={`form-control shadow-sm mb-3 ${
                isEmailError && "border-danger"
              }`}
              onChange={e => setEmail(e.target.value)}
            />
            <p className="font-weight-light text-danger">{isEmailError}</p>
            <label>Password</label>
            <input
              type="password"
              value={password}
              className={`form-control shadow-sm mb-3 ${
                isPasswordError && "border-danger"
              }`}
              onChange={e => setPassword(e.target.value)}
            />
            <p className="font-weight-light text-danger">{isPasswordError}</p>
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
