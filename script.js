let titleArray = [];
let authorArray = [];
let priorityArray = [];
let categoryArray = [];

let storedTitle = JSON.parse(localStorage.getItem("title"));
let storedAuthor = JSON.parse(localStorage.getItem("author"));
let storedPriority = JSON.parse(localStorage.getItem("priority"));
let storedCategory = JSON.parse(localStorage.getItem("category"));

const form = document.querySelector("form");
const inputTitle = document.getElementById("titleId");
const inputAuthor = document.getElementById("authorId");
const divContent = document.querySelector(".content");
const ulTitle = document.querySelector(".title ul");
const ulAuthor = document.querySelector(".author ul");
const ulPriority = document.querySelector(".priority ul");
const ulCategory = document.querySelector(".category ul");
const selectPriority = document.getElementById("priorityId");
const checkboxCategory = document.querySelectorAll("input[name=categoryName]");
const btnSend = document.querySelector(".send");
const btnDelete = document.querySelector(".delete");

const deleteHistory = () => {
  localStorage.clear();
  window.location.reload(true);
};

const localStorageFunction = () => {
  if (storedTitle === null) {
    divContent.style.display = "none";
    storedTitle = [];
    storedAuthor = [];
    storedPriority = [];
    storedCategory = [];
  } else {
    let storedTitle = JSON.parse(localStorage.getItem("title"));
    for (let i = 0; i < storedTitle.length; i++) {
      const liTitle = document.createElement("li");
      liTitle.textContent = storedTitle[i];
      ulTitle.appendChild(liTitle);
    }

    let storedAuthor = JSON.parse(localStorage.getItem("author"));
    for (let i = 0; i < storedAuthor.length; i++) {
      const liAuthor = document.createElement("li");
      liAuthor.textContent = storedAuthor[i];
      ulAuthor.appendChild(liAuthor);
    }

    let storedPriority = JSON.parse(localStorage.getItem("priority"));
    for (let i = 0; i < storedPriority.length; i++) {
      const liPriority = document.createElement("li");
      liPriority.textContent = storedPriority[i];
      ulPriority.appendChild(liPriority);
    }

    let storedCategory = JSON.parse(localStorage.getItem("category"));
    for (let i = 0; i < storedCategory.length; i++) {
      const liCategory = document.createElement("li");
      liCategory.textContent = storedCategory[i];
      ulCategory.appendChild(liCategory);
    }
  }
};

const addTitle = e => {
  e.preventDefault();

  const title = inputTitle.value;
  const author = inputAuthor.value;
  const priority = selectPriority.value;
  let validCategory = [];
  for (let i = 0; i < checkboxCategory.length; i++) {
    if (!checkboxCategory[i].checked) {
      validCategory[i] = '1';
    } else {
        validCategory[i]='0';
    }
  }

  if (
    title === "" ||
    author.length < 3 ||
    selectPriority.value === "0" ||
    validCategory[0] === validCategory[1] && validCategory[1] === validCategory[2] && validCategory[0] === validCategory[2]
  ) {
    alert(
      "Wpisz tytuł książki, autora, wybierz priorytet przeczytania i zaznacz kategorie"
    );
  } else {
    divContent.style.display = "flex";

    // Tytuł
    const liTitle = document.createElement("li");
    storedTitle.push(title);
    localStorage.setItem("title", JSON.stringify(storedTitle));
    let indexTitle = storedTitle.length - 1;
    liTitle.textContent = storedTitle[indexTitle];
    ulTitle.appendChild(liTitle);
    inputTitle.value = "";

    // Autor
    const liAuthor = document.createElement("li");
    storedAuthor.push(author);
    localStorage.setItem("author", JSON.stringify(storedAuthor));
    let indexAuthor = storedAuthor.length - 1;
    liAuthor.textContent = storedAuthor[indexAuthor];
    ulAuthor.appendChild(liAuthor);
    inputAuthor.value = "";

    // Priorytet
    const liPriority = document.createElement("li");
    storedPriority.push(priority);
    localStorage.setItem("priority", JSON.stringify(storedPriority));
    let indexPriority = storedPriority.length - 1;
    liPriority.textContent = storedPriority[indexPriority];
    ulPriority.appendChild(liPriority);
    selectPriority.value = "0";

    // Kategoria
    for (let i = 0; i < checkboxCategory.length; i++) {
      let ifChecked = checkboxCategory[i].checked;

      if (ifChecked) {
        let category = checkboxCategory[i].value;
        const liCategory = document.createElement("li");
        storedCategory.push(category);
        localStorage.setItem("category", JSON.stringify(storedCategory));
        let indexCategory = storedCategory.length - 1;
        liCategory.textContent = storedCategory[indexCategory];
        ulCategory.appendChild(liCategory);
      }
      checkboxCategory[i].checked = false;
    }
  }
};

btnSend.addEventListener("click", addTitle);
btnDelete.addEventListener("click", deleteHistory);
