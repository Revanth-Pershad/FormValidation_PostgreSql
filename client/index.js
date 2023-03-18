const firstName = document.getElementById('firstName');
const firstErr = document.getElementById('firstErr');

const lastName = document.getElementById('lastName');
const lastErr = document.getElementById('lastErr');

const email = document.getElementById('email');
const emailErr = document.getElementById('emailErr');

const form = document.getElementById('myForm');

let isWorking = false;

firstName.addEventListener('input', (e) => {
  if(e.target.value.length == 0){
    firstErr.innerText = ("Field is Empty");
    isWorking = false;
  }
  else if(e.target.value.length < 3){
    firstErr.innerText = ("Text Length is very small");
    isWorking = false;
  }
  else if(e.target.value.length > 10){
    firstErr.innerText = ("Text Length is very large");
    isWorking = false;
  }
  else{
    firstErr.innerText = ("");
    isWorking = true;
  }
})


lastName.addEventListener('input', (e) => {
  if(e.target.value.length == 0){
    lastErr.innerText = ("Field is Empty");
    isWorking = false;
  }
  else if(e.target.value.length < 3){
    console.log("Text is small");
    lastErr.innerText = ("Text Length is very small");
    isWorking = false;
  }
  else if(e.target.value.length > 10){
    lastErr.innerText = ("Text Length is very large");
    isWorking = false;
  }
  else{
    lastErr.innerText = ("");
    isWorking = true;
  }
})


email.addEventListener('input', (e) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email.value)) {
    emailErr.innerText = "Invalid Email";
    isWorking = false;
  }else{
    emailErr.innerHTML = "";
    isWorking = true;
  }
})

form.addEventListener('submit', async(e) => {
    e.preventDefault();
  
  const first_Name = firstName.value;
  const last_Name = lastName.value;
  const email_ = email.value;
  const password_ = document.getElementById("password").value;

  const data = { first_Name, last_Name, email_, password_ };
  console.log(data);
  if(isWorking == false){
    alert("Complete the form")
  }else{
    try {
      const response = await fetch('http://localhost:3000/insert-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
  
      const result = await response.json();
    } catch (error) {
      console.log(error.message);
    }
  }
  firstName.value = "";
  lastName.value = "";
  email.value = "";
  document.getElementById("password").value = "";
  alert('Form Submitted Succesfully!');
})