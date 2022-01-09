const button = document.querySelector(".sort-button-main");
const buttons = document.querySelector(".dropdown-sort-list");
const options = document.querySelectorAll(".sort-button");

// On click on main button, display dropdown menu
button.addEventListener("click", () => {
  buttons.classList.toggle("hidden");
});

// sort media based on selected option
const sortMedia = (option) => {
  console.log(option);
  let data = JSON.parse(localStorage.getItem("data"));
  let newDataMediaArr;
  switch (option) {
    case "date":
      newDataMediaArr = data.media.sort((a, b) =>
        a[option] < b[option] ? 1 : -1
      );
      break;
    case "title":
      newDataMediaArr = data.media.sort((a, b) =>
        a[option] > b[option] ? 1 : -1
      );
      break;
    default:
      newDataMediaArr = data.media.sort((a, b) => b[option] - a[option]);
  }
  data = { ...data, media: newDataMediaArr, sort: option };
  console.log(data);
  localStorage.setItem("data", JSON.stringify(data));
};

// Upon click on dropdown option
options.forEach((option) => {
  option.addEventListener("click", (e) => {
    // invoke sort function passing selected option as argument
    sortMedia(option.dataset.sort);
    location.reload();
    // Update DOM with new title for main button
    button.innerText = option.innerText;

    // Hide again dropdown menu
    buttons.classList.toggle("hidden");
  });
});
