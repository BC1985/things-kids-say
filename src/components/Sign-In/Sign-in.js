import React, { useState } from "react";
import { apiService } from "../../Services/apiServices";

function SignIn() {
  const [email, setEmail] = useState("");
  const [isInputError, setIsInputError] = useState(false);
  const pattern = new RegExp(
    /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/
  );

  function validateInput(e) {
    e.preventDefault();
    if (!pattern.test(email)) {
      setIsInputError(true);
      setEmail("");
    } else {
      setIsInputError(false);
      apiService.getToken(email);
    }
  }
  return (
    <>
      <div className="container">
        <h1 className="childish-font p-3">Sign in to post quote</h1>
        <form className="form-group">
          <div className="d-flex flex-column col-sm-3">
            <label>Please enter email</label>
            <input
              placeholder="ex: me@mydomain.com"
              type="text"
              value={email}
              className={`form-control shadow-sm mb-3 ${
                isInputError && "border-danger"
              }`}
              onChange={e => setEmail(e.target.value)}
            />
            {isInputError && (
              <p className="text-danger">Email must be valid address</p>
            )}
            <button
              type="button"
              disabled={!email}
              className="btn btn-outline-primary font-weight-bold"
              onClick={validateInput}
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