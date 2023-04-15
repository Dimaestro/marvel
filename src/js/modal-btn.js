const elements = {
  openModalBtn: document.querySelector("[data-modal-open]"),
  closeModalBtn: document.querySelector("[data-modal-close]"),
  modal: document.querySelector("[data-modal]"),
};

elements.openModalBtn.addEventListener("click", toggleModal);
elements.closeModalBtn.addEventListener("click", toggleModal);

function toggleModal() {
  elements.modal.classList.toggle("is-hidden");
  
}
