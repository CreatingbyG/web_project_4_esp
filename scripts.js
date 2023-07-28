const editButton = document.querySelector('.edit-button');
const btnClosed = document.querySelector('.popup__container-btn-closed');
const addButton = document.querySelector('.add-button');
const btnClosedImages = document.querySelector('.popup__container-btn-closed-image')
const titulo = document.querySelector('.profile__description-name');
const subtitle = document.querySelector('.profile__description-info');
const saveButton = document.querySelector('.popup__handlers-button');
const popUpProfile = document.querySelector('.popup_profile');
const popUpFormImages = document.querySelector ('.popup_images')
let nameInput = document.querySelector('.popup__container-texts-input-name');
let jobInput = document.querySelector('.popup__container-texts-input-info');
const likeIcon = document.querySelectorAll('.icons__like');
const darkMode = document.querySelectorAll('.icons__like_like-dark');


editButton.addEventListener('click', openPopUpProfile);
btnClosed.addEventListener('click', closePopUpProfile);
addButton.addEventListener('click', openPopUpFormImages);
btnClosedImages.addEventListener('click', closePopUpFormImages);
saveButton.addEventListener('click', handlerProfileFormSubmit);


likeIcon.forEach(heart => {
  heart.addEventListener('click', (evt) => {
    const element = evt.target;
    const elementDark = element.nextElementSibling;
    element.classList.add('hide');
    element.classList.remove('hide')
    elementDark.classList.add('show');
    elementDark.classList.remove('hide');
  })
})

darkMode.forEach(darkHeart => {
  darkHeart.addEventListener('click', (evt) => {
    const elementDark = evt.target;
    const element = elementDark.previousElementSibling;
    element.classList.remove('hide')
    element.classList.add('show');
    elementDark.classList.add('hide');
    elementDark.classList.remove('show')
  })
})



function openPopUpProfile() {
  popUpProfile.classList.add('popup_opened');
  nameInput.value = titulo.textContent ;
  jobInput.value = subtitle.textContent;
}

function closePopUpProfile(evt) {
  evt.preventDefault();
  popUpProfile.classList.remove('popup_opened');
}

function openPopUpFormImages(){
  popUpFormImages.classList.add('popup_opened');
}

function closePopUpFormImages(evt) {
  evt.preventDefault();
  popUpFormImages.classList.remove ('popup_opened');
}

function handlerProfileFormSubmit(evt){
  evt.preventDefault();
  titulo.textContent = nameInput.value;
  subtitle.textContent = jobInput.value;
  popUpProfile.classList.remove('popup_opened');
}


// PSEUDOCODIGO
// 1. SABER QUE IMAGEN SELECCIONO EL USUARIO
// 2. CONSTRUYO LA RUTA DE ESA IMAGEN
// 3. MUESTRO POP UP 
// 4. MUESTRO LA IMAGEN EN EL POP UP

// SHOW CARD IMAGE UPON CLICKING ON CARD
function openPopUpImages(numberCard){
  if (numberCard == null){
    numberCard = 1;
  }

  // 1. TO BUILD ROUTE IMAGE
  var routeImage = "images/image-card-{numeroImagen}.jpg";
  routeImage = routeImage.replace("{numeroImagen}", numberCard);

  // 2. OPEN POP UP
  const popUpFormImages = document.querySelector('.popup_preview_images');
  popUpFormImages.classList.add('popup_opened');

  // 3. HERE WE CHANGE THE POP UP IMAGE SRC 
  const imagePopUp = document.getElementById('img-card-popup');
  imagePopUp.setAttribute('src', routeImage);
  imagePopUp.setAttribute('alt', 'Imagen de la ciudad')
}

function closePopUpPreviewImagesModal(){
  const popUpPreview = document.querySelector('.popup_preview_images');
  popUpPreview.classList.remove ('popup_opened');
}

