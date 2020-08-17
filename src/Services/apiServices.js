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

  postUser: async user => {
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
        throw new Error(res.status);
      }
      localStorage.setItem("jwt token", data.token);
    } catch (err) {
      throw new Error(err);
    }
  },
};
