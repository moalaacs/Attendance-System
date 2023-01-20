export class Employee {
  firstName;
  lastName;
  email;
  address;
  dob;

  constructor(_firstName,_lastName,_email,_address,_dob){
    this.firstName = _firstName;
    this.lastName = _lastName;
    this.email = _email;
    this.address = _address;
    this.dob = _dob;
  }
}