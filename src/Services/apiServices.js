export const apiService = {
  addNewEntry: async entry => {
    const token = localStorage.getItem("jwt token");
    const res = await fetch("http://localhost:5000/sayings/add", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${token}`
      },
      body: JSON.stringify(entry),
    });
    const data = await res.json()
    if (!res.ok) {
      return `${res.status} ${res.statusText}`;
    } else {
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
      return data
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

  getUserObject: async () => {
    const token = localStorage.getItem("jwt token");

    const res = await fetch(`http://localhost:5000/users/current-user`, {
      method: "GET",
      headers: {
        authorization: `bearer ${token}`,
      },
    });
    if (!res.ok) {
      console.log("Not logged in");
    } else {
      let data = await res.json();
      return data;
    }
  },
  getQuotesByUser: async id => {
    const token = localStorage.getItem("jwt token");
    const res = await fetch(`http://localhost:5000/sayings/users/${id}`, {
      method: "GET",
      headers: {
        authorization: `bearer ${token}`,
      },
    });
    if (!res.ok) {
      console.log(res.statusText);
    } else {
      let userQuotes = await res.json();
      return userQuotes;
    }
  },
  getQuoteById: async id => {
    const res = await fetch(`http://localhost:5000/sayings/${id}`);
    try {
      if (res.ok) {
        const data = await res.json();
        return data;
      } else {
        throw new Error(res.statusText);
      }
    } catch (err) {
      console.log(err);
    }
  },
  updateQuote: async (id, quoteToUpdate) =>{
    const token = localStorage.getItem("jwt token");
    const url = `http://localhost:5000/sayings/update/${id}`;
    const res = await fetch(url, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${token}`,
      },
      body: JSON.stringify(quoteToUpdate),
    });
    const data = await res.json();
    return data
  },
  deleteQuote: async (id)=>{
    const token = localStorage.getItem("jwt token");
    const url = `http://localhost:5000/sayings/${id}`;
    const res = await fetch(url, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${token}`
      }
      
    })
    const data = await res.json()
    return data   
  }
}
