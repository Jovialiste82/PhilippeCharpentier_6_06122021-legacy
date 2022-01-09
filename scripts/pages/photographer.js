//Mettre le code JavaScript lié à la page photographer.html
const setMainSortButton = (option) => {
  const button = document.querySelector(".sort-button-main");
  button.dataset.sort = option;
  button.innerText =
    option === "likes" ? "Popularité" : option === "date" ? "Date" : "Titre";
};

async function getData(photographerId) {
  const data = JSON.parse(localStorage.getItem("data"));
  console.log(data);
  const photographer = data.photographers.find((p) => p.id === photographerId);
  const portfolio = data.media
    .filter((obj) => obj.photographerId === photographerId)
    .map((obj) => obj);
  const totalLikes = portfolio.reduce((acc, curr) => {
    return acc + curr.likes;
  }, 0);
  return { photographer, portfolio, totalLikes };
}

function displayPhotographerInfo(photographer, totalLikes) {
  const { name, portrait, city, country, price, tagline } = photographer;
  const picture = `assets/photographers/${portrait}`;
  const header = document.querySelector(".photograph-header");
  const aside = document.querySelector("aside");
  header.innerHTML = `
        <div class="card2-bio">
          <h2 class="photographer-name">${name}</h2>
          <p class="location">${city}, ${country}</p>
          <p class="tagline">${tagline}</p>
        </div>
        <button class="contact_button" onclick="displayModal()">
          Contactez-moi
        </button>
        <img src=${picture} alt="${name}">
`;
  aside.innerHTML = `
        <div class="aside-container">
            <div>${totalLikes} &hearts;</div>
            <div>${price}€ / jour</div>
        </div>
  `;
}

function displayMedia(portfolioArray) {
  const portfolioSection = document.querySelector(".portfolio-section");
  const lightboxSection = document.querySelector(".slider-media-container");
  portfolioArray.forEach((portfolioItem) => {
    const mediaModel = mediaFactory(portfolioItem);
    const mediaCardDOM = mediaModel.getMediaCardDOM();
    const mediaSlidesDOM = mediaModel.getMediaSlidesDOM();
    portfolioSection.appendChild(mediaCardDOM);
    lightboxSection.appendChild(mediaSlidesDOM);
  });
  enableLikeFeature();
  enableLightboxListeners();
}

async function init() {
  // retrieve sort option from Local Storage
  const { sort } = JSON.parse(localStorage.getItem("data"));
  setMainSortButton(sort);
  const urlParams = new URLSearchParams(window.location.search);
  const photographerId = parseInt(urlParams.get("photographer"));
  const { photographer, portfolio, totalLikes } = await getData(photographerId);
  // console.log(photographer);
  console.log(portfolio);
  console.log(photographer);
  // console.log(totalLikes);
  displayPhotographerInfo(photographer, totalLikes);
  displayMedia(portfolio);
}

init();
