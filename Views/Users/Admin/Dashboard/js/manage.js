let allEmp;
let allPend;

let tbody = document.querySelector("#table_body");
let thead = document.querySelector("#table_headers");
let btn_addEmp = document.querySelectorAll(".btn_manage")[0];
let btn_getemp_delete = document.querySelectorAll(".btn_manage")[1];
let btn_getPending = document.querySelectorAll(".btn_manage")[2];
let myform = document.querySelector("#register-form");

let getallemp = async () => {
  let data = await fetch("http://localhost:3000/employees");
  let users = await data.json();

  allEmp = users;
};

let getallPending = async () => {
  let data = await fetch("http://localhost:3000/pending");
  let users = await data.json();
  allPend = users;
};

window.addEventListener("load", async (e) => {
  await getallemp();

  btn_getemp_delete.addEventListener("click", deleteFunction);

  // get daily report
  btn_getPending.addEventListener("click", checkPending);
  {
  }

  btn_addEmp.addEventListener("click", addNewEmp);
});

function deleteFunction() {
  myform.style.display = "none";
  if ($.fn.dataTable.isDataTable("#datatablesSimple"))
    $("#datatablesSimple").DataTable().clear().destroy();

  tbody.innerHTML = "";
  let headers =
    "<tr><td>First Name</td><td>Last Name</td><td>Email</td><td>Role</td><td>Delete</td></tr>";
  thead.innerHTML = headers;
  DeleteEmp();
}

function DeleteEmp() {
  allEmp.forEach((user) => {
    let tr = document.createElement("tr");
    let firstName = document.createElement("td");
    let lastName = document.createElement("td");
    let email = document.createElement("td");
    let role = document.createElement("td");
    let deleteTd = document.createElement("td");
    let spanid = document.createElement("span");
    deleteTd.innerHTML = "<i class='fa-solid fa-trash text-danger fs-3'></i>";
    spanid.innerText = user.id;
    spanid.style.visibility = "hidden";
    deleteTd.appendChild(spanid);
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
      //  let targetEmpMail=event.target.parentElement.parentNode.parentElement.children[1].innerText;
      let emp_id = event.target.nextSibling.innerHTML;
      console.log(emp_id);

      if (window.confirm("you will delete this employee permenant")) {
        fetch("http://localhost:3000/employees/" + emp_id, {
          method: "DELETE", // Method itself
          headers: {
            "Content-type": "application/json; charset=UTF-8", // Indicates the content
          },
        })
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            alert("emp has deleted");
          });
      }
    });
  });
  $("#datatablesSimple").DataTable();
}

function addNewEmp() {
  if ($.fn.dataTable.isDataTable("#datatablesSimple")) {
    $("#datatablesSimple").DataTable().clear().destroy();
  }
  thead.innerHTML = "";
  myform.style.display = "block";
}

async function checkPending() {
  myform.style.display = "none";
  if ($.fn.dataTable.isDataTable("#datatablesSimple")) {
    $("#datatablesSimple").DataTable().clear().destroy();
  }

  await getallPending();

  tbody.innerHTML = "";
  let headers =
    "<tr><td>First Name</td><td>Late Name</td><td>Email</td><td>Role</td><td>Confirm</td><td>Delete</td></tr>";
  thead.innerHTML = headers;

  allPend.forEach((user) => {
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
      if (window.confirm("you will delete this acount")) {
        let emp_id = e.target.nextSibling.innerHTML;
        await deletebyId(emp_id);
      }
    });

    confirm.addEventListener("click", (e) => {
      if (window.confirm("you will add this acount")) {
        let emp_id = e.target.nextSibling.innerHTML;
        let confirmed_emp = allPend.filter((emp) => {
          return emp.id == emp_id;
        });
        let employee = confirmed_emp[0];
        let selectedRole = document.querySelector(".form-select").value;

        let currentDate = new Date();
        let dateNow = currentDate.getMonth() + 1 + "/";
        currentDate.getDate() + "/" + currentDate.getFullYear();

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
          deletebyId(emp_id);
        });
      }
    });
  });

  $("#datatablesSimple").DataTable();
}

function deletebyId(emp_id) {
  fetch("http://localhost:3000/pending/" + emp_id, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      alert("account has deleted ");
    });
}
