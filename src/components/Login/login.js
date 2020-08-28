import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { isSignedIn, logInUser } = props;

  useEffect(() => {
    // Redirect to home page if already logged in
    if (isSignedIn) {
      props.history.push("/");
    }
  });

  const Spinner = () => {
    return (
      <div className="spinner-grow text-primary" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    );
  };
  const login = async login => {
    const emailIsEmpty = email.trim() === "";
    const passwordIsEmpty = password.trim() === "";
    try {
      if (emailIsEmpty) {
        setError("Please enter email");
        setIsLoading(false);
        throw new Error();
      }
      if (passwordIsEmpty) {
        setError("Please enter password");
        setIsLoading(false);
        throw new Error();
      }
      setError("");
      const url = "http://localhost:5000/login";
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(login),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error);
        setIsLoading(false);
      } else {
        // get jwt from successful login
        localStorage.setItem("jwt token", data);
        props.history.push("/");
        logInUser();
      }
    } catch (err) {
      throw new Error(err);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      setIsLoading(true);
      login({ email: email.trim(), password: password.trim() });
    } catch (error) {
      console.log(error);
    }
  };

  const isEnabled = email && password;
  return (
    <div className="container">
      <h1 className="mt-3 childish-font">
        Login <span>{isLoading && <Spinner />}</span>
      </h1>
      <form className="form-group p-3" onSubmit={handleSubmit}>
        <label className="col-form-label">Email</label>
        <input
          className="form-control"
          type="text"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <label className="col-form-label">Password</label>
        <input
          className="form-control"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <p className="mt-2 text-danger">{error}</p>
        <button
          type="submit"
          className="btn btn-outline-primary font-weight-bold col-sm-4 mt-3"
          disabled={!isEnabled}
        >
          Submit
        </button>
      </form>
      <p className="text-primary">Forgot password?</p>
      <p className="text-center">
        Dont' have an account? <Link to="/signup"> Sign up</Link>
      </p>
    </div>
  );
}

export default Login;
