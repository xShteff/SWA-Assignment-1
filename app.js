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

class Name {
    constructor(firstName, lastName) {
        this.firstName = firstName.charAt(0).toUpperCase() + firstName.slice(1);
        this.lastName = lastName.charAt(0).toUpperCase() + lastName.slice(1);
    }

    toString() {
        return `${this.firstName.charAt(0).toUpperCase() + this.firstName.slice(1)} ${this.lastName.charAt(0).toUpperCase() + this.lastName.slice(1)}`
    }
}

class Location {
    constructor(city, postcode, state, street) {
        this.city = city;
        this.postcode = postcode;
        this.state = state;
        this.street = street;
    }

    toString() {
        return `${this.postcode}, ${this.city}, ${this.state}, ${this.street}`
    }
}

employeeListApp.filter('filterEmployees', function() {
    return function(employees, letter) {
        if (letter === undefined) {
            return employees;
        }
        return employees.filter(function(employee) {
            return employee.toString().toLowerCase().includes(letter);
        });
    }
});

employeeListApp.controller('EmployeeListController', function EmployeeListController($scope) {
    $scope.randomUserToPerson = function(user) {
        var salary = (user.salary) ? user.salary : (parseInt(Math.floor(Math.random() * 40) + 10)) * 1000;
        var name = new Name(user.name.first, user.name.last);
        var location = new Location(user.location.city, user.location.postcode, user.location.state, user.location.street)
        var person = new Person(user.login.username, name, user.email, user.phone, location, user.picture.large, user.nat, salary);
        return person;
    };
    $scope.employees = [];
    $scope.getFlagUrl = function(nationality) {
        return `https://lipis.github.io/flag-icon-css/flags/4x3/${nationality.toLowerCase()}.svg`;
    };
    $scope.totalSalary = function() {
        var salaries = [];
        for (var i = 0; i < $scope.employees.length; i++)
            salaries.push($scope.employees[i].salary);
        return (salaries.length) ? salaries.reduce(function(sum, value) { return sum + value; }) : 0;
    };
    $scope.loadData = function() {
        var numberOfEmployees = Math.floor(Math.random() * (40 - 20) + 20);
        $.ajax({
            url: `https://randomuser.me/api/?nat=dk,gb,us&inc=name,phone,email,location,picture,login,nat&results=${numberOfEmployees}`,
            dataType: 'json',
            success: function(r) {
                var data = r.results.map($scope.randomUserToPerson);
                $scope.employees = data;
                $scope.$apply();
            }
        });
    };
    $scope.fieldValidation = function(key) {
        return $scope.addUserForm[key].$invalid;
    };
    $scope.addEmployee = function(user) {
        $scope.employees.push($scope.randomUserToPerson(user));
        $scope.user = {};
    };
    $scope.removeEmployee = function(id) {
        if (confirm("Are you sure you want to remove the employee?\nThis action is irreversible and you will have to add him back manually!"))
            for (var i = 0; i < $scope.employees.length; i++)
                if ($scope.employees[i].id.toLowerCase() === id.toLowerCase())
                    $scope.employees.splice(i, 1);
    }

});