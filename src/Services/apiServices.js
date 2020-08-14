import axios from "axios";
export const apiService = {
  addNewEntry(entry) {
    return fetch("http://localhost:5000/sayings/add", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(entry),
    }).then(res => {
      if (!res.ok) {
        res.json().then(e => Promise.reject(e));
      } else {
        res.json();
      }
    });
  },

  postUser(user) {
    return fetch("http://localhost:5000/users/add", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    }).then(res => {
      if (!res.ok) {
        res.json().then(e => Promise.reject(e));
      } else {
        res.json();
      }
    });
  },

  getToken: async (email, password) => {
    const url = "http://localhost:5000/login";
    const res = await axios.post(url, {
      email: email,
      password: password,
    });
    localStorage.setItem("jwt token", res.data);
  },
};
