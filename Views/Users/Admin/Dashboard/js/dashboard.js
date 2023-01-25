let tbody = document.querySelector("tbody");
let thead = document.querySelector("thead");
let empInfoBtn = document.querySelector(".emp-info-btn");
let dailyReportBtn = document.querySelector(".daily-report-btn");
let lateReportBtn = document.querySelector(".late-report-btn");
let customReport = document.querySelector(".custom-report-btn");
let emailSearch = document.querySelector("#email-search");

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
  emailSearch.style.display = "none";
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

  customReport.addEventListener("click", dateRangedisplay);
});

function employeeInfo() {
  dateGroup.style.display = "none";
  emailSearch.style.display = "none";

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
  emailSearch.style.display = "none";
  let date = new Date();
  let dateNow =
    date.getDate() + "/" + date.getMonth() + 1 + "/" + date.getFullYear();

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
      }
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
    tbody.appendChild(tr);
  });

  $("#datatable").DataTable();
}

function lateReport() {
  dateGroup.style.display = "none";
  emailSearch.style.display = "block";

  if ($.fn.dataTable.isDataTable("#datatable")) {
    $("#datatable").DataTable().clear().destroy();
  }

  tbody.innerHTML = "";
  let headers =
    "<tr><td>Date</td><td>Checked In</td><td>Check Out</td><td>Late</td><td>Absence</td></tr>";
  thead.innerHTML = headers;

  // let userInput = document.getElementById("email").value="mo1@mo.com";
  // userInput = document.getElementById("email").value;
  let userInput = document.getElementById("email").value;

  let targetEmp = allEmployees.filter((emp) => {
    return emp.email == userInput;
  });
  console.log(targetEmp);
  // debugger;
  let empAttend = targetEmp[0].attend;

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

function dateRangedisplay() {
  dateGroup.style.display = "block";
  emailSearch.style.display = "none";
  tbody.innerHTML = " ";
}

function getReportsByrange() {
  tbody.innerHTML = "";
  if ($.fn.dataTable.isDataTable("#datatablesSimple")) {
    $("#datatablesSimple").DataTable().clear().destroy();
  }

  let start = new Date(starDate.value);
  let end = new Date(endDate.value);

  let headers =
    "<tr><td>Date</td><td>checked in</td><td>check out</td><td>late</td></tr>";
  thead.innerHTML = headers;
  if (starDate != "") {
    if (end != "") {
      allEmployees.forEach((emp) => {
        let tr = document.createElement("tr");
        let name = document.createElement("td");
        name.colSpan = "4";
        name.innerText = emp.firstName;
        emp_attendence = emp.attend;
        let myfilterdRange = emp_attendence.filter((item) => {
          return (
            new Date(item.date) >= new Date(start) &&
            new Date(item.date) <= new Date(end)
          );
        });

        if (myfilterdRange.length != 0) {
          tr.appendChild(name);
          tr.style.backgroundColor = "SeaGreen";
          tr.style.color = "white";
          tbody.appendChild(tr);

          myfilterdRange.forEach((item) => {
            let tr2 = document.createElement("tr");
            let date = document.createElement("td");
            let checkin = document.createElement("td");
            let checkout = document.createElement("td");
            let late = document.createElement("td");

            date.innerText = item.date;
            checkin.innerText = item.in;
            checkout.innerText = item.out;
            late.innerText = item.late;

            tr2.appendChild(date);
            tr2.appendChild(checkin);
            tr2.appendChild(checkout);
            tr2.appendChild(late);
            tbody.appendChild(tr2);
          });
        }
      });
    } else {
      // start from range end rage is date today
    }
  }
  // $('#datatablesSimple').DataTable()
}
