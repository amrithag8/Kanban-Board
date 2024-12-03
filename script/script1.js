const mainInnerContainer = document.querySelector(".main-inner-container");
const mainCardContainer = document.querySelector(".main-card-container");
const addButton = document.querySelector(".input-field >button");
const sideIcon = document.querySelector(".title-wrapper >.fa-bars");
const sidebar = document.querySelector(".sidebar");
const close_icon = document.querySelector(".sidebar-header >.fa-xmark");
const sidebar_btn = document.querySelector(".sidebar-btn >button");
const titleWrapperHeading = document.querySelector(".title-wrapper >h1");
let count = 0;
let boardValue;

function clickAddButtonHandler(e) {
  count = count + 1;

  const newCard = document.createElement("div");
  newCard.className = "new-card";

  const title_deleteIcon_div = document.createElement("div");
  title_deleteIcon_div.className = "title-deleteBtn";

  const h2Element = document.createElement("h2");
  h2Element.textContent =
    e.target.previousElementSibling.value || "Untitled Card" + count;

  title_deleteIcon_div.appendChild(h2Element);
  title_deleteIcon_div.innerHTML += `<i class="fa-solid fa-trash"></i>`;

  const inputElement = document.createElement("input");
  inputElement.setAttribute("type", "text");
  inputElement.setAttribute("placeholder", "Add Task...");

  const buttonElement = document.createElement("button");
  const taskMain = document.createElement("div");
  taskMain.className = "task-main";
  buttonElement.className = "create-task";
  buttonElement.textContent = "+";

  newCard.appendChild(title_deleteIcon_div);
  newCard.appendChild(taskMain);
  newCard.appendChild(inputElement);
  newCard.appendChild(buttonElement);
  mainCardContainer.appendChild(newCard);

  e.target.previousElementSibling.value = "";
}

function addMoreTasks(e) {
  if (e.classList.contains("create-task")) {
    const value = e.previousElementSibling.value;
    if (value !== "") {
      const taskDiv = document.createElement("div");
      taskDiv.setAttribute("draggable", true);
      const editDeleteBtn = document.createElement("div");
      editDeleteBtn.className = "edit-delete-btn";
      taskDiv.className = "add-taskDiv";
      taskDiv.innerHTML = `<p class='task-content'>${value}</p>`;
      taskDiv.appendChild(editDeleteBtn);
      editDeleteBtn.innerHTML = `<i class="fa-regular fa-pen-to-square"></i>`;
      editDeleteBtn.innerHTML += `<i class="fa-solid fa-trash"></i>`;

      const task_main = e.parentElement.querySelector(".task-main");

      task_main.appendChild(taskDiv);
      e.previousElementSibling.value = "";
    }
  }
}

function deleteTaskHandler(e) {
  if (e.classList.contains("fa-trash")) {
    const editDelete = e.parentElement;
    const result = confirm("Delete the card?");
    if (result) {
      editDelete.parentElement.remove();
    }
  }
}

function editTaskHandler(e) {
  if (
    e.classList.contains("fa-pen-to-square") &&
    !e.parentElement.previousElementSibling.classList.contains("input-element")
  ) {
    const editDelete = e.parentElement;
    const divContent = editDelete.previousElementSibling.textContent;
    editDelete.previousElementSibling.remove();
    const inputElement = document.createElement("input");
    inputElement.className = "input-element";
    inputElement.setAttribute("type", "text");
    inputElement.value = divContent;
    editDelete.parentElement.insertBefore(
      inputElement,
      editDelete.parentElement.children[0]
    );
    inputElement.focus();

    inputElement.addEventListener("blur", (event) => {
      const newEditedVal = event.target.value;
      const newValElement = document.createElement("p");
      newValElement.textContent = newEditedVal;
      event.target.replaceWith(newValElement);
    });
  }
}

function dragstartDiv(e) {
  if (e.classList.contains("add-taskDiv")) {
    let selected = e;

    if (
      e.parentElement?.parentElement?.nextElementSibling?.classList?.contains(
        "new-card"
      )
    ) {
      e.parentElement?.parentElement?.nextElementSibling.addEventListener(
        "dragover",
        (event) => {
          event.preventDefault();
        }
      );
      e.parentElement?.parentElement?.nextElementSibling.addEventListener(
        "drop",
        (ev) => {
          ev.target.querySelector(".task-main").appendChild(selected);
          selected = null;
        }
      );
    }

    if (
      e.parentElement?.parentElement?.previousElementSibling?.classList?.contains(
        "new-card"
      )
    ) {
      e.parentElement?.parentElement?.previousElementSibling.addEventListener(
        "dragover",
        (event) => {
          event.preventDefault();
        }
      );
      e.parentElement?.parentElement?.previousElementSibling.addEventListener(
        "drop",
        (ev) => {
          ev.target.querySelector(".task-main").appendChild(selected);
          selected = null;
        }
      );
    }
  }
}

function sideBarhandler(e) {
  sidebar.style.transform = `translateX(0px)`;
  sidebar.style.transition = "transform .5s ease";
}

function closeSideBar(e) {
  sidebar.style.transform = `translateX(-320px)`;
  sidebar.style.transition = "transform .5s ease";
}

addButton.addEventListener("click", (e) => clickAddButtonHandler(e));
mainCardContainer.addEventListener("click", (e) => addMoreTasks(e.target));
mainCardContainer.addEventListener("click", (e) => deleteTaskHandler(e.target));
mainCardContainer.addEventListener("click", (e) => editTaskHandler(e.target));
mainCardContainer.addEventListener("dragstart", (e) => dragstartDiv(e.target));
sideIcon.addEventListener("click", (e) => sideBarhandler(e.target));
close_icon.addEventListener("click", (e) => closeSideBar(e.target));
sidebar_btn.addEventListener("click", (e) => {
  boardValue =
    e.target.parentElement.previousElementSibling.querySelector("input").value;
  if (boardValue) {
    titleWrapperHeading.textContent = boardValue;
  }
});
