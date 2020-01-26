let input = document.getElementById("input");
let input2 = document.getElementById("input2");
let isi = document.getElementById("apa");
let button = document.getElementById("button");
let del = document.getElementById("delete");
let arr = [];
del.addEventListener("click", function() {
  arr = [];
  isi.innerHTML = "";
});
button.addEventListener("click", function() {
  let first_name = input.value;
  let last_name = input2.value;
  let full_name = {
    nama_depan: first_name,
    nama_belakang: last_name
  };
  console.log(full_name);
  arr.push(full_name);
  console.log(arr);
  // return [...arr,full_name]
  isi.innerHTML = "";
  arr.forEach(function(object) {
    isi.innerHTML += `
  <tr>
  <td>${object.nama_depan}</td>
  <td>${object.nama_belakang}</td>
  <td><button id='Delete'>Delete</button></td>
  </tr>
  `;
  });
});
