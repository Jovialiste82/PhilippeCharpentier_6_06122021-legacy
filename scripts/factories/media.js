// creer deux classes => img / video => genere le html manquant

class VideoMediaSubFactory {
  static render(video, w, h) {
    return `<video width=${w} height=${h}  controls="controls" preload="metadata">
                <source src="assets/images/${video}" type="video/mp4">
              </video>`;
  }
}

class ImageMediaSubFactory {
  static render(image, title, type) {
    return `<img class="media-${type}-img" src="assets/images/${image}" alt="${title}">`;
  }
}

function mediaFactory(data) {
  const { id, date, image, likes, title, video } = data;

  function getMediaCardDOM() {
    const article = document.createElement("article");
    article.innerHTML = `
      <div class="media-card" data-id="${id}" data-title="${title}" data-date="${date}">
      ${
        image
          ? ImageMediaSubFactory.render(image, title, "card")
          : VideoMediaSubFactory.render(video, "350", "300")
      }
        
        <div class="media-card-text">
          <span class="media-card-title">${title}</span>
          <span class="media-card-likes">${likes} &hearts;</span>
        </div>
      </div>
`;
    return article;
  }

  function getMediaSlidesDOM() {
    const article = document.createElement("article");
    article.innerHTML = `
      <div class="slide hide-slide" data-id="${id}" data-title="${title}" data-date="${date}">
        <div class="slide-media-container">
      ${
        image
          ? ImageMediaSubFactory.render(image, title, "slide")
          : VideoMediaSubFactory.render(video, "100%", "80%")
      }        
        </div>
        <p>${title}</p>
      </div>
`;
    return article;
  }

  return { getMediaCardDOM, getMediaSlidesDOM };
}
