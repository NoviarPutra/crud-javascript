const firstName = document.querySelector("[name=firstName]");
const lastName = document.querySelector("[name=lastName]");
const submit = document.querySelector("#addNewPerson");

submit.addEventListener("submit", function(e) {
  e.preventDefault();
  const newPerson = {
    firstName: firstName.value,
    lastName: lastName.value
  };
  console.log(newPerson);
});
