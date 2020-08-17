import React, { useState } from "react";
import { apiService } from "../../Services/apiServices";

function SignIn(props) {
  const [email, setEmail] = useState("groot@123.com");
  const [password, setPassword] = useState("Groot123$");
  const [isEmailError, setIsEmailError] = useState(false);
  const [isPasswordError, setIsPasswordError] = useState(false);

  const emailPattern = new RegExp(
    /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/
  );
  const passwordPattern = new RegExp(
    /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[\S]+/
  );
  const handleSubmit = e => {
    try{
      const credentials = { email: email, password: password };
      e.preventDefault();
      const passwordError = showPasswordError();
      const emailError = showEmailError();
      emailError ? setIsEmailError(true) : setIsEmailError(false);
      passwordError ? setIsPasswordError(true) : setIsPasswordError(false);
      apiService.postUser(credentials);
      props.logInUser()
      props.history.push('/')

    }catch(err){
      throw new Error(err)
    } 
  };

  const showEmailError = () => {
    if (!emailPattern.test(email)) {
      return "Please enter valid email";
    } else {
      setIsEmailError(false);
    }
  };
  const showPasswordError = () => {
    if (password.length < 6) {
      return "must be at least six characters in length ";
    } else if (password.length > 72) {
      return "Password must be less than 72 characters";
    } else if (!passwordPattern.test(password)) {
      return "Password must contain uppercase, lowecase number and special character";
    } else {
      setIsPasswordError(false);
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
            <label className="col-form-label">Please enter email</label>
            <input
              placeholder="ex: me@mydomain.com"
              type="text"
              value={email}
              className={`form-control shadow-sm mb-3 ${
                isEmailError && "border-danger"
              }`}
              onChange={e => setEmail(e.target.value)}
            />
            <p className="font-weight-light text-danger">
              {isEmailError && showEmailError()}
            </p>
            <label>Password</label>
            <input
              type="password"
              value={password}
              className={`form-control shadow-sm mb-3 ${
                isPasswordError && "border-danger"
              }`}
              onChange={e => setPassword(e.target.value)}
            />
            <p className="font-weight-light text-danger">
              {isPasswordError && showPasswordError()}
            </p>
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
