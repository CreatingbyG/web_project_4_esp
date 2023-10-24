
export default class Api{
  constructor(){
    this._token = "64bdc8e1-28e5-4d06-acdb-847b17c56560";
    this._groupId = "web_es_09";
    this._url = `https://around.nomoreparties.co/${this._groupId}/`;
  }

getInitialCards(){
  return fetch(`${this._url}cards`, {
    headers: {
      authorization: this._token,
    }
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
    });
}

addNewCard(cardData){
  return fetch(`${this._url}cards`, {
    method: 'POST',
    headers: {
      authorization: this._token,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(cardData)
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
    });
}

getUserInfo(){
  return fetch(`${this._url}users/me`, {
    method: `GET`,
    headers:{
    authorization: this._token,
  },
})
.then(res => {
  if (res.ok) {
    return res.json();
  }
});
}

getUserInfoChanged(data){
  return fetch (`${this._url}users/me`, {
    method: "PATCH",
    headers: {
      authorization: this._token,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: data.name,
      about: data.job
    })
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
  });
}

getUserInfoChanged(){
  return fetch (`${this._url}users/me`, {
    method: "GET",
    headers: {
      authorization: this._token,
    },
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
  });
}

updateAvatar(avatarLink) {
  return fetch(`${this._url}users/me/avatar`, {
    method: 'PATCH',
    headers: {
      authorization: this._token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ avatar: avatarLink.link }),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(`Error updating avatar: ${response.statusText}`);
      }
    })
    .catch((error) => {
      console.error(`Error in updateAvatar: ${error}`);
    });
}

getInfoAvatar(){
  return fetch(`${this._url}users/me/avatar`, {
    method: 'GET',
    headers:{
      authorization: this._token,
    }
  })
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
})
.catch((error) => {
  console.error(`Error in updateAvatar: ${error}`);
});
}
}
