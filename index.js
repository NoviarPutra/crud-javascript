import data from "./data.js";

if (!localStorage.getItem("person")) {
  localStorage.setItem("person", JSON.stringify(data));
}

let person = JSON.parse(localStorage.getItem("person"));
const firstName = document.querySelector("[name=firstName]");
const lastName = document.querySelector("[name=lastName]");
const submit = document.querySelector("#addNewPerson");
const list = document.querySelector("#listPerson");

person.forEach(function(i) {
  list.innerHTML += `
  <tr>
    <td>${i.firstName}</td>
    <td>${i.lastName}</td>
      <td><button type="button" class="deleteButton" value="${i.id}">Delete</button></td>
    </td>
  `;
});

submit.addEventListener("submit", function(e) {
  e.preventDefault();
  const newPerson = {
    id: person.length + 1,
    firstName: firstName.value,
    lastName: lastName.value
  };
  person.push(newPerson);
  localStorage.setItem("person", JSON.stringify(person));

  list.innerHTML = "";
  person.forEach(function(i) {
    list.innerHTML += `
    <tr>
      <td>${i.firstName}</td>
      <td>${i.lastName}</td>
      <td><button type="button" class="deleteButton" value="${i.id}">Delete</button></td>
    </td>
  `;
  });
});

list.addEventListener("click", function(e) {
  if (e.target.className === "deleteButton") {
    console.log(e);
    const td = e.target.parentElement;
    const tr = td.parentElement;
    const tbody = tr.parentElement;
    tbody.removeChild(tr);

    const result = person.filter(data => data.id !== Number(e.target.value));
    person = result;
    localStorage.setItem("person", JSON.stringify(person));
  }
});
