const elements = {
  imgMaxConteiner: document.querySelector('.js-img-max-conteiner'),
  imgMinList: document.querySelector('.js-img-list'),
  imgMax: document.querySelector('.js-img-max'),
  closeModalBtn: document.querySelector("[data-modal-close]"),
}

elements.imgMinList.addEventListener('click',onClickReplaceImg);
elements.closeModalBtn.addEventListener("click", onRerenderModalGalleryImg);

function onClickReplaceImg(event) {
  if(event.target.classList.contains('js-img-min')) {
    let pathNewMaxImg = event.target.src;
    renderImgGallery(pathNewMaxImg);
  }
}

function onRerenderModalGalleryImg() {
  console.log(elements.imgMax.src);
  renderImgGallery(elements.imgMax.src)
}

function renderImgGallery(path) {
  elements.imgMaxConteiner.innerHTML = `<img src="${path}" alt="" width="295" height="387">` 
}

