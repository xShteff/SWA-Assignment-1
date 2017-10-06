var employeeListApp = angular.module('employeeListApp', []);

class Person {
    constructor(id, name, email, phone, address, picture, nationality, salary) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.address = address;
        this.picture = picture;
        this.nationality = nationality;
        this.salary = salary;
    }

    toString() {
        return `${this.name.toString()} ${this.email} ${this.phone} ${this.address.toString()} ${this.nationality} ${this.salary}`
    }
}

employeeListApp.controller('EmployeeListController', function EmployeeListController($scope) {
  $scope.employees = function getEmployees(){
      var user = new Person(6, 'David', "sadas", "asdas", "waht ever", "http://i0.kym-cdn.com/entries/icons/mobile/000/013/564/doge.jpg", "asdasd", 65000);
      var data = [];
      data.push(user);
      console.log(data);
      return data;
  }
});