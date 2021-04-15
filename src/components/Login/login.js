import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import InputField from "../InputFields/InputField";
import Spinner from "../Spinner/Spinner";
import { baseUrl } from "../../Services/apiServices";

function Login(props) {
  const [input, setInput] = useState({});
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { isSignedIn, logInUser } = props;
  const { email, password } = input;

  useEffect(() => {
    // Redirect to home page if already logged in
    if (isSignedIn) {
      props.history.push("/");
    }
  });

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
      const url = `${baseUrl}/login`;
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

  const handleChange = e => {
    const { name, value } = e.target;
    setInput(input => ({ ...input, [name]: value }));
  };

  const isEnabled = email && password;
  return (
    <div className="container">
      <div className="ml-md-5">
        <h1 className="mt-5 childish-font">
          Login <span>{isLoading && <Spinner />}</span>
        </h1>

        <form
          className="form-group col-sm-8 col-md-7 col-lg-5" style={{position:"static"}} 
          onSubmit={handleSubmit}
        >
          <InputField
            title="Email"
            name="email"
            value={email}
            onChange={handleChange}
          />

          <InputField
            type="password"
            title="Password"
            value={password}
            name="password"
            onChange={handleChange}
          />

          <p className="mt-2 text-danger">{error}</p>
          <button
            type="submit"
            className="btn btn-outline-primary font-weight-bold col-sm-4 mt-3"
            disabled={!isEnabled}
          >
            Submit
          </button>

          <p className="text-primary mt-3">Forgot password?</p>
        </form>
        <p className="text-center">
          Dont' have an account? <Link to="/signup"> Sign up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
