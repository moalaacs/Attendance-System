// import { Employee } from "../../../Users/Employee/Employee";

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
  }
  else {
    console.log("Not Valid Form");
  }
  // checkCredential();
  // register();
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
