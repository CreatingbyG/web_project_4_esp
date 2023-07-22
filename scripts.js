const editButton = document.querySelector('.edit-button');
const btnClosed = document.querySelector('.popup__btn_closed');
const addButton = document.querySelector('.add-button');
const btnClosedImages = document.querySelector('.popup__btn_closed')
const titulo = document.querySelector('.profile__description-name');
const subtitle = document.querySelector('.profile__description-info');
const saveButton = document.querySelector('.save__button');
const popUpProfile = document.querySelector('.popup_profile');
const popUpFormImages = document.querySelector ('.popup_images')
let nameInput = document.querySelector('.popup__container_input_name');
let jobInput = document.querySelector('.popup__container_input_info');



editButton.addEventListener('click', openPopUpProfile);
btnClosed.addEventListener('click', closePopUpProfile);
addButton.addEventListener('click', openPopUpFormImages);
btnClosedImages.addEventListener('click', closePopUpFormImages);
saveButton.addEventListener('click', handlerProfileFormSubmit);


function openPopUpProfile() {
  popUpProfile.classList.add('popup_opened');
  nameInput.value = titulo.textContent ;
  jobInput.value = subtitle.textContent;
}

function closePopUpProfile() {
  popUpProfile.classList.remove('popup_opened');
}

function openPopUpFormImages(){
  popUpFormImages.classList.add('popup_opened');
}

function closePopUpFormImages() {
  popUpFormImages.classList.remove ('popup_opened');
}

function handlerProfileFormSubmit(e){
  e.preventDefault();
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
  console.log("Abriendo numero de card " + numberCard)
  if (numberCard == null){
    numberCard = 1; // Sino hay nada por parametros, muestra la imagen uno
  }

  // 1. TO BUILD ROUTE IMAGE
  var routeImage = "images/image-card-{numeroImagen}.jpg";
  routeImage = routeImage.replace("{numeroImagen}", numberCard);
  console.log("RUTA CONSTRUIDA: " + routeImage)

  // 2. OPEN POP UP
  const popUpFormImages = document.querySelector('.popup_preview_images');  // Can be reused si lo defines arriba
  popUpFormImages.classList.add('popup_opened');

  // 3. HERE WE CHANGE THE POP UP IMAGE SRC
  const imagePopUp = document.getElementById('img-card-popup');
  imagePopUp.src = routeImage;
}

function closePopUpPreviewImagesModal(){
  const popUpPreview = document.querySelector('.popup_preview_images');  // Can be reused si lo defines arriba
  popUpPreview.classList.remove ('popup_opened');
}