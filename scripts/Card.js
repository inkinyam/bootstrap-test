export default
class Card {
  constructor (data, template) {
    this._img         = data.img;
    this._title       = data.title;
    this._description = data.description;
    this._price       = data.price;
    this._discount    = data.discount;
    this._label       = data.label;
    this._template    = template;
  }

  _renderCard () {
    const cardElement = this._template.querySelector('.orderCardsItem').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image-left');
    const ArrayPrices = Array.from(cardElement.querySelectorAll('.orderCardsItem__price'));
    const ArrayDiscounts = Array.from(cardElement.querySelectorAll('.orderCardsItem__discount'));

    cardImage.src = this._img;
    cardImage.alt = this._title;
    cardElement.querySelector('.orderCardsItem__overlay').textContent     = this._title;
    cardElement.querySelector('.orderCardsItem__header').textContent      = this._title;
    cardElement.querySelector('.orderCardsItem__description').textContent = this._description;
    cardElement.querySelector('.card__label').classList.add(this._label);

    ArrayPrices.forEach(item => {
      item.textContent = this._price;
    })
    ArrayDiscounts.forEach(item => {
      item.textContent = this._discount;
    })

    this._cardElement = cardElement;
  }

  _setMinusListener (cardElement) {
    const cardCounter = cardElement.querySelector('.card__buttons-counter');
    const finalPrice = cardElement.querySelector('.orderCardsItem__price-final');
    const finalDiscount = cardElement.querySelector('.orderCardsItem__discount-final');
    cardElement.querySelector('.card__left-button').addEventListener('click', (evt) => {
      if (cardCounter.value === '0') {
        evt.target.closest('.orderCardsItem').remove();
      } else {
        cardCounter.value = parseInt(cardCounter.value) - 1;
        finalPrice.textContent = parseInt(finalPrice.textContent)-parseInt(this._price);
        finalDiscount.textContent = parseInt(finalDiscount.textContent)-parseInt(this._discount);
      }
    })
    }


   _setPlusListener (cardElement) {
    const cardCounter = cardElement.querySelector('.card__buttons-counter');
    const finalPrice = cardElement.querySelector('.orderCardsItem__price-final');
    const finalDiscount = cardElement.querySelector('.orderCardsItem__discount-final');
    cardElement.querySelector('.card__right-button').addEventListener('click', (evt) => {
      cardCounter.value = parseInt(cardCounter.value) + 1;
      finalPrice.textContent = parseInt(finalPrice.textContent)+parseInt(this._price);
      finalDiscount.textContent = parseInt(finalDiscount.textContent)+parseInt(this._discount); //проверить, если переменная пустая, ничего не делать

    });
   }

   _setClickListener (cardElement) {
     cardElement.addEventListener('click', ()=>{
       //вызвать функцию открытия большого попапа
     })
   }

  _setDeleteButtonListener (cardElement) {
    cardElement.querySelector('.card__del-button').addEventListener('click', (evt) => {
      evt.target.closest('.orderCardsItem').remove();
    });
  }

   createCard () {
    this._renderCard();
    this._setMinusListener(this._cardElement);
    this._setPlusListener(this._cardElement);
    this._setClickListener(this._cardElement);
    this._setDeleteButtonListener(this._cardElement);

    return this._cardElement;
   }
}
