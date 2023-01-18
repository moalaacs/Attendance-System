import { Employee } from "../Testing/Emp.js";
let tbody = document.getElementsByTagName("tbody")[0];
console.log(tbody);
fetch("http://localhost:3000/employees")
  .then((result) => {
    return result.json();
  })
  .then((empData) => {
    console.log(empData);
    empData.forEach((user) => {
      let tr = document.createElement("tr");
      let names = document.createElement("td");
      let date = document.createElement("td");
      let atend = document.createElement("td");
      let departeure = document.createElement("td");
      atend.innerText = user.attend[0].attend;
      departeure.innerText = user.attend[0].departure;
      date.innerText = user.attend[0].date;
      names.innerText = user.name;

      tr.appendChild(names);
      tr.appendChild(date);
      tr.appendChild(atend);
      tr.appendChild(departeure);
      if (Number(user.attend[0].attend) > 9) {
        tr.style.backgroundColor = "red";
      } else tr.style.backgroundColor = "green";
      tbody.appendChild(tr);
    });
  });

let e1 = new Employee("hambola", 15, "dep1", "ceo", [
  { date: "1/1/2022", attend: "9.45", departure: "3" },
]);

fetch("http://localhost:3000/employees", {
  method: "POST",
  body: JSON.stringify({
    id: 205,
    name: e1.Name,
    attend: e1.Attendence_info,
  }),
  headers: {
    "Content-type": "application/json; charset=UTF-8",
  },
})
  .then((response) => response.json())

  // Displaying results to console
  .then((json) => console.log(json));
