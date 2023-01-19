import { Employee } from "../Testing/Emp.js";
let tbody = document.getElementsByTagName("tbody")[0];

fetch("http://localhost:3000/employees")
  .then((result) => {
    return result.json();
  })
  .then((employeeData) => {
    console.log(employeeData);
    employeeData.forEach((employee) => {
      let tr = document.createElement("tr");
      let firstName = document.createElement("td");
      let lastName = document.createElement("td");
      let address = document.createElement("td");
      let email = document.createElement("td");
      let dob = document.createElement("td");
      let role = document.createElement("td");

      firstName.innerText = employee.firstname;
      lastName.innerText = employee.lastname;
      address.innerText = employee.address;
      email.innerText = employee.email;
      dob.innerText = employee.dob;
      role.innerText = employee.role;

      tr.appendChild(firstName);
      tr.appendChild(lastName);
      tr.appendChild(address);
      tr.appendChild(email);
      tr.appendChild(dob);
      tr.appendChild(role);

      // if (Number(user.attend[0].attend) > 9) {
      //   tr.style.backgroundColor = "red";
      // } else tr.style.backgroundColor = "green";
      tbody.appendChild(tr);
    });
  });

let e1 = new Employee("hambola", 15, "dep1", "ceo", [
  { date: "1/1/2022", in: "9.45", out: "3" },
]);

let e = new Employee(
  "Mikaela",
  "Nunn",
  "719 Farragut Trail",
  "mnunnd@networksolutions.com",
  "8/4/1976",
  "employee",
  [
    {
      date: "1/1/2023",
      in: "9",
      out: "3",
    },
  ]
);

// fetch("http://localhost:3000/employees", {
//   method: "POST",
//   body: JSON.stringify({
//     "id": 205,
//     "name": e1.Name,
//     "attend": e1.Attendence_info,
//     "firstname": e.firstname,
//     "lastname": e.lastname,
//     "address": e.address,
//     "email": e.email,
//     "dob": e.dob,
//     "role": e.role,
//   }),
//   headers: {
//     "Content-type": "application/json; charset=UTF-8",
//   },
// })
//   .then((response) => response.json())

//   // Displaying results to console
//   .then((json) => console.log(json));
