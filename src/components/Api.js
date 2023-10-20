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

getUserInfoChanged(){
  return fetch (`${this._url}users/me`, {
    method: "PATCH",
    headers: {
      authorization: this._token,
      "Content-Type": "application/json"
    },
    body: JSON.stringify()
  })}
}
