const elParrotsTemplate = document.querySelector("#parrots-template");
const elParrotsWrapper = document.querySelector(".parrots-wrapper");
const elAddParrotForm = document.querySelector("#add-parrot-form");
const elForm = document.querySelector("#search-form");
const elSearchInput = document.querySelector("#search-input");
const elSort = document.querySelector("#sortby");

const addZero = num => {
  return num < 10 ? "0" + num : num;
}

const createParrotRow = (parrot) => {
  const elParrotRow = elParrotsTemplate.cloneNode(true).content;

  const elParrotImg = elParrotRow.querySelector("#parrot-img");
  elParrotImg.src = parrot.img;

  const elParrotTitle = elParrotRow.querySelector(".card-title");
  elParrotTitle.textContent = parrot.title;

  const elParrotPrice = elParrotRow.querySelector("#parrot-price");
  elParrotPrice.textContent = `$${parrot.price}`;

  const elParrotSizes = elParrotRow.querySelector("#parrot-sizes");
  elParrotSizes.textContent = `${parrot.sizes.width}sm x ${parrot.sizes.height}sm`;

  const elParrotBirthDate = elParrotRow.querySelector("#birth-date");
  const birthDate = new Date(parrot.birthDate);
  elParrotBirthDate.textContent = `${addZero(birthDate.getDate())}.${addZero(birthDate.getMonth()  + 1)}.${addZero(birthDate.getFullYear())}`;

  const elParrotFeatures = elParrotRow.querySelector("#parrot-features");

  const featuresArray = parrot.features.split(",");
  for (let i = 0; i < featuresArray.length; i++) {
    const newLi = document.createElement("li");
    newLi.classList.add("badge", "bg-primary", "me-1", "mb-1");
    newLi.innerText = featuresArray[i];
    elParrotFeatures.appendChild(newLi);
  }

  const favoriteButton = elParrotRow.querySelector("#favorite-button");
  if (parrot.isFavorite){
    favoriteButton.classList.add("fa-solid", "fa-star");
  } else {
    favoriteButton.classList.add("fa", "fa-star-o");
  }

  const elDeleteBtn = elParrotRow.querySelector(".btn-danger");
  elDeleteBtn.dataset.id = parrot.id;

  const elEditBtn = elParrotRow.querySelector(".btn-secondary");
  elEditBtn.dataset.id = parrot.id;

  return elParrotRow;
}


const renderParrots = (array, wrapper) => {
  wrapper.innerHTML = "";

  const elCountNumber = document.querySelector("#count-number");
  elCountNumber.textContent = `Count: ${array.length}`;

  array.forEach((parrot) => {
    const elParrotRow = createParrotRow(parrot);

    elParrotsWrapper.append(elParrotRow);
  });
}

renderParrots(parrots, elParrotsWrapper);

// Qo'shish
elAddParrotForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const formElements = evt.target.elements;
  const nameInputValue = formElements.title.value.trim();
  const imgLinkInputValue = formElements.imgLink.value.trim();
  const priceInputValue = +formElements.price.value.trim();
  const birthDateInputValue = formElements.addBirthDate.value.trim();
  const parrotWidth = +formElements.parrot_width.value.trim();
  const parrotHeight = +formElements.parrot_height.value.trim();
  const featuresInput = formElements.features.value.trim();

  if (nameInputValue && imgLinkInputValue && priceInputValue && birthDateInputValue && parrotWidth && parrotHeight > 0) {
    const addingParrot = {
      id: Math.floor(Math.random() * 1000),
      title: nameInputValue,
      img: imgLinkInputValue,
      price: priceInputValue,
      birthDate: birthDateInputValue,
      sizes: {
        width: parrotWidth,
        height: parrotHeight
      },
      isFavorite: false,
      features: featuresInput
    }

    parrots.unshift(addingParrot);
    elAddParrotForm.reset();
    renderParrots(parrots, elParrotsWrapper);
  }
});

