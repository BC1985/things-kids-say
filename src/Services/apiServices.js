export const apiService = {
  addNewEntry: async entry => {
    const token = localStorage.getItem("jwt token");
    const res = await fetch("http://localhost:5000/sayings/add", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "authorization": `bearer ${token}`
      },
      body: JSON.stringify(entry),
    });
    const data = await res.json()
    if (!res.ok) {
      throw new Error(res.status);
    } else{
      return data;
    }
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
  seeIfUserExists: async enteredUser => {
    const req = await fetch("http://localhost:5000/users");
    const data = await req.json();
    const existingUser = data.filter(user => user.email === enteredUser.email);
    if (existingUser.length !== 0) {
      console.log("existing user", existingUser);
      return true;
    }
  },

  getUsername: async () => {
    const token = localStorage.getItem("jwt token");

    const res = await fetch(`http://localhost:5000/users/username`, {
      method: "GET",
      headers: {
        authorization: `bearer ${token}`,
      },
    });
    if (!res.ok) {
      console.log("Not logged in");
    } else {
      let data = await res.json();
      return data.username;
    }
  },
};
