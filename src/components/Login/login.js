import React, { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  

  const handleSubmit = e => {
    e.preventDefault();
  };

  const isEnabled = email && password
  return (
    <div className="container childish-font">
      <h1 className="mt-3 ">Login</h1>
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
        <p className="mt-2 text-danger">{error ?error : " "}</p>
        <button type="submit" className="btn btn-outline-primary font-weight-bold col-sm-4 mt-3" disabled={!isEnabled}>Submit</button>
      </form>
    </div>
  );
}

export default Login;