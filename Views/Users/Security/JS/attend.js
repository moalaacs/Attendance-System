let email = document.querySelector("#attend-email");
let attendBtn = document.querySelector("#attend-btn");

attendBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (checkUserInput()) {
    (async () => {
      updateUserAttendance();
    })();
  }
})

function checkUserInput() {
  let valid = true;
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
  return valid;
}

function setValidInput(element) {
  element.style.border = "2px solid green";
}

function setInvalidInput(element) {
  element.style.border = "2px solid red";
  element.focus();
}

async function updateUserAttendance() {
  let response = await fetch(`http://localhost:3000/employees`);
  let users = await response.json();
  users.filter((user) => {
    if (user.email == email.value.trim()) {
      let attend = user.attend;
      let currentDate = new Date();
      let dateNow = currentDate.getDate() + '/' + currentDate.getMonth() + 1 + '/' + currentDate.getFullYear();
      let timeNow = currentDate.getHours() + ':' + currentDate.getMinutes();
      if (attend[attend.length - 1]["date"] == dateNow) {
        attend[attend.length - 1]["out"] = timeNow;
      }
      else {
        attend.push(
          {
            "date": dateNow,
            "in": timeNow,
          }
        )
      }
      fetch(`http://localhost:3000/employees/` + user.id, {
        method: "PATCH",
        body: JSON.stringify(
          {
            attend: attend
          }
        ),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
    }
  })
}