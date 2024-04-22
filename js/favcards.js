
let cards = document.querySelectorAll(".card");
let cardsimgorig = ["url('/images/krave.png')", "url('/images/chowheats.png')", "url('/images/hboo.png')", "url('/images/cchocula.png')", "url('/images/chex.png')"]

//manual slide for accessibility
document.getElementById("right").addEventListener('click', function () {
   let cardscopy = [];
   let cardsimg = [];
   for (let i = 0; i < cards.length; i++) {
      cardscopy.push(cards[i].innerHTML);
      cardsimg.push(cardsimgorig[i]);
   }
   for (let i = 1; i < cards.length; i++) {
      cards[i].innerHTML = cardscopy[i - 1];
      cardsimgorig[i] = cardsimg[i - 1];
      cards[i].querySelectorAll(".image-container")[0].style.backgroundImage = cardsimg[i - 1];
   }
   cards[0].innerHTML = cardscopy[cards.length - 1];
   cardsimgorig[0] = cardsimg[cards.length - 1];
   cards[0].querySelectorAll(".image-container")[0].style.backgroundImage = cardsimg[cards.length - 1];
});

document.getElementById("left").addEventListener('click', function () {
   let cardscopy = [];
   let cardsimg = [];
   for (let i = 0; i < cards.length; i++) {
      cardscopy.push(cards[i].innerHTML);
      cardsimg.push(cardsimgorig[i]);
   }
   for (let i = cards.length - 2; i >= 0; i--) {
      cards[i].innerHTML = cardscopy[i + 1];
      cardsimgorig[i] = cardsimg[i + 1];
      cards[i].querySelectorAll(".image-container")[0].style.backgroundImage = cardsimg[i + 1];
   }
   cards[cards.length - 1].innerHTML = cardscopy[0];
   cardsimgorig[cards.length - 1] = cardsimg[0];
   cards[cards.length - 1].querySelectorAll(".image-container")[0].style.backgroundImage = cardsimg[0];
});
