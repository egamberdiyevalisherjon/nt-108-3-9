let wrapper = document.querySelector(".wrapper");

let images = [
  "./images/apple.svg",
  "./images/apple.svg",
  "./images/netlify.svg",
  "./images/netlify.svg",
  "./images/facebook.webp",
  "./images/facebook.webp",
  "./images/youtube.webp",
  "./images/youtube.webp",
  "./images/github.png",
  "./images/github.png",
  "./images/google.png",
  "./images/google.png",
];

(function game() {
  let usedIndexes = [];
  let clickedImages = [];
  let matches = 0;
  let gameOver = false;
  let chances = 14;

  wrapper.innerHTML = `<h1>
        <span>Urinishlar soni: <span class="chances">${chances}</span></span>
        <span>O'xshashlikalar soni: <span class="matches">${matches}</span></span>
      </h1>`;

  let matchesElement = document.querySelector(".matches");
  let chancesElement = document.querySelector(".chances");

  for (let i = 0; i < images.length; i++) {
    let r = Math.floor(Math.random() * images.length);

    while (usedIndexes.includes(r)) {
      r = Math.floor(Math.random() * images.length);
    }

    usedIndexes.push(r);

    let card = document.createElement("div");
    card.classList.add("card");

    let imageWrapper = document.createElement("div");
    imageWrapper.classList.add("img-wrapper");

    let image = document.createElement("img");
    image.setAttribute("src", images[r]);

    imageWrapper.append(image);
    card.append(imageWrapper);

    wrapper.append(card);

    card.addEventListener("click", (e) => {
      if (gameOver) return;

      let element = e.target;

      if (!element.classList.contains("card")) return;

      if (element.classList.contains("on")) return;

      element.classList.add("on");
      clickedImages.push(element);

      if (clickedImages.length >= 2) {
        let imageSrc1 = clickedImages[0]
          .querySelector("img")
          .getAttribute("src");
        let imageSrc2 = clickedImages[1]
          .querySelector("img")
          .getAttribute("src");

        chances--;
        chancesElement.textContent = chances;

        if (imageSrc1 === imageSrc2) {
          clickedImages = [];
          matches++;
          matchesElement.textContent = matches;
        } else {
          let clickedImage1 = clickedImages[0];
          let clickedImage2 = clickedImages[1];
          clickedImages = [];

          setTimeout(() => {
            clickedImage1.classList.remove("on");
            clickedImage2.classList.remove("on");
          }, 1000);
        }

        let rematch = false;

        setTimeout(() => {
          if (chances === 0) {
            gameOver = true;
            if (matches === images.length / 2) {
              rematch = confirm("Yuttiz, tabriklar! Qayta o'nisizmi?");
            } else {
              rematch = confirm("Yutqazdiz, tabrklar! Qayta o'nisizmi?");
              setTimeout(() => {
                let cards = document.querySelectorAll(".card");

                for (let card of cards) {
                  card.classList.add("on");
                }
              }, 1000);
            }
          }

          if (!gameOver && matches === images.length / 2) {
            rematch = confirm("Yuttiz, tabriklar! Qayta o'nisizmi?");
            gameOver = true;
          }

          setTimeout(() => {
            if (rematch) {
              game();
            }
          }, 1000);
        }, 310);
      }
    });
  }
})();
