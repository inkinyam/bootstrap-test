// контейнер для попапа
const bigPopup = document.querySelector('.popup');

// массив карточек
const cards = Array.from(document.querySelectorAll('.order-cards'));

//переменные для открытия попапа
const popupImage        = document.querySelector('.card__image-left');
const popupHeader       = document.querySelector('.cards-header');
const popupComposition  = document.querySelector('.cards-composition');

//Создаем заполненный попап
const createPopup = (header, composition, img) => {
  const popupTemplate      = document.querySelector('#popupTemplate').content;
  const popupElement       = popupTemplate.querySelector('.popupElement').cloneNode(true);
  const popupElImage       = popupElement.querySelector('.popup-img');
  const popuElHeader       = popupElement.querySelector('.popup-header');
  const popupElComposition = popupElement.querySelector('.popup-composition');

  popupElImage.src               = img;
  popuElHeader.textContent       = header;
  popupElComposition.textContent = composition;

  return popupElement;
}

const renderPopup = (header, composition, img) => {
  const popupElement = createPopup(header, composition, img);
  bigPopup.prepend(popupElement);
  bigPopup.classList.add('d-block');
  bigPopup.classList.remove('d-none');
}


cards.forEach(item => {
  item.addEventListener('click', evt => {
    bigPopup.classList.add('d-block');
    bigPopup.classList.remove('d-none');

    const card = evt.target.closest('.order-cards');
    const cardHeader = card.querySelector('.cards-header').textContent;
    const cardComposition = 'Состав: '+card.querySelector('.cards-composition').textContent;
    const cardImage = card.querySelector('.card__image-left').src;

    renderPopup(cardHeader, cardComposition, cardImage);
  })
})


document.addEventListener('keydown', evt => {
  if (evt.key === "Escape") {
      bigPopup.classList.remove('d-block');
      bigPopup.classList.add('d-none');

      bigPopup.lastElementChild.remove();
      console.log(bigPopup.children);
  }
})
