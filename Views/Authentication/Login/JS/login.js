let loginForm = document.querySelector("form");
let loginBtn = document.querySelector(".login-btn");
let loginEmail = document.querySelector("#login-email");
let loginPassword = document.querySelector("#login-password");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  e.stopPropagation();
  let validEmail = loginEmail.checkValidity();
  let validPassword = loginPassword.checkValidity();
  if (validEmail && validPassword) {
    checkCredential();
  }
});

async function checkCredential() {
  let response = await fetch(
    `http://localhost:3000/employees?email=${loginEmail.value}&&password=${loginPassword.value}`
  );
  let user = await response.json();
  if (user.length == 0) {
    let response = await fetch(
      `http://localhost:3000/pending?email=${loginEmail.value}&&password=${loginPassword.value}`
    );
    let user = await response.json();
    if (user.length == 0) {
      alert("Wrong email or password");
    } else {
      alert("Your account is under verification");
    }
  } else {
    localStorage.setItem("id", user[0].id);
    if (user[0].role == "admin") {
      console.log("Admin");
      location.href = "../../../../Views/Users/Admin/Dashboard/dashboard.html";
    } else if (user[0].role == "security") {
      console.log("Sec");
      location.href = "../../../../Views/Users/Security/attend.html";
    } else if (user[0].role == "employee") {
      location.href = "../../../../Views/Users/Employee/Profile/profile.html";
      console.log("Emp");
    }
  }
  console.log(user);
}
