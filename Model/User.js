export class User {
  firstName;
  lastName;
  address;
  email;
  password;
  dob;
  role;
  attend;

  constructor(
    _firstName,
    _lastName,
    _address,
    _email,
    _password,
    _dob,
    _role,
    _attend
  ) {
    this.firstName = _firstName;
    this.lastName = _lastName;
    this.address = _address;
    this.email = _email;
    this.password = _password;
    this.dob = _dob;
    // this.verified = _verified;
    // this.username = _username;
    this.role = _role;
    this.attend = _attend;
  }

  addUserToDB() {
    let currentDate = new Date();
    let dateNow =
      currentDate.getMonth() +
      1 +
      "/" +
      currentDate.getDate() +
      "/" +
      currentDate.getFullYear();
    fetch("http://localhost:3000/pending", {
      method: "POST",
      body: JSON.stringify({
        id: "",
        firstName: this.firstName,
        lastName: this.lastName,
        address: this.address,
        email: this.email,
        password: this.password,
        dob: this.dob,
        role: this.role,
        attend: [{ date: dateNow }],
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
  }
}
