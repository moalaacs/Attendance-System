let allEmployees;
let allPending;

let tbody = document.querySelector("#table_body");
let thead = document.querySelector("#table_headers");
let addBtn = document.querySelector(".add-btn");
let deleteBtn = document.querySelector(".delete-btn");
let pendingBtn = document.querySelector(".pending-btn");
let form = document.querySelector("#register-form");

let getAllEmployees = async () => {
  let data = await fetch("http://localhost:3000/employees");
  let users = await data.json();
  allEmployees = users;
};

let getallPending = async () => {
  let data = await fetch("http://localhost:3000/pending");
  let users = await data.json();
  allPending = users;
};

window.addEventListener("load", async (e) => {
  await getAllEmployees();
  deleteBtn.addEventListener("click", deleteFunction);
  pendingBtn.addEventListener("click", checkPending);
  addBtn.addEventListener("click", addNewEmp);
});

function deleteFunction() {
  form.style.display = "none";
  if ($.fn.dataTable.isDataTable("#datatable"))
    $("#datatable").DataTable().clear().destroy();

  tbody.innerHTML = "";
  let headers =
    "<tr><td>First Name</td><td>Last Name</td><td>Email</td><td>Role</td><td>Delete</td></tr>";
  thead.innerHTML = headers;
  DeleteEmp();
}

function DeleteEmp() {
  allEmployees.forEach((user) => {
    let tr = document.createElement("tr");
    let firstName = document.createElement("td");
    let lastName = document.createElement("td");
    let email = document.createElement("td");
    let role = document.createElement("td");
    let deleteTd = document.createElement("td");
    let span = document.createElement("span");
    deleteTd.innerHTML = "<i class='fa-solid fa-trash text-danger fs-3'></i>";
    span.innerText = user.id;
    span.style.visibility = "hidden";
    deleteTd.appendChild(span);
    role.innerText = user.position;

    firstName.innerText = user.firstName;
    lastName.innerText = user.lastName;
    email.innerText = user.email;
    role.innerText = user.role;

    tr.appendChild(firstName);
    tr.appendChild(lastName);
    tr.appendChild(email);
    tr.appendChild(role);
    tr.appendChild(deleteTd);
    tbody.appendChild(tr);

    deleteTd.addEventListener("click", (event) => {
      let empID = event.target.nextSibling.innerHTML;
      console.log(empID);

      if (window.confirm("Are you sure?")) {
        fetch("http://localhost:3000/employees/" + empID, {
          method: "DELETE",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        })
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            alert("This employee has been deleted");
          });
      }
    });
  });
  $("#datatable").DataTable();
}

function addNewEmp() {
  if ($.fn.dataTable.isDataTable("#datatable")) {
    $("#datatable").DataTable().clear().destroy();
  }
  thead.innerHTML = "";
  form.style.display = "block";
}

async function checkPending() {
  form.style.display = "none";
  if ($.fn.dataTable.isDataTable("#datatable")) {
    $("#datatable").DataTable().clear().destroy();
  }

  await getallPending();

  tbody.innerHTML = "";
  let headers =
    "<tr><td>First Name</td><td>Late Name</td><td>Email</td><td>Role</td><td>Confirm</td><td>Delete</td></tr>";
  thead.innerHTML = headers;

  allPending.forEach((user) => {
    let tr = document.createElement("tr");
    let firstName = document.createElement("td");
    let lastName = document.createElement("td");
    let email = document.createElement("td");
    let role = document.createElement("td");
    let confirm = document.createElement("td");
    let deleteTd = document.createElement("td");
    let confirmId = document.createElement("span");
    let span2 = document.createElement("span");

    role.innerHTML = `<select class="form-select"><option value="employee">employee</option><option value="security">security</option><option value="admin">admin</option></select>`;

    span2.innerText = user.id;
    deleteTd.innerHTML = "<i class='fa-solid fa-trash text-danger fs-3'></i>";
    confirm.innerHTML =
      '<i class="fa-solid fa-circle-check text-success fs-3"></i>';
    confirmId.innerText = user.id;
    confirmId.style.visibility = "hidden";
    span2.style.visibility = "hidden";
    deleteTd.appendChild(span2);
    confirm.appendChild(confirmId);

    firstName.innerText = user.firstName;
    lastName.innerText = user.lastName;
    email.innerText = user.email;

    tr.appendChild(firstName);
    tr.appendChild(lastName);
    tr.appendChild(email);
    tr.appendChild(role);
    tr.appendChild(confirm);
    tr.appendChild(deleteTd);
    tbody.appendChild(tr);

    deleteTd.addEventListener("click", async (e) => {
      if (window.confirm("This employee will be deleted")) {
        let empID = e.target.nextSibling.innerHTML;
        await deleteEmp(empID);
      }
    });

    confirm.addEventListener("click", (e) => {
      if (window.confirm("This employee will be added")) {
        let empID = e.target.nextSibling.innerHTML;
        let confirmed_emp = allPending.filter((emp) => {
          return emp.id == empID;
        });
        let employee = confirmed_emp[0];
        let selectedRole = document.querySelector(".form-select").value;

        let currentDate = new Date();
        let dateNow =
          currentDate.getMonth() +
          1 +
          "/" +
          currentDate.getDate() +
          "/" +
          currentDate.getFullYear();

        fetch("http://localhost:3000/employees", {
          method: "POST",
          body: JSON.stringify({
            id: "",
            firstName: employee.firstName,
            lastName: employee.lastName,
            address: employee.address,
            email: employee.email,
            password: employee.password,
            dob: employee.dob,
            role: selectedRole,
            attend: [{ date: dateNow }],
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }).then((e) => {
          deleteEmp(empID);
          Email.send({
            SecureToken: "e498i9de-2pl9-4qe7-c181-783p34c871b5",
            To: `${data[i].email}`,
            From: "moalaa@gmail.com",
            Subject: "Congrats",
            Body: `Your username is ${data[i].username} and your password is ${data[i].password}`,
          }).then((message) => alert(message));
        });
      }
    });
  });
  $("#datatable").DataTable();
}

function deleteEmp(empID) {
  fetch("http://localhost:3000/pending/" + empID, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {});
}
