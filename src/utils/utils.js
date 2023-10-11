export const popUps = document.querySelectorAll(".popup");
export const popUpProfile = document.querySelector(".popup_profile");
export const popUpFormImages = document.querySelector(".popup_images");

export const escPopUpDeleting = (evt) => {
  if (evt.key === "Escape") {
    closeAllPopups();
    deletingEvents();
  }
};
  
export const deletingPopUpClick = (evt) => {
  if (evt.target.classList.contains("popup_opened")) {
    closeAllPopups();
    deletingEvents();
  }
}

export function closePopUpProfile(evt) {
  evt.preventDefault();
  popUpProfile.classList.remove("popup_opened");
  deletingEvents();
}

export function closePopUpFormImages(evt) {
  evt.preventDefault();
  popUpFormImages.classList.remove("popup_opened");
  deletingEvents();
}

export function closeAllPopups() {
  popUps.forEach(popup => {
      popup.classList.remove("popup_opened");
  });
}

export function deletingEvents(evt){
document.removeEventListener("keydown", escPopUpDeleting);
document.removeEventListener("click", deletingPopUpClick); 
}