const elEditModal = new bootstrap.Modal("#edit-parrot-modal");
const elEditForm = document.querySelector("#edit-parrot-form");
const elEditTitle = elEditForm.querySelector("#edit-title");
const elEditImgLink = elEditForm.querySelector("#edit-imgLink");
const elEditPrice = elEditForm.querySelector("#edit-price");
const elEditBirthDate = elEditForm.querySelector("#edit-addBirthDate");
const elEditWidth = elEditForm.querySelector("#edit-parrot_width");
const elEditHeight = elEditForm.querySelector("#edit-parrot_height");
const elEditFeatures = elEditForm.querySelector("#edit-features");
const elFaforiteValue = false;

//DELETE va EDIT modalni to'ldirish
elParrotsWrapper.addEventListener("click", (evt) => {
  if (evt.target.matches(".btn-danger")) {
    const clickedBtnId = +evt.target.dataset.id;
    const clickedBtnIndex = parrots.findIndex((chumchuq) => {
      return chumchuq.id === clickedBtnId;
    });
    parrots.splice(clickedBtnIndex, 1)

    renderParrots(parrots, elParrotsWrapper);
  }

  if (evt.target.matches(".btn-secondary")) {
    const clickedBtnId = +evt.target.dataset.id;
    const clickedBtnObj = parrots.find((parrot) => parrot.id === clickedBtnId);

    if (clickedBtnObj) {
      elEditTitle.value = clickedBtnObj.title || "";
      elEditImgLink.value = clickedBtnObj.img || "";
      elEditPrice.value = clickedBtnObj.price || "";
      elEditBirthDate.value = clickedBtnObj.birthDate || "";
      elEditWidth.value = clickedBtnObj.sizes.width || "";
      elEditHeight.value = clickedBtnObj.sizes.height || "";
      elEditFeatures.value = clickedBtnObj.features || "";
      elFaforiteValue.value = clickedBtnObj.isFavorite || false;
      elEditForm.dataset.id = clickedBtnId;
    }
  }
})

// EDIT MODALda o'zgartirish
elEditForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const submittingItemId = +evt.target.dataset.id;

  const titleValue = elEditTitle.value.trim();
  const imgLinkValue = elEditImgLink.value.trim();
  const priceValue = +elEditPrice.value;
  const birthDateValue = elEditBirthDate.value;
  const widthValue = +elEditWidth.value;
  const heightValue = +elEditHeight.value;
  const fearutesValue = elEditFeatures.value.trim();
  const isFaforiteValue = elFaforiteValue.value;

  if (titleValue && imgLinkValue && priceValue && birthDateValue && widthValue && heightValue > 0) {
    const submittingItemIndex = parrots.findIndex(parrot => parrot.id === submittingItemId);

    const submittingItemObj = {
      id: submittingItemId,
      title: titleValue,
      img: imgLinkValue,
      price: priceValue,
      birthDate: birthDateValue,
      sizes: {
        width: widthValue,
        height: heightValue
      },
      isFavorite: isFaforiteValue,
      features: fearutesValue
    }

    parrots.splice(submittingItemIndex, 1, submittingItemObj);
    renderParrots(parrots, elParrotsWrapper);
    elEditModal.hide();
  }
})

// Filter qilish
var findParrots = function (title) {
  let resutArray = parrots.filter(parrot => {
    return parrot.title.match(title);
  })
  return resutArray
}

elForm.addEventListener("input", function(params) {
  params.preventDefault()

  let searchInput = elSearchInput.value.trim()
  let sortingType = elSort.value

  let pattern = new RegExp(searchInput, "gi")
  let resultArray = findParrots(pattern)

  if (sortingType === "2") {
    resultArray.sort((b,  a) => a.price - b.price)
  }
  if (sortingType === "3") {
    resultArray.sort((a,  b) => a.price - b.price)
  }

  renderParrots(resultArray, elParrotsWrapper);
})