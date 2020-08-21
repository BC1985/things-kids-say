import React, { useState, useEffect } from "react";
import axios from "axios";
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
  const getToken = async (email, password) => {
    try {
      setError("");
      const url = "http://localhost:5000/login";
      const res = await axios.post(url, {
        email: email,
        password: password,
      });
      localStorage.setItem("jwt token", res.data);
      props.history.push("/");
      logInUser();
    } catch (err) {
      setError("Invalid login credentials");
      setIsLoading(false);
    }
  };
  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const request = getToken(email, password);
      await request;
    } catch (error) {
      console.log(error);
    }
  };

  const isEnabled = email && password;
  return (
    <div className="container">
      <h1 className="mt-3 childish-font">Login</h1>
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
          type="text"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <p className="mt-2 text-danger">{error ? error : " "}</p>
        <button
          type="submit"
          className="btn btn-outline-primary font-weight-bold col-sm-4 mt-3"
          disabled={!isEnabled}
        >
          Submit
        </button>
      </form>
      <p className="text-center">
        Dont' have an account? <Link to="/signup"> Sign up</Link>
      </p>
      {isLoading && <Spinner />}
    </div>
  );
}

export default Login;
