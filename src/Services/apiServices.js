export const apiService = {
    addNewEntry(entry) {
      return fetch(`${process.env.CONNECTION_URI}/sayings/add`, {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(entry)
      }).then(res => {
        if (!res.ok) {
          res.json().then(e => Promise.reject(e));
        } else {
          res.json();
        }
      });
    },
  
    postUser(user) {
      return fetch(`${process.env.CONNECTION_URI}/users/add`, {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(user)
      }).then(res => {
        if (!res.ok) {
          res.json().then(e => Promise.reject(e));
        } else {
          res.json();
        }
      });
    }
  };
  