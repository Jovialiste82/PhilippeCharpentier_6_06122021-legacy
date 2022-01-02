// ///// Old code ///////////////
// function photographerFactory(data) {
//   const { name, portrait } = data;

//   const picture = `assets/photographers/${portrait}`;

//   function getUserCardDOM() {
//     const article = document.createElement("article");
//     const img = document.createElement("img");
//     img.setAttribute("src", picture);
//     const h2 = document.createElement("h2");
//     h2.textContent = name;
//     article.appendChild(img);
//     article.appendChild(h2);
//     return article;
//   }
//   return { name, picture, getUserCardDOM };
// }

function photographerFactory(data) {
  const { name, portrait, city, country, price, tagline, id } = data;

  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement("article");
    const baseURL = "/photographer.html";
    const url = `${baseURL}?photographer=${id}`;
    article.innerHTML = `
      <a href=${url}>
        <img src=${picture} alt="">
        <h2 class="photographer-name">${name}</h2>
      </a>
      <div>
        <p class="location">${city}, ${country}</p>
        <p class="tagline">${tagline}</p>
        <p class="price">${price}€/jour</p>
      </div>
`;
    return article;
  }

  return { name, picture, getUserCardDOM };
}
