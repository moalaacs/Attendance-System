let allEmployees;

let tbody = document.querySelector("tbody");
let thead = document.querySelector("thead");
let empInfoBtn = document.querySelectorAll(".btn_reports")[0];
let dailyReportBtn = document.querySelectorAll(".btn_reports")[1];
let btn_getabcense = document.querySelectorAll(".btn_reports")[2];
let btn_getLateReport = document.querySelectorAll(".btn_reports")[3];

let getAllEmployees = async () => {
  let data = await fetch("http://localhost:3000/employees");
  let users = await data.json();
  allEmployees = users;
};

window.addEventListener("load", async (e) => {
  await getAllEmployees();

  empInfoBtn.addEventListener("click", () => {
    if ($.fn.dataTable.isDataTable("#datatable")) {
      $("#datatable").DataTable().clear().destroy();
    }

    tbody.innerHTML = "";
    let headers =
      "<tr><td>First Name</td><td>Last Name</td><td>Email</td><td>Address</td><td>Role</td><td>Start Date</td></tr>";
    thead.innerHTML = headers;
    employeeInfo();
  });

  dailyReportBtn.addEventListener("click", () => {
    if ($.fn.dataTable.isDataTable("#datatable")) {
      $("#datatable").DataTable().clear().destroy();
    }
    tbody.innerHTML = "";
    let headers =
      "<tr><td>First Name</td><td>Last Name</td><td>Role</td><td>Check In</td><td>Check Out</td><td>late</td><td>absence</td></tr>";
    thead.innerHTML = headers;
    dailyReport();
  });
});

function employeeInfo() {
  allEmployees.forEach((user) => {
    let tr = document.createElement("tr");
    let firstName = document.createElement("td");
    let lastName = document.createElement("td");
    let email = document.createElement("td");
    let address = document.createElement("td");
    let startDate = document.createElement("td");
    let role = document.createElement("td");

    firstName.innerText = user.firstName;
    lastName.innerText = user.lastName;
    email.innerText = user.email;
    address.innerText = user.address;
    role.innerText = user.role;
    startDate.innerText = user.attend[0].date;

    tr.appendChild(firstName);
    tr.appendChild(lastName);
    tr.appendChild(email);
    tr.appendChild(address);
    tr.appendChild(role);
    tr.appendChild(startDate);

    tbody.appendChild(tr);
  });
  $("#datatable").DataTable();
}

function dailyReport() {
  let date = new Date();
  let dateNow =
    date.getDate() + "/" + date.getMonth() + 1 + "/" + date.getFullYear();

  allEmployees.forEach((emp) => {
    let len = emp.attend.length - 1;
    let lastDay = emp.attend.length - 1;

    let tr = document.createElement("tr");
    let firstName = document.createElement("td");
    let lastName = document.createElement("td");
    let role = document.createElement("td");
    let checkIn = document.createElement("td");
    let checkOut = document.createElement("td");
    let late = document.createElement("td");
    let absence = document.createElement("td");



    firstName.innerText = emp.firstName;
    lastName.innerText = emp.lastName;
    role.innerText = emp.role;
    tr.appendChild(firstName);
    tr.appendChild(lastName);
    tr.appendChild(role);

    if (emp.attend[len]["date"] == dateNow) {
      if (emp.attend[len]["absence"] == false) {
        checkIn.innerText = emp.attend[len]["in"];
        checkOut.innerText = emp.attend[len]["out"];
        late.innerText = emp.attend[len]["late"];
        absence.innerText = "attended";
        tr.appendChild(checkIn);
        tr.appendChild(checkOut);
        tr.appendChild(late);
        tr.appendChild(absence);
      } else {
        let empty = "__";
        checkIn.innerText = empty;
        checkOut.innerText = empty;
        late.innerText = empty;

        tr.appendChild(checkIn);
        tr.appendChild(checkOut);
        tr.appendChild(late);
        tr.appendChild(absence);
        tr.style.backgroundColor = "Pink";
      }
    } else {
      let empty = "___";
      checkIn.innerText = empty;
      checkOut.innerText = empty;
      late.innerText = empty;
      absence.innerText = "absence";
      tr.style.backgroundColor = "Pink";
      tr.appendChild(checkIn);
      tr.appendChild(checkOut);
      tr.appendChild(late);
      tr.appendChild(absence);
    }
    tbody.appendChild(tr);
  });

  $("#datatable").DataTable();
}
