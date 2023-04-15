export default class {

  constructor({
    openModalBtn,
    closeModalBtn,
    modal,
    backDrop,
  }) {
    this.openModalBtn = openModalBtn;
    this.closeModalBtn = closeModalBtn;
    this.modal = modal;
    this.backDrop = backDrop;
  }

  delete() {
    this.modal.classList.add("is-hidden");
    document.removeEventListener('keydown', closeModal);
    this.backDrop.removeEventListener("click", closeModal)
  }

  listeners() {
    document.addEventListener('keydown', closeModal)
    this.backDrop.addEventListener("click", closeModal)
  }

  listenersOpen() {
    this.openModalBtn.addEventListener("click", openModal);
    this.closeModalBtn.addEventListener("click", () => {
      this.delete();
    });
  }

}