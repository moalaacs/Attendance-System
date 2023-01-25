let tbody = document.querySelector("tbody");
let thead = document.querySelector("thead");
let empInfoBtn = document.querySelector(".emp-info-btn");
let dailyReportBtn = document.querySelector(".daily-report-btn");
let lateReportBtn = document.querySelector(".late-report-btn");
let customReport = document.querySelector(".custom-report-btn");
let emailSearch = document.querySelector("#email-search");
let inputHide = document.querySelector("#hide-input");
let dateGroup = document.getElementById("DateRange");
let starDate = document.getElementById("startDate");
let endDate = document.getElementById("endDate");

let allEmployees;

let getAllEmployees = async () => {
  let data = await fetch("http://localhost:3000/employees");
  let users = await data.json();
  allEmployees = users;
};

window.addEventListener("load", async (e) => {
  await getAllEmployees();

  dateGroup.style.display = "none";
  inputHide.style.display = "none";
  empInfoBtn.addEventListener("click", () => {
    if ($.fn.dataTable.isDataTable("#datatable")) {
      $("#datatable").DataTable().clear().destroy();
    }
    tbody.innerHTML = "";
    thead.innerHTML =
      "<tr><td>First Name</td><td>Last Name</td><td>Email</td><td>Address</td><td>Role</td><td>Start Date</td></tr>";
    employeeInfo();
  });

  dailyReportBtn.addEventListener("click", () => {
    if ($.fn.dataTable.isDataTable("#datatable")) {
      $("#datatable").DataTable().clear().destroy();
    }
    tbody.innerHTML = "";
    thead.innerHTML =
      "<tr><td>First Name</td><td>Last Name</td><td>Role</td><td>Check In</td><td>Check Out</td><td>Late</td><td>Absence</td></tr>";
    dailyReport();
  });

  lateReportBtn.addEventListener("click", () => {
    if ($.fn.dataTable.isDataTable("#datatable")) {
      $("#datatable").DataTable().clear().destroy();
    }
    tbody.innerHTML = "";
    lateReport();
  });

  customReport.addEventListener("click", displayDateInput);
});

function employeeInfo() {
  dateGroup.style.display = "none";
  inputHide.style.display = "none";

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
  dateGroup.style.display = "none";
  inputHide.style.display = "none";
  let currentDate = new Date();
  let dateNow =
    currentDate.getMonth() +
    1 +
    "/" +
    currentDate.getDate() +
    "/" +
    currentDate.getFullYear();

  allEmployees.forEach((emp) => {
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
    if (emp.attend[lastDay]["date"] == dateNow) {
      if (emp.attend[lastDay]["absence"] == false) {
        checkIn.innerText = emp.attend[lastDay]["in"];
        checkOut.innerText = emp.attend[lastDay]["out"];
        late.innerText = emp.attend[lastDay]["late"];
        absence.innerText = "Attended";
        tr.appendChild(checkIn);
        tr.appendChild(checkOut);
        tr.appendChild(late);
        tr.appendChild(absence);
      } else {
        let empty = "❌";
        checkIn.innerText = empty;
        checkOut.innerText = empty;
        late.innerText = empty;
        absence.innerText = "Absent";
        tr.style.backgroundColor = "#FD8A8A";
        tr.appendChild(checkIn);
        tr.appendChild(checkOut);
        tr.appendChild(late);
        tr.appendChild(absence);
      }
    }
    tbody.appendChild(tr);
  });

  $("#datatable").DataTable();
}

function lateReport() {
  dateGroup.style.display = "none";
  inputHide.style.display = "block";

  if ($.fn.dataTable.isDataTable("#datatable")) {
    $("#datatable").DataTable().clear().destroy();
  }

  tbody.innerHTML = "";
  thead.innerHTML =
    "<tr><td>Date</td><td>Checked In</td><td>Check Out</td><td>Late</td><td>Absence</td></tr>";
  emailSearch = document.querySelector("#email-search");
  userInput = emailSearch.value;

  let targetEmp = allEmployees.filter((emp) => {
    return emp.email == userInput;
  });
  console.log(targetEmp);
  let empAttend = targetEmp[0].attend;

  empAttend.forEach((day) => {
    let tr = document.createElement("tr");
    let date = document.createElement("td");
    let checkIn = document.createElement("td");
    let checkOut = document.createElement("td");
    let late = document.createElement("td");
    let absence = document.createElement("td");
    if (day["absence"] != false) {
      date.innerText = day["date"];
      checkIn.innerText = "❌";
      checkOut.innerText = "❌";
      late.innerText = "❌";
      absence.innerHTML = "❌";
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

function displayDateInput() {
  dateGroup.style.display = "block";
  inputHide.style.display = "none";
  tbody.innerHTML = " ";
}

function rangeReport() {
  tbody.innerHTML = "";
  if ($.fn.dataTable.isDataTable("#datatable")) {
    $("#datatable").DataTable().clear().destroy();
  }

  let start = new Date(starDate.value);
  let end = new Date(endDate.value);

  thead.innerHTML =
    "<tr><td>Date</td><td>Check In</td><td>Check Out</td><td>Late</td></tr>";
  if (starDate != "") {
    if (end != "") {
      allEmployees.forEach((emp) => {
        let tr = document.createElement("tr");
        let name = document.createElement("td");
        name.innerText = `${emp.firstName} ${emp.lastName}`;
        attendance = emp.attend;
        let returnedRange = attendance.filter((item) => {
          return (
            new Date(item.date) >= new Date(start) &&
            new Date(item.date) <= new Date(end)
          );
        });

        if (returnedRange.length != 0) {
          tr.appendChild(name);
          tr.style.backgroundColor = "#f1f7fd";
          tr.style.color = "black";
          tbody.appendChild(tr);

          returnedRange.forEach((day) => {
            let dataTr = document.createElement("tr");
            let date = document.createElement("td");
            let checkIn = document.createElement("td");
            let checkOut = document.createElement("td");
            let late = document.createElement("td");

            if (day.in == "undefined") {
              date.innerText = "❌";
              checkIn.innerText = "❌";
              checkOut.innerText = "❌";
              late.innerText = "❌";
            } else {
              date.innerText = day.date;
              checkIn.innerText = day.in;
              checkOut.innerText = day.out;
              late.innerText = day.late;
            }

            dataTr.appendChild(date);
            dataTr.appendChild(checkIn);
            dataTr.appendChild(checkOut);
            dataTr.appendChild(late);
            tbody.appendChild(dataTr);
          });
        }
      });
    }
  }
}
