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
    $scope.employees = [];

    $scope.addEmployee = function(user) {
        console.log(user);
        $scope.employees.push(user);
        $scope.user = {};
    }
});