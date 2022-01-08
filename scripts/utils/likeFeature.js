// Code allowing the toggle of the likes number

const toggleLikeCount = (e) => {
  // Create function to update DOM based on new likes value
  const updateLikeDOM = (newCount) => {
    e.target.innerText = e.target.innerText
      .split(" ")
      .map((el, idx) => (idx === 0 ? newCount.toString() : el))
      .join(" ");
  };

  // get id of media where likes/heart has been cliked
  const mediaId = parseInt(e.target.parentElement.parentElement.dataset.id);

  // retrieve data from local storage
  let data = JSON.parse(localStorage.getItem("data"));

  // Set new likes count
  const mediaObj = data.media.find((m) => m.id === mediaId);
  const alreadyLiked = mediaObj.alreadyLiked ? false : true;
  const newMediaLikesCount = mediaObj.alreadyLiked
    ? mediaObj.likes - 1
    : mediaObj.likes + 1;

  // update media array of in data object
  const mediaArr = data.media.map((m) =>
    m.id !== mediaId ? m : { ...m, likes: newMediaLikesCount, alreadyLiked }
  );

  // save new data in Local Storage
  data = { ...data, media: mediaArr };
  localStorage.setItem("data", JSON.stringify(data));

  // Update DOM
  updateLikeDOM(newMediaLikesCount);
};

const enableLikeFeature = () => {
  const likeButtons = document.querySelectorAll(".media-card-likes");
  likeButtons.forEach((button) => {
    button.addEventListener("click", toggleLikeCount);
  });
};

// enableLikeFeature();
