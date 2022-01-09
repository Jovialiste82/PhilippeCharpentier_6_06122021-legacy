async function getPhotographers() {
  // Fecth data located in JSON
  const res = await fetch("data/photographers.json", {
    headers: {
      Accept: "application/json",
    },
  });
  let data = await res.json();
  const newDataMediaArr = data.media.sort((a, b) => b.likes - a.likes);
  data = { ...data, media: newDataMediaArr, sort: "likes" };

  // Store data in Local Storage (like feature and other evolutions)
  if (localStorage.getItem("data") == null) {
    localStorage.setItem("data", JSON.stringify(data));
  }

  // et bien retourner le tableau photographers seulement une fois
  return {
    // photographers: [...data.photographers],
    photographers: JSON.parse(localStorage.getItem("data")).photographers,
  };
}

async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");

  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

async function init() {
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers();
  displayData(photographers);
}

init();
