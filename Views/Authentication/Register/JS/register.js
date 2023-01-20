import { User } from "../../../../Model/User.js";

let firstName = document.querySelector("#first-name");
let lastName = document.querySelector("#last-name");
let email = document.querySelector("#email");
let address = document.querySelector("#address");
let dob = document.querySelector("#datepicker");
let registerButton = document.querySelector("#register-btn");

$(function () {
  $("#datepicker").datepicker();
});

registerButton.addEventListener("click", (e) => {
  e.preventDefault();

  if (checkUerInput()) {
    console.log("Valid Form");
    // if (isUserExists()) {
    //   console.log("User already there");
    // }
    // else {
    //   console.log("This user will be added");
    // }
    (async () => {
      if (await isUserExists()) {
        alert("User already there, just login");
      }
      else {
        console.log("This user will be added");
        addNewUser();
        location.href = "../../../../Views/Authentication/Login/login.html";
      }
    })();
  }
  else {
    console.log("Not Valid Form");
  }
})

function setValidInput(element) {
  element.style.border = "2px solid green";
}

function setInvalidInput(element) {
  element.style.border = "2px solid red";
  element.focus();
}

function checkUerInput() {
  //first name
  let valid = true;
  if (firstName.value.trim() != "") {
    if (firstName.value.match(/^[A-Za-z]+$/)) {
      setValidInput(firstName);
      // debugger;

    }
    else {
      setInvalidInput(firstName);
      valid = false;
    }
  }
  else {
    setInvalidInput(firstName);
    valid = false;
  }

  //last name
  if (lastName.value.trim() != "") {
    if (lastName.value.match(/^[A-Za-z]+$/)) {
      setValidInput(lastName);
    }
    else {
      setInvalidInput(lastName);
      valid = false;
    }
  }
  else {
    setInvalidInput(lastName);
    valid = false;
  }

  //email
  if (email.value.trim() != "") {
    if (email.value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
      setValidInput(email);
    }
    else {
      setInvalidInput(email);
      valid = false;
    }
  }
  else {
    setInvalidInput(email);
    valid = false;
  }

  //address 
  if (address.value.trim() != "") {
    if (address.value.match(/^[A-Za-z]+$/)) {
      setValidInput(address);
    }
    else {
      setInvalidInput(address);
      valid = false;
    }
  }
  else {
    setInvalidInput(address);
    valid = false;
  }

  //dob
  if (dob.value.trim() != "") {
    setValidInput(dob);
  }
  else {
    setInvalidInput(dob);
    valid = false;
  }

  return valid;
}

async function isUserExists() {
  let exist = false;
  let response = await fetch(`http://localhost:3000/employees`);
  let users = await response.json();
  users.filter((user) => {
    if (user.email == email.value.trim()) {
      console.log("Exist");
      // debugger;
      exist = true;
      return;
    }
  })
  return exist;
}

function addNewUser() {
  let username = "user";
  let password = "user";
  let newUser = new User(
    firstName.value.trim(),
    lastName.value.trim(),
    address.value.trim(),
    email.value.trim(),
    datepicker.value.trim(),
    "false",
    username,
    password,
    "employee"
  );
  newUser.addUserToDB();
}

// not valid json