let userID = localStorage.getItem("id");
let user;
console.log(userID);
let userName = document.querySelectorAll(".user-name");
let userDOB = document.querySelector(".user-dob");
let userRole = document.querySelector(".user-role");
let userAddress = document.querySelectorAll(".user-address");
let userEmail = document.querySelector(".user-email");

let tbody = document.querySelector("#table_body");

let thead = document.querySelector("#table_headers");

(async function getUser() {
  let response = await fetch(`http://localhost:3000/employees?id=${userID}`);
  let userArray = await response.json();
  user = userArray[0];
  console.log(user);
  // console.log(user[0].firstName);
  userName[0].innerText = `${user.firstName} ${user.lastName}`;
  userName[1].innerText = `${user.firstName} ${user.lastName}`;
  userDOB.innerText = `${user.dob}`;
  userEmail.innerText = `${user.email}`;
  userRole.innerText = `${user.role}`;
  userAddress[0].innerText = `${user.address}`;
  userAddress[1].innerText = `${user.address}`;
  setEmpReports();
})();

function setEmpReports() {
  if ($.fn.dataTable.isDataTable("#datatablesSimple")) {
    $("#datatablesSimple").DataTable().clear().destroy();
  }

  tbody.innerHTML = "";
  let headers =
    "<tr><td>Date</td><td>Checked In</td><td>Check Out</td><td>Late</td><td>Absence</td></tr>";
  thead.innerHTML = headers;

  console.log(user);

  let empAttend = user.attend;

  empAttend.forEach((day) => {
    let tr = document.createElement("tr");
    // let name = document.createElement("td");
    // let position = document.createElement("td");
    let date = document.createElement("td");
    let checkIn = document.createElement("td");
    let checkOut = document.createElement("td");
    let late = document.createElement("td");
    let absence = document.createElement("td");
    if (day["absence"] != false) {
      let empty = '<i class="fa-solid fa-circle-user text-danger fs-3"></i>';
      date.innerText = day["date"];
      checkIn.innerText = "❌";
      checkOut.innerText = "❌";
      late.innerText = "❌";
      absence.innerHTML = empty;
    } else {
      date.innerText = day["date"];
      checkIn.innerText = day["in"];
      checkOut.innerText = day["out"];
      late.innerText = day["late"];
      absence.innerText = day["absence"];
    }

    tr.appendChild(date);
    tr.appendChild(checkIn);
    tr.appendChild(checkOut);
    tr.appendChild(late);
    tr.appendChild(absence);
    tbody.appendChild(tr);
  });
  $("#datatable").DataTable();
}
// function displayUserData() {
//   acUser = getUser();
//   console.log(acUser);
// }
