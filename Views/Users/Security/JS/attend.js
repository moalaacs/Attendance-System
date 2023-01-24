let email = document.querySelector("#attend-email");
let attendBtn = document.querySelector("#attend-btn");

attendBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (checkUserInput()) {
    (async () => {
      updateUserAttendance();
    })();
  }
});

function checkUserInput() {
  let valid = true;
  if (email.value.trim() != "") {
    if (email.value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
      setValidInput(email);
    } else {
      setInvalidInput(email);
      valid = false;
    }
  } else {
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
      let attendArray = user.attend;
      let currentDate = new Date();
      let dateNow =
        currentDate.getDate() +
        "/" +
        currentDate.getMonth() +
        1 +
        "/" +
        currentDate.getFullYear();
      let timeNow = currentDate.getHours() + ":" + currentDate.getMinutes();
      let lastDay = attendArray.length - 1;
      let late = 0;
      let startedDate = new Date();
      startedDate.setHours(8);
      startedDate.setMinutes(30);
      let lateHours = currentDate.getHours() - startedDate.getHours();
      let lateMinutes = currentDate.getMinutes() - startedDate.getMinutes();
      if (lateHours < 0) {
        late = "0:0";
      } else if (lateHours <= 0 && lateMinutes < 0) {
        late = "0:0";
      } else {
        late = `${lateHours}:${Math.abs(lateMinutes)}`;
      }

      if (attendArray.length == 0 || attendArray[lastDay]["date"] != dateNow) {
        attendArray.push({
          date: dateNow,
          absence: false,
          in: timeNow,
          late: late,
        });
      } else {
        if (attendArray[lastDay]["date"] == dateNow) {
          attendArray[lastDay]["out"] = timeNow;
        }
      }

      // attendArray.push({
      //   date: dateNow,
      //   absence: false,
      //   in: timeNow,
      //   late: late,
      // });

      // let lastDay = attendArray.length - 1;
      //   if (attendArray[lastDay]["date"] == dateNow) {
      //     attendArray[lastDay]["out"] = timeNow;
      //   }

      fetch(`http://localhost:3000/employees/` + user.id, {
        method: "PATCH",
        body: JSON.stringify({
          attend: attendArray,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }).then((response) => response.json());
    }
  });
}
