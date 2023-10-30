import { popupDeleting } from "../pages/index.js";
import { api } from "../pages/index.js";

export class Card {
  constructor({name, link, likes, owner = {}, _id}, templateSelector, user) {
    this.templateSelector = templateSelector;
    this.name = name;
    this.link = link;
    this._likes = likes || [];
    this.user = user._id;
    this.owner = owner._id || {};
    this.cardId = _id || null;
    this.ownerName = owner.name;
    this.userName = user.name;
    this.likeCountElement = null;
    this._isLiked = this._likes.some((like) => like.name === this.userName);
  }
  _createCardElement() {
    const template = document.querySelector(this.templateSelector).content;
    const element = template.querySelector(".elements").cloneNode(true);

    const elementTitle = element.querySelector(".card__image-text");
    elementTitle.textContent = this.name;

    const elementImage = element.querySelector(".card-photo");
    elementImage.src = this.link;
    elementImage.alt = this.name;

    this.likeIcon = element.querySelector(".icons__dislike");
    this._listeners();


    const deleteBtnIcon = element.querySelector(".icons__delete");
    if (this.user !== this.owner){
      deleteBtnIcon.style.display = "none" 
    }

    deleteBtnIcon.addEventListener("click", (evt) => {   
      this.cardToDelete = evt.target.closest(".elements");  
      popupDeleting.open(this.cardToDelete, this.cardId)
    });

     this.likeCountElement = element.querySelector(".icons__like_number");
      this.likeCountElement.textContent = this._likes.length > 0 ? this._likes.length : '';

    if (this._likes.length === 0) {
      this.likeCountElement.style.display = 'none';
    } else {
      this.likeCountElement.style.display = 'block';
    }
    this.myLike()
  

    return element;
  }

  _handleToggleClick() {
    this._isLiked = !this._isLiked;
    this.likeIcon.classList.toggle("icons__like");
    this.handleLike(this.cardId)
  }

  handleLike(_id){
    if (this._isLiked){  
      api.addLike(this.cardId).then((res) => {
        if (res && res.likes){
        this._likes = res.likes;
        if (this.likeCountElement) {
          this.likeCountElement.textContent = this._likes.length > 0 ? this._likes.length : '';
        } 
        }       // this._getLikes;
      })
    } else {
      api.removeLike(_id).then((res) => {
        if (res && res.likes){
        this._likes = res.likes
        if (this.likeCountElement) {
          this.likeCountElement.textContent = this._likes.length > 0 ? this._likes.length : '';
        }
      }       // this._getLikes;
      });
    }
  }
  // _getLikes() {
  //   const likeCountElement = this._element.querySelector('.icons__likes_number');
  //   if (this._likes.length > 0) {
  //     likeCountElement.textContent = this._likes.length;
  //     likeCountElement.style.display = 'block';
  //   } else {
  //     likeCountElement.textContent = '';
  //     likeCountElement.style.display = 'none';
  //   }
  // }
  
  myLike(){
      if (this._isLiked){
         this.likeIcon.classList.add("icons__like");
       }
     }


  createCard() {
    return this._createCardElement();
  }

  _listeners(){
    this.likeIcon.addEventListener("click", () => {
      this._handleToggleClick();
      //this.handleLike();
    })
  }
}