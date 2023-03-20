const firstName = document.getElementById('firstName');
const firstErr = document.getElementById('firstErr');

const lastName = document.getElementById('lastName');
const lastErr = document.getElementById('lastErr');

const email = document.getElementById('email');
const emailErr = document.getElementById('emailErr');

const searchBtn = document.getElementById('Search');

const form = document.getElementById('myForm');

let firstWorking = false;
let lastWorking = false;
let emailWorking = false;

firstName.addEventListener('input', (e) => {
  userRegex = /^[a-zA-Z]+$/;

  if (userRegex.test(e.target.value) == false) {
    firstErr.innerText = "Use letters";
    firstWorking = false;
  }
  else if (e.target.value.length == 0) {
    firstErr.innerText = ("Field is Empty");
    firstWorking = false;
  }
  else if (e.target.value.length < 3) {
    firstErr.innerText = ("Text Length is very small");
    firstWorking = false;
  }
  else if (e.target.value.length > 10) {
    firstErr.innerText = ("Text Length is very large");
    firstWorking = false;
  }
  else {
    firstErr.innerText = ("");
    firstWorking = true;
  }
})



lastName.addEventListener('input', (e) => {
  userRegex = /^[a-zA-Z]+$/;

  if (userRegex.test(e.target.value) == false) {
    lastErr.innerText = "Use letters";
    lastWorking = false;
  }
  else if (e.target.value.length == 0) {
    lastErr.innerText = ("Field is Empty");
    lastWorking = false;
  }
  else if (e.target.value.length < 3) {
    console.log("Text is small");
    lastErr.innerText = ("Text Length is very small");
    lastWorking = false;
  }
  else if (e.target.value.length > 10) {
    lastErr.innerText = ("Text Length is very large");
    lastWorking = false;
  }
  else {
    lastErr.innerText = ("");
    lastWorking = true;
  }
})


email.addEventListener('input', (e) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email.value)) {
    emailErr.innerText = "Invalid Email";
    emailWorking = false;
  } else {
    emailErr.innerHTML = "";
    emailWorking = true;
  }
})

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const first_Name = firstName.value;
  const last_Name = lastName.value;
  const email_ = email.value;
  const password_ = document.getElementById("password").value;
  const id = document.getElementById("Id").value;

  const data = {id, first_Name, last_Name, email_, password_ };
  console.log(data);
  if (!firstWorking || !lastWorking || !emailWorking) {
    alert('Complete the errors');
    return;
  }
  try {
    const response = await fetch('http://localhost:3000/insert-data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    if(response.status == 501){
      alert('Key already Exists');
      return;
    }
  } catch (error) {
    console.log(error.message);
    return;
  }
  firstName.value = "";
  lastName.value = "";
  email.value = "";
  document.getElementById("password").value = "";
  firstErr.innerText = "";
  lastErr.innerText = "";
  alert('Form Submitted Succesfully!');

})

searchBtn.addEventListener('click', async(event) => {
  event.preventDefault();
  const id = document.getElementById("Id").value;
  if(id == ''){
    alert('Enter an Id');
    return;
  }
  firstErr.innerText = "";
  lastErr.innerText = "";
  emailErr.innerText = "";
  
  try{
    const response = await fetch(`http://localhost:3000/users/${id}`);
    const result = await response.json();
    console.log(result);
    if(response.status == 200){
      firstName.value = result.first_name;
    lastName.value = result.last_name;
    email.value = result.email;
    }
    else{
      alert("Id not found");
      return;
    }
  }
  catch(err){
    console.log(err);
  }
})