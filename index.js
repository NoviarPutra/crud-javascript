import data from "./data.js";

if (!localStorage.getItem("person")) {
  localStorage.setItem("person", JSON.stringify(data));
}

let person = JSON.parse(localStorage.getItem("person"));
const firstName = document.querySelector("input[name=firstName]");
const lastName = document.querySelector("input[name=lastName]");
const editFirstName = document.querySelector("input[name=editFirstName]");
const editLastName = document.querySelector("input[name=editLastName]");
const submit = document.querySelector("#addNewPerson");
const edit = document.querySelector("#editPerson");
const list = document.querySelector("#listPerson");
const modal = document.querySelector("#editModal");
const closeModal = document.querySelector("#close-button");
let personId = null;
const event = new Event("localStorageChange");

person.forEach(function(i) {
  list.innerHTML += `
  <tr>
    <td>${i.firstName}</td>
    <td>${i.lastName}</td>
      <td>
        <button type="button" class="editButton" value="${i.id}">Edit</button>
        <button type="button" class="deleteButton" value="${i.id}">Delete</button>
      </td>
    </td>
  `;
});

submit.addEventListener("submit", function(e) {
  e.preventDefault();
  const personIndex = person.length - 1;
  const newId = person[personIndex].id + 1;
  const newPerson = {
    id: newId,
    firstName: firstName.value,
    lastName: lastName.value
  };
  person.push(newPerson);
  localStorage.setItem("person", JSON.stringify(person));
  list.dispatchEvent(event);
  firstName.value = "";
  lastName.value = "";
});

list.addEventListener("click", function(e) {
  if (e.target.className === "deleteButton") {
    const td = e.target.parentElement;
    const tr = td.parentElement;
    const tbody = tr.parentElement;
    tbody.removeChild(tr);

    const result = person.filter(data => data.id !== Number(e.target.value));
    person = result;
    localStorage.setItem("person", JSON.stringify(person));
  }
  if (e.target.className === "editButton") {
    const td = e.target.parentElement;
    const tr = td.parentElement;
    const tbody = tr.parentElement;
    const result = person.find(data => data.id === Number(e.target.value));
    personId = result.id;
    editFirstName.value = result.firstName;
    editLastName.value = result.lastName;
    if (modal.style.display === "") {
      modal.style.display = "block";
    } else if (modal.style.display === "block") {
      modal.style.display = "none";
    } else {
      modal.style.display = "block";
    }
  }
});

edit.addEventListener("submit", function(e) {
  e.preventDefault();
  const editedPerson = {
    id: personId,
    firstName: editFirstName.value,
    lastName: editLastName.value
  };
  const result = person.map(value => {
    if (value.id === editedPerson.id) {
      return { ...value, ...editedPerson };
    } else {
      return { ...value };
    }
  });
  person = result;
  localStorage.setItem("person", JSON.stringify(result));
  modal.style.display = "none";
  list.dispatchEvent(event);
});

list.addEventListener("localStorageChange", function() {
  list.innerHTML = "";
  person.forEach(function(i) {
    list.innerHTML += `
    <tr>
      <td>${i.firstName}</td>
      <td>${i.lastName}</td>
      <td>
        <button type="button" class="editButton" value="${i.id}">Edit</button>
        <button type="button" class="deleteButton" value="${i.id}">Delete</button>
      </td>
    </td>
  `;
  });
});

window.onclick = function(e) {
  if (e.target === modal) {
    modal.style.display = "none";
  }
};

